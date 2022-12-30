export const imgUrl = <T>(url: T): T => {
    return (url + `?param=512y512`) as T
}
