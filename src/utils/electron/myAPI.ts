import type { IElectronAPI } from '@/types/myAPI'

export const IS_ELECTRON: boolean =
    import.meta.env.VITE_APP_IS_ELECTRON || navigator.userAgent.indexOf('Electron') > -1
console.log(IS_ELECTRON)

export function useMyAPI() {
    const handleStore: IElectronAPI['handleStore'] = arg => {
        IS_ELECTRON && window.myAPI.handleStore(arg)
    }
    const minWindow: IElectronAPI['minWindow'] = () => {
        IS_ELECTRON && window.myAPI.minWindow()
    }
    const maxOrUnmaxWindow: IElectronAPI['maxOrUnmaxWindow'] = () => {
        IS_ELECTRON && window.myAPI.maxOrUnmaxWindow()
    }
    const isMaximize: IElectronAPI['isMaximize'] = callback => {
        IS_ELECTRON && window.myAPI.isMaximize(callback)
    }
    const exitTypeSwitch: IElectronAPI['exitTypeSwitch'] = callback => {
        IS_ELECTRON && window.myAPI.exitTypeSwitch(callback)
    }
    const closeWindow: IElectronAPI['closeWindow'] = () => {
        if (IS_ELECTRON) {
            window.myAPI.closeWindow()
        }
    }
    const islockMusic: IElectronAPI['islockMusic'] = () => {
        IS_ELECTRON && window.myAPI.islockMusic()
    }
    return {
        handleStore,
        minWindow,
        maxOrUnmaxWindow,
        isMaximize,
        exitTypeSwitch,
        closeWindow,
        islockMusic
    }
}

export function useDB() {
    // 缓存replace音乐数据
    const dbCache: IElectronAPI['dbCache'] = (type, data) => {
        IS_ELECTRON && window.myAPI.dbCache(type, data)
    }
    // 查询数据
    const selectDB: IElectronAPI['selectDB'] = async (type, id) => {
        if (IS_ELECTRON) {
            try {
                const res = await window.myAPI.selectDB(type, id)
                return res
            } catch (err) {
                return null
            }
        }
    }
    return {
        dbCache,
        selectDB
    }
}
