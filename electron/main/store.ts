import Store from 'electron-store'

interface options {
    width: number
    height: number
    minWidth: number
    minHeight: number
    [k: string]: any
}
const window: options = {
    width: 1440,
    height: 800,
    minWidth: 1080,
    minHeight: 720,
    settings: {
        theme: 'dark',
        exitType: 'confirm',
        unlockMusic: true
    }
}
// 创建electron-store实例
class MyStore {
    private instance: any
    constructor() {
        this.instance = new Store()
    }

    set(key: string, value: any) {
        this.instance.set(key, value)
    }
    get(key: string) {
        return this.instance.get(key)
    }
    del(key: string) {
        return this.instance.delete(key)
    }
}

const store = new MyStore()
if (!store.get('window')) {
    store.set('window', window)
}

export default store
