import Database from 'better-sqlite3'

interface data {
    id: number
    [k: string]: any
}

type id = number
type table = 'trackDetail' | 'trackSource' | 'lyric'

const db = new Database('music.db', {
    verbose: console.log
})
db.pragma('journal_mode = WAL')
try {
    db.exec(
        `CREATE TABLE  trackDetail (
            id    integer primary key,
            value text,
            updateTime timestamp)`
    )
    db.exec(
        `CREATE TABLE  trackSource (
            id    integer primary key,
            source blob,
            updateTime timestamp)`
    )
    db.exec(
        `CREATE TABLE  lyric (
            id    integer primary key,
            value text,
            updateTime timestamp)`
    )

    console.log('success')
} catch (error) {
    console.log('fail')
}

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
        insertRow.run(data.id, JSON.stringify(data), +new Date())
        return { state: true }
    }
    // 删
    public delete(table: table, id: id) {
        const deleteRow = this.db.prepare(`DELETE FROM ${table} WHERE id = ?`)
        deleteRow.run(id)
        return { state: true }
    }
    // 改
    public update(table: table, data: data) {
        const updateRow = this.db.prepare(
            `UPDATE ${table} SET value = ?, updateTime = ? WHERE id = ?`
        )
        updateRow.run(JSON.stringify(data), +new Date(), data.id)
        return { state: true }
    }
    // 查
    public select(table: table, id: id) {
        const selectRow = this.db.prepare(`SELECT * FROM ${table} WHERE id = ?`)
        const row = selectRow.get(id)

        return { state: true, res: row }
    }
    // 覆盖
    public replace(table: Exclude<table, 'trackSource'>, data: data[]) {
        const replace = db.prepare(`REPLACE INTO ${table} VALUES (?, ?, ?)`)
        const replaceMany = db.transaction((data: data[]) => {
            for (const item of data) {
                replace.run(item.id, JSON.stringify(item), +new Date())
            }
        })
        replaceMany(data)
        return { state: true }
    }
    // 单独处理歌曲数据
    public replaceSong(table: 'trackSource', id: number, source: Buffer) {
        const replace = db.prepare(`REPLACE INTO ${table} VALUES (?, ?, ?)`)
        replace.run(id, source, +new Date())
        return { state: true }
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
        const ago = Date.now() - day * 24 * 60 * 60 * 1000
        this.db.prepare(`DELETE FROM ${table} WHERE updateTime < ?`).run(ago)
    }
}
const myDB = new DataHandler(db)

export default myDB
