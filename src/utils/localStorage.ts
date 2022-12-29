export const setLocal = (item: string, data: any): void =>
    localStorage.setItem(item, JSON.stringify(data))
export const getLocal = (item: string): any => JSON.parse(localStorage.getItem(item) || '0')
export const removeLocal = (item: string): any => localStorage.removeItem(item)
