export interface UserPlayList {
    uid: number
    limit?: number
    offset?: number
    timestamp?: number
}
export interface LikeSongs {
    uid: number
    timestamp?: number
}
export interface LikeAlbum {
    limit?: number
    offset?: number
    timestamp?: number
}
export interface LikeArtist {
    limit?: number
    timestamp?: number
}
export interface UserRecord {
    uid: number
    type?: number
}
export interface PersonalFM {
    timestamp: number
}
export interface TrashFM {
    id: number
}
