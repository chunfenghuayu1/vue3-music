import { contextBridge, ipcRenderer } from 'electron'

contextBridge.exposeInMainWorld('myAPI', {
    IS_ELECTRON: process.platform === 'win32',
    IS_Development: process.env.NODE_ENV === 'development',
    handleStore: (arg: any) => ipcRenderer.send('settings', arg),
    minWindow: () => ipcRenderer.send('min'),
    maxOrUnmaxWindow: () => ipcRenderer.send('maxOrUnmax'),
    isMaximize: callback => ipcRenderer.on('isMaximize', callback),
    exitTypeSwitch: callback => ipcRenderer.on('switchExitType', callback),
    closeWindow: () => ipcRenderer.send('close'),
    islockMusic: () => ipcRenderer.send('unlockMusic')
})
