import { app, BrowserWindow, shell, Menu, ipcMain, Tray, dialog } from 'electron'
import { release } from 'node:os'
import { join } from 'node:path'
import installExtension from 'electron-devtools-installer'
import store from './store'
import CreateMenu from './menu'
import { createProxy } from './express'
import { dbListen } from './sqliteDB/dbListen'
process.env.DIST_ELECTRON = join(__dirname, '..')
process.env.DIST = join(process.env.DIST_ELECTRON, '../dist')
process.env.PUBLIC = process.env.VITE_DEV_SERVER_URL
    ? join(process.env.DIST_ELECTRON, '../public')
    : join(process.env.DIST_ELECTRON, '../dist')

// Disable GPU Acceleration for Windows 7
if (release().startsWith('6.1')) app.disableHardwareAcceleration()

// Set application name for Windows 10+ notifications
if (process.platform === 'win32') app.setAppUserModelId(app.getName())

if (!app.requestSingleInstanceLock()) {
    app.quit()
    process.exit(0)
}

// Remove electron security warnings
// This warning only shows in development mode
// Read more on https://www.electronjs.org/docs/latest/tutorial/security
process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true'

class CreatWindow {
    private win: BrowserWindow | null
    private appTray: Tray | null
    constructor() {
        this.init()
    }
    // 在渲染前做些什么
    init() {
        // 开启node后台
        createProxy()
        // 开启主进程监听
        this.appListen()
        // 开启数据库监听
        dbListen()
        // ......
    }

    // 创建主窗口
    createWindow() {
        // resolve deepclone
        const { width, height, minHeight, minWidth } = store.get('window')
        const { theme } = store.get('window.settings')
        const options = {
            width: width,
            height: height,
            minWidth: minWidth,
            minHeight: minHeight,
            title: 'Music',
            frame: false,
            icon: join(process.env.PUBLIC, 'logo.ico'),
            backgroundColor: theme === 'light' ? '#fff' : '#222',
            // 创建时不显示
            show: false,
            webPreferences: {
                preload: join(__dirname, '../preload/index.js'),
                // 关闭node环境，开启隔离
                nodeIntegration: false,
                contextIsolation: true,
                webSecurity: true
            }
        }
        this.win = new BrowserWindow(options)
        // 对窗口进行处理
        this.winControl()
    }
    // 系统托盘
    createTray() {
        this.appTray = new Tray(join(process.env.PUBLIC, 'logo.ico'))
        const contextMenu = Menu.buildFromTemplate([
            { label: '播放', type: 'normal' },
            { label: '上一首', type: 'normal' },
            { label: '下一首', type: 'normal' },
            { type: 'separator' },
            { label: '退出应用', type: 'normal', click: () => app.quit() }
        ])
        this.appTray.setToolTip('Music')
        this.appTray.setContextMenu(contextMenu)
        this.appTray.on('click', () => {
            this.win.show()
        })
    }
    // 关闭窗口对话框
    creatDialog(win: BrowserWindow) {
        dialog
            .showMessageBox(win, {
                type: 'question',
                message: '确定要关闭吗？',
                title: 'Information',
                cancelId: 2,
                checkboxLabel: '记住我的选择',
                buttons: ['最小化窗口', '直接退出']
            })
            .then(({ response, checkboxChecked }) => {
                if (checkboxChecked && response !== 2) {
                    win.webContents.send('switchExitType', response === 0 ? 'minimize' : 'quit')
                }
                if (response === 0) {
                    win.minimize()
                }
                if (response === 1) {
                    win = null
                    app.exit()
                }
            })
            .catch(err => {
                console.log(err)
            })
    }
    // 主菜单
    createMenu() {
        new CreateMenu(this.win)
    }
    // 对渲染窗口做些什么
    winControl() {
        if (process.env.VITE_DEV_SERVER_URL) {
            // electron-vite-vue#298

            this.win.loadURL(`${process.env.VITE_DEV_SERVER_URL}`)

            // Open devTool if the app is not packaged
            // this.win.webContents.openDevTools()
        } else {
            this.win.loadURL('http://127.0.0.1:20231')
        }

        // Make all links open with the browser, not with the application
        this.win.webContents.setWindowOpenHandler(({ url }) => {
            if (url.startsWith('https:')) shell.openExternal(url)
            return { action: 'deny' }
        })
        // 关闭菜单
        // Menu.setApplicationMenu(null)
        this.createMenu()
        this.win.setMenuBarVisibility(false)

        this.win.once('ready-to-show', () => {
            this.win.show()
        })
        // 监听窗口事件
        this.win.on('maximize', () => {
            this.win.webContents.send('isMaximize', true)
        })
        this.win.on('unmaximize', () => {
            this.win.webContents.send('isMaximize', false)
        })
    }
    // 主进程监听事件
    appListen() {
        app.whenReady().then(() => {
            if (process.env.NODE_ENV === 'development') {
                installExtension('nhdogjmejiglipccpnnnanhbledajbpd')
                    .then(name => console.log(`Added Extension:  ${name}`))
                    .catch(err => console.log('An error occurred: ', err))
            }

            this.createTray()
            this.createWindow()
        })

        app.on('window-all-closed', () => {
            this.win = null
            this.appTray.destroy()
            if (process.platform !== 'darwin') app.quit()
        })

        app.on('activate', () => {
            if (this.win === null) {
                this.createWindow()
            }
        })
        // 存储持久化
        ipcMain.on('settings', (e, arg) => {
            store.set('window.settings', JSON.parse(arg))
        })
        // 窗口最小化
        ipcMain.on('min', () => {
            this.win.minimize()
        })
        // 窗口最大化/复原
        ipcMain.on('maxOrUnmax', () => {
            this.win.isMaximized() ? this.win.unmaximize() : this.win.maximize()
        })
        // 关闭应用
        ipcMain.on('close', () => {
            // this.win.hide()
            // 自定义标题栏无默认事件，不需要阻止默认事件
            // e.preventDefault()
            const { exitType } = store.get('window.settings')
            switch (exitType) {
                case 'minimize':
                    // this.win.webContents.send('switchExitType', 'confirm')
                    this.win.minimize()
                    break
                case 'quit':
                    this.win = null
                    app.exit()
                    break
                case 'confirm':
                    this.creatDialog(this.win)
                    break
            }
        })
    }
}
new CreatWindow()
