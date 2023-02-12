export interface MVUrl {
    id: number
    r?: number
}
export interface MVDetail {
    mvid: number
}
export interface MVSub {
    mvid: number
    t: 1 | 2
    timestamp?: number
}
