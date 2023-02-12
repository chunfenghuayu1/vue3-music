export interface albumData {
    picUrl: string
    name: string
    artists: any[]
    artist: {
        id: number
        name: string
        [k: any]: any
    }
    publishTime: number
    size: number
    description: string
    id: number
    [k: any]: any
}
