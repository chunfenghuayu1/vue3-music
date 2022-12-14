import { defineStore } from 'pinia'
import { getLocal, setLocal } from '@/utils/localStorage.js'
import { reqLoginStatus, reqLogout } from '@/api/Login.js'
import jsCookie from 'js-cookie'
// 初始化本地存储
import localStorage from './initLocalStorage'
if (getLocal('data') === null) {
    setLocal('data', localStorage.data)
}
if (getLocal('settings') === null) {
    setLocal('settings', localStorage.settings)
}

export const useStorageStore = defineStore('storageStore', {
    state: () => {
        return {
            data: getLocal('data'),
            settings: getLocal('settings')
        }
    },
    actions: {
        // 存储标签选择
        storeTags(item) {
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
                if (data.data.profile === null) return this.handlerLogout()
                if (data.data.code === 200) {
                    this.data.user = data.data.profile
                    this.data.loginMode = 'qrcode'
                }
                console.log(data)
            })
        },
        // 退出登录
        async handlerLogout() {
            await reqLogout().then(({ data }) => {
                if (data.code === 200) {
                    this.data.loginMode = ''
                    this.data.user = {}
                    // 清除cookie
                    jsCookie.remove()
                }
            })
        }
    },
    getters: {
        // 用户名
        nickname: state => state.data.user.nickname,
        // 用户头像
        avatarUrl: state => state.data.user.avatarUrl.replace(/^http:/, 'https://'),
        // 用户id
        userId: state => state.data.user.userId
    },
    // 开启持久化
    persist: {
        enable: true
    }
})
