import request from '@/utils/request'

/**
 * 获取推荐歌单
 * 可选参数 : limit: 取出数量 , 默认为 30 (不支持 offset)
 * @param { number } limit
 */
export const reqAlbumListList = ({ limit }) => request({ url: `/personalized?limit=${limit}` })

/**
 * 获取精品歌单
 * cat: tag, 比如 " 华语 "、" 古风 " 、" 欧美 "、" 流行 ", 默认为 "全部",可从精品歌单标签列表接口获取(/playlist/highquality/tags)
 * limit: 取出歌单数量 , 默认为 50
 * before: 分页参数,取上一页最后一个歌单的 updateTime 获取下一页数据
 */
export const reqHighqualityPlaylist = ({ limit, cat }) =>
    request({ url: '/top/playlist/highquality', params: { limit, cat } })

/**
 * 获取排行榜单数据
 */
export const reqRankList = () => request({ url: '/toplist' })

/**
 * 获取歌单数据
 * order: 可选值为 'new' 和 'hot', 分别对应最新和最热 , 默认为 'hot'
 * cat: tag, 比如 " 华语 "、" 古风 " 、" 欧美 "、" 流行 ", 默认为 "全部",可从歌单分类接口获取(/playlist/catlist)
 * limit: 取出歌单数量 , 默认为 50
 * offset: 偏移数量 , 用于分页 , 如 :( 评论页数 -1)*50, 其中 50 为 limit 的值
 */
export const reqPlayList = ({ limit, cat }) =>
    request({ url: '/top/playlist', params: { limit, cat } })

/**
 * 获取热门新专辑
 */
export const reqAlbumNewest = () => request({ url: '/album/newest' })

/**
 * 获取推荐新音乐
 * @param {number} limit
 */
export const reqRecomNewSong = ({ limit }) =>
    request({ url: `/personalized/newsong?limit=${limit}` })

/**
 * 获取热门歌单标签
 */
// export const reqHotCatTags = () => request({ url: '/playlist/hot' })

/**
 * 获取全部歌单标签
 */
// export const reqCatTags = () => request({ url: '/playlist/catlist' })
