import { serveNCM } from './NCM/service'
const match = require('@unblockneteasemusic/server')
import express from 'express'
import expressProxy from 'express-http-proxy'
import { join } from 'node:path'
import myDB from './sqliteDB'
import axios from 'axios'
process.env.DIST_ELECTRON = join(__dirname, '..')
process.env.DIST = join(process.env.DIST_ELECTRON, '../dist')

// 配置代理转发
export function createProxy() {
    // 开启node 网易云服务
    serveNCM()
    // 配置代理
    const expressApp = express()
    expressApp.use(function (req, res, next) {
        res.header('Access-Control-Allow-Origin', '*')
        res.header(
            'Access-Control-Allow-Headers',
            'Content-Type,Content-Length, Authorization, Accept,X-Requested-With'
        )
        res.header('Access-Control-Allow-Methods', 'POST,GET,OPTIONS')
        next()
    })

    // 转发文件地址到20231端口
    // 开发环境此 / 代理会被覆盖
    expressApp.use('/', express.static(process.env.DIST + '/'))
    // 解析接口地址 /prod-api /dev-api
    // import.meta.env.VITE_APP_BASE_API
    expressApp.use(import.meta.env.VITE_APP_BASE_API, expressProxy('http://127.0.0.1:15452'))

    // 监听端口
    expressApp.listen(20231)
}

async function getBiliVideoFile(url) {
    const response = await axios.get(url, {
        headers: {
            Referer: 'https://www.bilibili.com/',
            'User-Agent': 'okhttp/3.4.1'
        },
        responseType: 'arraybuffer'
    })

    return response.data
}
export const handlerAudioSource = async (sourceId: number) => {
    const { res } = myDB.select('trackDetail', sourceId)
    const { id } = JSON.parse(res.value)
    /**
     * Find matching song from other platforms
     * @param {Number} id netease song id
     * @param {Array<String>||undefined} source support qq, xiami, baidu, kugou, kuwo, migu, joox
     * @return {Promise<Object>}
     */
    const result = await match(id, ['pyncmd', 'kugou', 'bilibili'])
    if (result.url.includes('bilivideo.com')) {
        result.source = 'bilibili'
        result.url = await getBiliVideoFile(result.url)
    }
    return result
}
