import request from '@/utils/request'
/**
 * 获取热门歌手
 * limit: 取出数量 , 默认为 50
 * @param {number} limit
 */
export const reqTopArtists = ({ limit }) => request({ url: '/top/artists', params: { limit } })
