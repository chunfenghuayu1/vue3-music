import { defineStore } from 'pinia'
import { getLocal, setLocal } from '@utils/localStorage'
import Player from '@/utils/player/index'
import type { data, settings } from './initLocal'
import type { tags } from '@utils/localData'
import { reqLoginStatus, reqLogout } from '@api/auth'
import jsCookie from 'js-cookie'
import { ElMessage } from 'element-plus'
import { imgUrl } from '@utils/imgUrl'
// 导入本地初始化数据
import localStore from './initLocal'
// 如果本地存储不存在data数据，初始化
// 0代表没有值
if (!getLocal('data')) {
    setLocal('data', localStore.data)
}
// 如果本地存储不存在settings数据，初始化
if (!getLocal('settings')) {
    setLocal('settings', localStore.settings)
}

if (!getLocal('player')) {
    setLocal('player', localStore.player)
}

export const useLocalStore = defineStore('useLocalStore', {
    state: () => {
        return {
            data: getLocal('data') as data,
            settings: getLocal('settings') as settings,
            player: new Player()
        }
    },
    actions: {
        // 存储标签选择
        storeTags(item: tags) {
            const flag = this.data.activeTags.indexOf(item.name)
            if (flag !== -1) {
                this.data.activeTags.splice(flag, 1)
            } else {
                this.data.activeTags.push(item.name)
            }
        },
        // 刷新登录状态，获取用户信息
        async getUserInfo() {
            await reqLoginStatus().then(({ data }) => {
                // 如果获取不到用户状态，则退出登录
                if (data.profile === null) {
                    this.handlerLogout()
                    ElMessage({
                        message: '获取用户信息失败，请重新登陆',
                        type: 'warning',
                        duration: 1000
                    })
                }
                if (data.code === 200) {
                    this.data.user = data.profile
                    this.data.loginMode = 'qrcode'
                }
            })
        },
        // 退出登录
        async handlerLogout() {
            await reqLogout().then(data => {
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
                    ElMessage({
                        message: '退出登录成功',
                        type: 'success',
                        duration: 1000
                    })
                } else {
                    ElMessage({
                        message: '退出登录失败，请稍后重试',
                        type: 'warning',
                        duration: 1000
                    })
                }
            })
        },
        // 切换主题
        switchTheme(value: 'light' | 'dark') {
            // 此处不自动适应系统变化，切换逻辑是进行light和dark的切换
            this.settings.theme = value
            if (this.settings.theme === 'dark') {
                document.documentElement.classList.add('dark')
                document.documentElement.classList.remove('light')
            } else {
                document.documentElement.classList.add('light')
                document.documentElement.classList.remove('dark')
            }
        },
        // 切换关闭提示框
        switchDialog(value: 'confirm' | 'minimize' | 'quit') {
            this.settings.exitType = value
        }
    },
    getters: {
        // 用户id
        userId: state => state.data.user.userId,
        // 用户名
        nickname: state => state.data.user.nickname,
        // 用户头像
        avatarUrl: state => {
            if (state.data.user.avatarUrl) {
                return imgUrl(state.data.user.avatarUrl, 48)
            } else {
                return ''
            }
        },
        // 登录状态 通过登录模式判断
        loginStatus: state => state.data.loginMode !== ''
    },
    // 开启持久化
    persist: {
        enable: true
    }
})
