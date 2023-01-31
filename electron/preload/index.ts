import { contextBridge, ipcRenderer } from 'electron'
contextBridge.exposeInMainWorld('myAPI', {
    handleStore: (arg: any) => ipcRenderer.send('settings', arg),
    minWindow: () => ipcRenderer.send('min'),
    maxOrUnmaxWindow: () => ipcRenderer.send('maxOrUnmax'),
    isMaximize: (callback: (event: Electron.IpcRendererEvent, arg: boolean) => void) =>
        ipcRenderer.on('isMaximize', callback),
    exitTypeSwitch: (
        callback: (event: Electron.IpcRendererEvent, arg: 'confirm' | 'minimize' | 'quit') => void
    ) => ipcRenderer.on('switchExitType', callback),
    closeWindow: () => ipcRenderer.send('close'),
    islockMusic: () => ipcRenderer.send('unlockMusic'),
    dbCache: (type: 'trackDetail' | 'trackSource' | 'lyric', data: any[]) =>
        ipcRenderer.send('dbCache', { type, data })
})
