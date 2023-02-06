import { ipcMain } from 'electron'
import myDB from '.'
import store from '../store'
import axios from 'axios'
import { handlerAudioSource } from '../express'
export function dbListen() {
    // 存储数据库
    /**
     * @param type 表格名称
     * @param data 表数据
     */
    ipcMain.on('dbCache', async (e, arg) => {
        const { type, data } = arg
        /**
         * 处理前端返回的url，转buffer存sql
         */
        if (type === 'trackSource') {
            if (data[0].song.source) {
                const buffer = await cacheBuffer(data[0].song.source)
                myDB.replaceSong(type, data[0].id, buffer)
            }
            return
        }
        myDB.replace(type, data)
    })
    /**
     * 缓存buffer
     */
    async function cacheBuffer(source: string) {
        const response = await axios.get(source, {
            responseType: 'arraybuffer'
        })
        return response.data
    }
    /**
     * 查询数据
     */
    ipcMain.handle('selectDB', async (e, arg) => {
        const { type, id } = arg

        if (type === 'trackSource') {
            const { res } = myDB.select('trackSource', id)
            if (res) {
                return res.source
            } else {
                try {
                    const { url, source } = await handlerAudioSource(id)

                    if (!url) {
                        return { state: true }
                    }
                    if (source === 'bilibili') {
                        const buffer = Buffer.from(url, 'base64')
                        myDB.replaceSong('trackSource', id, buffer)
                        return buffer
                    } else {
                        const res = await cacheBuffer(url)
                        return res
                    }
                } catch (err) {
                    return null
                }
            }
        }
        return myDB.select(type, id)
    })

    // 检查数据是否过期,过期时间设置从elelctron-store取出
    /**
     * 每次开启程序检查一次
     * 如果过期则删除数据
     * 检查所有表的数据
     * @param expire 过期时间
     */
    function removeExpireDataFromDB() {
        const { expire } = store.get('window.settings')
        myDB.expireDel('lyric', expire)
        myDB.expireDel('trackDetail', expire)
        myDB.expireDel('trackSource', expire)
    }
    removeExpireDataFromDB()
}
