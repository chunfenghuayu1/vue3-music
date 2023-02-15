import { serveNCM } from './NCM/service'
// import match from '@unblockneteasemusic/server'
import UNM from '@unblockneteasemusic/rust-napi'
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

async function getBiliVideoFile(url: string): Promise<Buffer> {
    const response = await axios.get(url, {
        headers: {
            Referer: 'https://www.bilibili.com/',
            'User-Agent': 'okhttp/3.4.1'
        },
        responseType: 'arraybuffer'
    })

    return response.data
}
/**
 * 缓存buffer
 */
export async function cacheBuffer(source: string): Promise<Buffer> {
    const response = await axios.get(source, {
        responseType: 'arraybuffer'
    })
    return response.data
}
const unmExecutor = new UNM.Executor()
export const handlerAudioSource = async (sourceId: number): Promise<Buffer> => {
    const { res } = myDB.select('trackDetail', sourceId)
    const { id, name, al, ar, dt } = JSON.parse(res.value)
    const song = {
        id: id && id.toString(),
        name,
        duration: dt,
        album: al && {
            id: al.id && al.id.toString(),
            name: al.name
        },
        artists: ar ? ar.map(({ id, name }) => ({ id: id && id.toString(), name })) : []
    }
    const sourceList = ['ytdl', 'bilibili', 'pyncm', 'kugou']
    const context = {
        SearchMode: 0,
        enableFlac: true
    }
    /**
     * Find matching song from other platforms
     * @param {Number} id netease song id
     * @param {Array<String>||undefined} source support qq, xiami, baidu, kugou, kuwo, migu, joox
     * @return {Promise<Object>}
     */
    try {
        const matchedAudio = await unmExecutor.search(sourceList, song, context)
        const retrievedSong = await unmExecutor.retrieve(matchedAudio, context)
        console.log(retrievedSong)

        if (retrievedSong.url.includes('bilivideo.com')) {
            const res = await getBiliVideoFile(retrievedSong.url)
            return res
        } else {
            const res = await cacheBuffer(retrievedSong.url)
            return res
        }
    } catch (err) {
        console.log(err)
        return null
    }
}
