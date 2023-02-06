export interface mvData {
    name: string
    cover: string
    artistName: string
    publishTime: string
    playCount: number
    [k: any]: any
}
// 此处数据暂时这么定义，解决报错

export interface simiMvItem {
    artistName: string
    artistId: number
    name: string
    artists: any[]
    cover: string
    id: number
    [k: any]: any
}
