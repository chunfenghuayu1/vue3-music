import { defineStore } from 'pinia'
import { getLocal, setLocal } from '@/utils/localStorage.js'
import localData from '@/utils/localData.js'
import { reqAccount } from '@/api/Login.js'
export const useStorageStore = defineStore('storageStore', {
    state: () => {
        return {
            data: {
                accountStatus: '',
                user: {
                    // 账号信息
                    account: { avatarUrl: '', nickname: '' }
                }
            },
            settings: {
                activeTags: []
            }
        }
    },
    actions: {
        // 获取全部标签,本地化
        getTags() {
            const tagsList = getLocal('settings')?.activeTags
            // 如果首次使用，则本地没有数据，进行初始化
            // 如果有数据，则直接从本地取
            if (!tagsList) {
                this.settings.activeTags = localData.explore.tags
                    .filter(item => item.hot === true)
                    .map(item => item.name)
                // 初始化存在本地
                setLocal('settings', this.settings)
            } else {
                this.settings.activeTags = getLocal('settings').activeTags
            }
        },
        // 存储标签选择
        storeTags(item) {
            const flag = this.settings.activeTags.indexOf(item.name)
            if (flag !== -1) {
                this.settings.activeTags.splice(flag, 1)
            } else {
                this.settings.activeTags.push(item.name)
            }
            // 每次设置调用本地存储
            setLocal('settings', this.settings)
        },
        // 保存用户登录信息
        storeStatus() {
            this.data.accountStatus = 'qrcode'
            setLocal('data', this.data)
            this.getAccount()
        },
        // 打开网站获取用户数据
        getStatus() {
            this.data.accountStatus = getLocal('data')?.accountStatus
        },
        // 获取用户信息
        getAccount() {
            reqAccount().then(({ data }) => {
                if (data.code === 200) {
                    this.user.account.avatarUrl = data.profile.avatarUrl
                    this.user.account.nickname = data.profile.nickname
                    setLocal('data', this.data)
                    return true
                } else {
                    return false
                }
            })
        }
    }
})
