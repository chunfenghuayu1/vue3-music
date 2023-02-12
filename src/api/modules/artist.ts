export interface TopArtists {
    limit?: number
}
export interface Artist {
    id: number
}
export interface ArtistAlbum {
    id: number
    limit?: number
    offset?: number
}
export interface ArtistSub {
    id: number
    t: 1 | 2
    timestamp?: number
}
