export const imgUrl = (url: string): string => {
    return url.replace(/^http:\/\//, 'https://') + `?param=512y512`
}
