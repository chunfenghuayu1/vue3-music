export interface topSongData {
    al: {
        picUrl: string
        [k: any]: any
    }
    name: string
    alia: string[]
    ar: any[]
}
export interface artistData {
    name: string
    cover: string
    albumSize: number
    musicSize: number
    mvSize: number
    briefDesc: string
}
export interface EPData {
    type: string
    [k: any]: any
}
export interface mvsData {
    imgurl: string
    name: string
    publishTime: string
}
