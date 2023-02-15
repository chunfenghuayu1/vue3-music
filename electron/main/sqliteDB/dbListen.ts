import { ipcMain } from 'electron'
import myDB from './index'
import store from './../store'
import { cacheBuffer } from '../express'
import { handlerAudioSource } from './../express'
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
     * 查询数据
     */
    ipcMain.handle('selectDB', async (e, arg) => {
        try {
            const { type, id } = arg
            if (type === 'trackSource') {
                const { res } = myDB.select('trackSource', id)
                if (res) {
                    return res.source
                } else {
                    const res = await handlerAudioSource(id)
                    if (!res) return
                    myDB.replaceSong('trackSource', id, res)
                    return res
                }
            }
            return myDB.select(type, id)
        } catch (err) {
            console.log(err)
        }
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
