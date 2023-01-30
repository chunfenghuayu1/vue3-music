import { serveNCM } from './NCM/service'
import UNM from '@unblockneteasemusic/rust-napi'
import type { JsExecutor } from '@unblockneteasemusic/rust-napi'
import express from 'express'
import expressProxy from 'express-http-proxy'
import { join } from 'node:path'
import { ipcMain } from 'electron'
import store from './store'
process.env.DIST_ELECTRON = join(__dirname, '..')
process.env.DIST = join(process.env.DIST_ELECTRON, '../dist')

let executor: JsExecutor | null = null

const { unlockMusic } = store.get('window.settings')
if (unlockMusic) {
    executor = new UNM.Executor()
} else {
    executor = null
}
console.log(executor)

// 配置代理转发
export function createProxy() {
    // 开启node 网易云服务
    serveNCM()
    // 配置代理
    const expressApp = express()

    // 转发文件地址到20231端口
    expressApp.use('/', express.static(process.env.DIST + '/'))

    // 解析接口地址 /prod-api /dev-api
    // import.meta.env.VITE_APP_BASE_API
    expressApp.use('/prod-api', expressProxy('http://127.0.0.1:15452'))
    expressApp.use('/prod-api/player', (req, res) => {})
    // 监听端口
    expressApp.listen(20231)
}

ipcMain.on('unlockMusic', () => {
    const { unlockMusic } = store.get('window.settings')
    unlockMusic ? (executor = new UNM.Executor()) : (executor = null)
})
