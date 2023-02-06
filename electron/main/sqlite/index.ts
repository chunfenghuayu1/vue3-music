import Database from 'better-sqlite3'

interface data {
    id: number
    updateTime: Date
    value: any
}
type table = 'trackDetail' | 'trackSource' | 'lyric'

const db = new Database('music.db', {
    verbose: console.log
})
db.pragma('journal_mode = WAL')

// const insertRow = db.prepare(`INSERT INTO trackDetail (id, value, updateTime) VALUES (?, ?, ?)`)
// insertRow.run(173541, JSON.stringify({ name: 'sdsdsa', age: 2 }), +new Date())
// const handlerDB = async <T>(callback: () => T): Promise<T> => {
//     try {
//         return await callback()
//     } catch (err) {
//         return undefined
//     }
// }

class DataHandler {
    private db = null
    constructor(db) {
        this.db = db
    }
    // 增
    public insert(table: table, data: data) {
        const insertRow = this.db.prepare(
            `INSERT INTO ${table} (id, value, updateTime) VALUES (?, ?, ?)`
        )
        insertRow.run(data.id, JSON.stringify(data.value), +new Date())
        return { state: true }
    }
    // 删
    public delete(table: table, id: data['id']) {
        const deleteRow = this.db.prepare(`DELETE FROM ${table} WHERE id = ?`)
        deleteRow.run(id)
        return { state: true }
    }
    // 改
    public update(table: table, data: data) {
        const updateRow = this.db.prepare(
            `UPDATE ${table} SET value = ?, updateTime = ? WHERE id = ?`
        )
        updateRow.run(JSON.stringify(data.value), +new Date(), data.id)
        return { state: true }
    }
    // 查
    public select(table: table, id: data['id']) {
        const selectRow = this.db.prepare(`SELECT * FROM ${table} WHERE id = ?`)
        const row = selectRow.get(id)
        return { state: true, res: row }
    }
    // 清空数据
    public removeData() {
        this.db.prepare('DELETE FROM trackDetail').run()
        this.db.prepare('DELETE FROM trackSource').run()
        this.db.prepare('DELETE FROM lyric').run()
        return { state: true }
    }
    // 查询数据库行数
    public DBCount(table: table) {
        const count = this.db.prepare(`SELECT COUNT(*) FROM ${table}`)
        const res = count.get()
        return { state: true, res: res['COUNT(*)'] }
    }
    // 删除过期数据
    /**
     *
     * @param table 表名称
     * @param day 过期天数
     */
    public expireDel(table: table, day: number) {
        const ago = new Date().getDate() - day * 24 * 60 * 60 * 1000
        this.db.prepare(`DELETE FROM ${table} WHERE updateTime < ?`).run(ago)
    }
}
const myDB = new DataHandler(db)

export default myDB
