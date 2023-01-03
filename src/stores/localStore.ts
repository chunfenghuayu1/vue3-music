import { defineStore } from 'pinia'
import { getLocal, setLocal } from '@/utils/localStorage'
import type { data, settings } from './initLocal'
import type { tags } from '@/utils/localData'
import { reqLoginStatus, reqLogout } from '@/api/auth'
import jsCookie from 'js-cookie'
// 导入本地初始化数据
import localStore from './initLocal'
// 如果本地存储不存在data数据，初始化
// 0代表没有值
if (getLocal('data') === 0) {
    setLocal('data', localStore.data)
}
// 如果本地存储不存在settings数据，初始化
if (getLocal('settings') === 0) {
    setLocal('settings', localStore.settings)
}

export const useLocalStore = defineStore('useLocalStore', {
    state: () => {
        return {
            data: getLocal('data') as data,
            settings: getLocal('settings') as settings
        }
    },
    actions: {
        // 存储标签选择
        storeTags(item: tags) {
            const flag = this.settings.activeTags.indexOf(item.name)
            if (flag !== -1) {
                this.settings.activeTags.splice(flag, 1)
            } else {
                this.settings.activeTags.push(item.name)
            }
        },
        // 刷新登录状态，获取用户信息
        async getUserInfo() {
            await reqLoginStatus().then(({ data }) => {
                // 如果获取不到用户状态，则退出登录
                if (data.profile === null) return this.handlerLogout()
                if (data.code === 200) {
                    this.data.user = data.profile
                    this.data.loginMode = 'qrcode'
                }
                // console.log(data)
            })
        },
        // 退出登录
        async handlerLogout() {
            await reqLogout().then(({ data }) => {
                if (data.code === 200) {
                    this.data.loginMode = ''
                    this.data.user = {
                        userId: 0,
                        avatarUrl: '',
                        nickname: ''
                    }
                    // 清除cookie
                    jsCookie.remove('MUSIC_U')
                    jsCookie.remove('__csrf')
                    jsCookie.remove('NMTID')
                }
            })
        }
    },
    getters: {
        // 用户id
        userId: state => state.data.user.userId,
        // 用户名
        nickname: state => state.data.user.nickname,
        // 用户头像
        avatarUrl: state => state.data.user.avatarUrl.replace(/^http:\/\//, 'https://')
    },
    // 开启持久化
    persist: {
        enable: true
    }
})
