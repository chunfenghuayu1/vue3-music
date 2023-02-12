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
    id: number
}
export interface EPData {
    type: string
    name: string
    id: number
    picUrl?: string
    coverImgUrl?: string
    [k: string]: any
}
export interface mvsData {
    artistName: string
    name: string
    artists: any[]
    cover: string
    [k: string]: any
}
