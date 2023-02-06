import { round } from 'lodash-es'
// 格式化播放数量
export const formatPlayCount = (count: number): number | string => {
    if (count > 100000000) {
        return (count / 100000000).toFixed(2) + '亿'
    } else if (count > 10000) {
        return (count / 10000).toFixed(2) + '万'
    } else {
        return count
    }
}

// 毫秒转年月日
export const formatDate = (value: number): string => {
    const date = new Date(value)
    const YY = date.getFullYear()
    const MM = date.getMonth() < 9 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1
    const DD = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
    return `${YY}年${MM}月${DD}日`
}

// 毫秒转分钟
export const forminute = (value: number): string => {
    const time = new Date(value)
    const mm = time.getMinutes()
    const ss = time.getSeconds() < 10 ? '0' + time.getSeconds() : time.getSeconds()
    return `${mm}:${ss}`
}

// xxxx-xx-xx
export const formatDateStr = <T>(value: T): string => {
    const arr = (value as any).split('-')
    const y = arr[0]
    const m = arr[1]
    const d = arr[2]
    return `${y}年${m}月${d}日`
}
// 转百分数
export function toPercent(point: number): string {
    const str = round(point * 100, 2)
    return str + '%'
}
