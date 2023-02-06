export const setLocal = (item: string, data: any): void =>
    localStorage.setItem(item, JSON.stringify(data))
export const getLocal = (item: string) => {
    const val = localStorage.getItem(item)
    if (val) {
        return JSON.parse(val)
    }
}
export const removeLocal = (item: string): any => localStorage.removeItem(item)
