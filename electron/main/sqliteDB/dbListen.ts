import { ipcMain } from 'electron'
import myDB from '.'
import store from '../store'
export function dbListen() {
    // 存储数据库
    /**
     * @param type 表格名称
     * @param data 表数据
     */
    ipcMain.on('dbCache', (e, arg) => {
        const { type, data } = arg
        myDB.replace(type, data)
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
