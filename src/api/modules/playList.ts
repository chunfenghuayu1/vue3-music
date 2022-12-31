export interface PlayList {
    order: 'hot' | 'new'
    limit?: number
    cat?: string
    offset?: number
}
export interface AlbumListList {
    limit?: number
}
export interface HighqualityPlaylist {
    cat?: string
    limit?: number
    brfore?: number
}
export interface Album {
    id: number
}
export interface RecomNewSong {
    limit?: number
}
export interface PlayListDetail {
    id: number
    s?: number
}
export interface PlayLsitTrankAll {
    id: number
    limit?: number
    offset?: number
}
