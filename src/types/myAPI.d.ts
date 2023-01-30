export interface IElectronAPI {
    IS_ELECTRON: boolean
    IS_Development: boolean
    handleStore: () => void
    minWindow: () => void
    maxOrUnmaxWindow: () => void
    closeWindow: () => void
    isMaximize: any
    exitTypeSwitch: any
    islockMusic: () => void
}

declare global {
    interface Window {
        myAPI: IElectronAPI
    }
}
