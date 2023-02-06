export interface List {
    name: string
    coverImgUrl: string
    creator: {
        userId: number
        nickname: string
    }
    updateTime: number
    trackCount: number
    description: string
}
export interface PlayListDetail {
    id: number
    limit: number
    offset: number
}
