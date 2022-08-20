export const formatPlayCount = count => {
    if (count > 100000000) {
        return (count / 100000000).toFixed(2) + '亿'
    } else if (count > 10000) {
        return (count / 10000).toFixed(2) + '万'
    } else {
        return count
    }
}
