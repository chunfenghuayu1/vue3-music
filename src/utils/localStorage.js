export const setLocal = (item, data) => localStorage.setItem(item, JSON.stringify(data))
export const getLocal = item => JSON.parse(localStorage.getItem(item))
export const removeLocal = item => localStorage.removeItem(item)
