// 只需要创建数据库时运行
// try {
//     db.exec(
//         `CREATE TABLE  trackDetail (
//             id    integer primary key,
//             value text,
//             updateTime timestamp)`
//     )
//     db.exec(
//         `CREATE TABLE  trackSource (
//             id    integer primary key,
//             value text,
//             updateTime timestamp)`
//     )
//     db.exec(
//         `CREATE TABLE  lyric (
//             id    integer primary key,
//             value text,
//             updateTime timestamp)`
//     )

//     console.log('success')
// } catch (error) {
//     console.log('fail')
// }
// const insertRow = db.prepare(`INSERT INTO trackDetail (id, value, updateTime) VALUES (?, ?, ?)`)
// insertRow.run(173541, JSON.stringify({ name: 'sdsdsa', age: 2 }), +new Date())
// const handlerDB = async <T>(callback: () => T): Promise<T> => {
//     try {
//         return await callback()
//     } catch (err) {
//         return undefined
//     }
// }
