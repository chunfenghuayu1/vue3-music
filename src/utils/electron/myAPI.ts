import type { IElectronAPI } from '@/types/myAPI'

export const IS_ELECTRON: boolean = navigator.userAgent.indexOf('Electron') > -1

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
        IS_ELECTRON && window.myAPI.closeWindow()
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
    // 缓存音乐数据
    const dbCache: IElectronAPI['dbCache'] = (type, data) => {
        IS_ELECTRON && window.myAPI.dbCache(type, data)
    }
    return {
        dbCache
    }
}
