import { defineStore } from 'pinia'
import { getLocal, setLocal } from '@/utils/localStorage.js'
import localData from '@/utils/localData.js'
export const useStorageStore = defineStore('storageStore', {
    state: () => {
        return {
            data: {
                activeTags: []
            }
        }
    },
    actions: {
        // 获取全部标签,本地化
        getTags() {
            const tagsList = getLocal('data')?.activeTags
            // 如果首次使用，则本地没有数据，进行初始化
            // 如果有数据，则直接从本地取
            if (!tagsList) {
                this.data.activeTags = localData.explore.tags
                    .filter(item => item.hot === true)
                    .map(item => item.name)
                setLocal('data', this.data)
            } else {
                this.data.activeTags = getLocal('data').activeTags
            }
        },
        // 存储标签选择
        storeTags(item) {
            const flag = this.data.activeTags.indexOf(item.name)
            if (flag !== -1) {
                this.data.activeTags.splice(flag, 1)
            } else {
                this.data.activeTags.push(item.name)
            }
            setLocal('data', this.data)
        }
    }
})
