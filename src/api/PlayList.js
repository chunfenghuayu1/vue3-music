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
export const reqHighqualityPlaylist = ({ limit, cat, before = null }) =>
    request({ url: '/top/playlist/highquality', params: { limit, cat, before } })

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
export const reqPlayList = ({ limit, cat, offset }) =>
    request({ url: '/top/playlist', params: { limit, cat, offset } })

/**
 * 获取热门新专辑
 */
export const reqAlbumNewest = () => request({ url: '/album/newest' })

/**
 * 获取专辑内容
 * 必选参数 : id: 专辑 id
 */
export const reqAlbumDetail = ({ id }) => request({ url: '/album', params: { id } })

/**
 * 获取推荐新音乐
 * @param {number} limit
 */
export const reqRecomNewSong = ({ limit }) =>
    request({ url: `/personalized/newsong?limit=${limit}` })

/**
 * 获取热门歌单标签
 */
export const reqHotCatTags = () => request({ url: '/playlist/hot' })

/**
 * 获取全部歌单标签
 */
export const reqCatTags = () => request({ url: '/playlist/catlist' })

/**
 * 获取歌单详情
 * 说明 : 歌单能看到歌单名字, 但看不到具体歌单内容 , 调用此接口 , 传入歌单 id, 可以获取对应歌单内的所有的音乐(未登录状态只能获取不完整的歌单,登录后是完整的)，但是返回的 trackIds 是完整的，tracks 则是不完整的，可拿全部 trackIds 请求一次 song/detail 接口获取所有歌曲的详情 (https://github.com/Binaryify/NeteaseCloudMusicApi/issues/452)
 * 必选参数 : id : 歌单 id
 * 可选参数 : s : 歌单最近的 s 个收藏者,默认为 8
 */
export const reqPlayListDetail = ({ id }) => request({ url: '/playlist/detail', params: { id } })

/**
 * 获取歌单所有歌曲
 * 必选参数 : id : 歌单 id
 * 可选参数 : limit : 限制获取歌曲的数量，默认值为当前歌单的歌曲数量
 * 可选参数 : offset : 默认值为0
 * @param {number} id
 * @param {number} offset
 * @param {number} limit
 */
export const reqPlayLsitTrankAll = ({ id, offset = 0, limit = 100 }) =>
    request({ url: '/playlist/track/all', params: { id, offset, limit } })
