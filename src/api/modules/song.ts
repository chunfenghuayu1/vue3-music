export interface SongDetail {
    ids: number | string
    timestamp?: number
}
export interface Lyric {
    id: number
    timestamp?: number
}
export interface SongUrl {
    id: number
    br?: number
}
export interface Scrobble {
    id: number
    sourceid: number
    time: number
    timestamp?: number
}
export interface SongSub {
    id: number
    like: boolean
    timestamp?: number
}
