import request from '@/utils/request'

/**
 * 获取推荐歌单
 * 可选参数 : limit: 取出数量 , 默认为 30 (不支持 offset)
 * @param { number } limit
 */

export const reqAlbumListList = ({ limit }) => request({ url: `/personalized?limit=${limit}` })

/**
 * 获取排行榜单数据
 */
export const reqRankList = () => request({ url: '/toplist' })
/**
 * 获取热门新专辑
 */
export const reqAlbumNewest = () => request({ url: '/album/newest' })
