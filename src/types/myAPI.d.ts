export interface IElectronAPI {
    handleStore: (arg: any) => void
    minWindow: () => void
    maxOrUnmaxWindow: () => void
    closeWindow: () => void
    isMaximize: (callback: (e: Electron.IpcRendererEvent, arg: boolean) => void) => void
    exitTypeSwitch: (
        callback: (e: Electron.IpcRendererEvent, arg: 'confirm' | 'minimize' | 'quit') => void
    ) => void
    islockMusic: () => void
    dbCache: (type: 'trackDetail' | 'trackSource' | 'lyric', data: any[]) => void
    selectDB: (type: 'trackDetail' | 'trackSource' | 'lyric', id: number) => Promise<any>
}

declare global {
    interface Window {
        myAPI: IElectronAPI
    }
}
