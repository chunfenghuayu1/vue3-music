// 暂时只支持F12，后续加上音乐操作
import type { MenuItemConstructorOptions, BrowserWindow } from 'electron'
import { Menu } from 'electron'

class CreateMenu {
    private template: MenuItemConstructorOptions[] | null
    private menu = null
    constructor(win: BrowserWindow) {
        this.template = [
            {
                label: 'Help',
                submenu: [
                    {
                        label: '开发者工具',
                        accelerator: 'F12',
                        click: () => {
                            import.meta.env.VITE_MODE_NAME === 'development' &&
                                win.webContents.openDevTools()
                        }
                    }
                ]
            }
        ]
        this.init()
    }

    init() {
        this.menu = Menu.buildFromTemplate(this.template)
        Menu.setApplicationMenu(this.menu)
    }
}
export default CreateMenu
