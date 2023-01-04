export const imgUrl = (url: string, k: number): string => {
    return url.replace(/^http:\/\//, 'https://') + `?param=${k}y${k}`
}
