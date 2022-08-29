import request from '@/utils/request'

/**
 *获取账号信息
 */
export const reqAccount = () => request({ url: '/user/account' })

/**
 * 获取用户信息 , 歌单，收藏，mv, dj 数量
 */
export const reqSubcount = () => request({ url: '/user/subcount' })

/**
 * 获取用户歌单
 * 必选参数 : uid : 用户 id
 * 可选参数 :
 * limit : 返回数量 , 默认为 30
 * offset : 偏移数量，用于分页 , 如 :( 页数 -1)*30, 其中 30 为 limit 的值 , 默认为 0
 */
export const reqUserPlayList = ({ uid, limit, offset = 0, timestamp = +new Date() }) =>
    request({ url: '/user/playlist', params: { uid, limit, offset, timestamp } })

/**
 * 喜欢音乐列表
 * 必选参数 : uid: 用户 id
 */
export const reqLikeSongs = ({ uid, timestamp = +new Date() }) =>
    request({ url: '/likelist', params: { uid, timestamp } })
