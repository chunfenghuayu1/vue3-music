export const setLocal = (item: string, data: any): void => {
    try {
        localStorage.setItem(item, JSON.stringify(data))
    } catch (e) {
        console.log(e)
    }
}

export const getLocal = (item: string): any => {
    try {
        const itemValue = localStorage.getItem(item)
        return itemValue ? JSON.parse(itemValue) : null
    } catch (e) {
        console.log(e)
        return null
    }
}

export const removeLocal = (item: string): any => {
    try {
        localStorage.removeItem(item)
    } catch (e) {
        console.log(e)
    }
}
