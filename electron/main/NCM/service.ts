const server = require('NeteaseCloudMusicApi/server')
import { defMod } from './mod'

export const serveNCM = async () => {
    console.log('serve NCM API')

    await server.serveNcmApi({
        port: 15452,
        moduleDefs: defMod
    })
}
