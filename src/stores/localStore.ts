import { defineStore } from 'pinia'
import { getLocal, setLocal } from '@/utils/localStorage'
import type { data, settings } from './initLocal'
import type { tags } from '@/utils/localData'
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
        }
    },
    getters: {},
    // 开启持久化
    persist: {
        enable: true
    }
})
