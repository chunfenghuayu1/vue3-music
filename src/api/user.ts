import http from '@/utils/axios/request'
import type {
    UserPlayList,
    LikeSongs,
    LikeAlbum,
    LikeArtist,
    UserRecord,
    PersonalFM,
    TrashFM
} from './modules/user'
enum Api {
    Account = '/user/account',
    Subcount = '/user/subcount',
    UserPlayList = '/user/playlist',
    LikeSongs = '/likelist',
    LikeAlbum = '/album/sublist',
    LikeArtist = '/artist/sublist',
    LikeMV = '/mv/sublist',
    likeCloud = '/user/cloud',
    UserRecord = '/user/record',
    RecomSongs = '/recommend/songs',
    PersonalFM = '/personal_fm',
    trashFM = '/fm_trash'
}

/**
 *获取账号信息
 */
export const reqAccount = () => http.get({ url: Api.Account })

/**
 * 获取用户信息 , 歌单，收藏，mv, dj 数量
 */
export const reqSubcount = () => http.get({ url: Api.Subcount })

/**
 * 获取用户歌单
 * 必选参数 : uid : 用户 id
 * 可选参数 :
 * limit : 返回数量 , 默认为 30
 * offset : 偏移数量，用于分页 , 如 :( 页数 -1)*30, 其中 30 为 limit 的值 , 默认为 0
 */
export const reqUserPlayList = (params: UserPlayList) => http.get({ url: Api.UserPlayList, params })

/**
 * 喜欢音乐列表
 * 必选参数 : uid: 用户 id
 */
export const reqLikeSongs = (params: LikeSongs) => http.get({ url: Api.LikeSongs, params })

/**
 * 获取已收藏专辑列表
 * 说明 : 调用此接口 , 可获得已收藏专辑列表
 * 可选参数 :
 * limit: 取出数量 , 默认为 25
 * offset: 偏移数量 , 用于分页 , 如 :( 页数 -1)*25, 其中 25 为 limit 的值 , 默认 为 0
 */
export const reqLikeAlbum = (params: LikeAlbum) => http.get({ url: Api.LikeAlbum, params })

/**
 * 收藏的歌手列表
 * 说明 : 调用此接口,可获取收藏的歌手列表
 */
export const reqLikeArtist = (params: LikeArtist) => http.get({ url: Api.LikeArtist, params })

/**
 * 收藏的 MV 列表
 * 说明 : 调用此接口,可获取收藏的 MV 列表
 */
export const reqLikeMV = (params: LikeArtist) => http.get({ url: Api.LikeMV, params })

/**
 * 云盘
 * 说明 : 登录后调用此接口 , 可获取云盘数据 , 获取的数据没有对应 url, 需要再调用一 次 /song/url 获取 url
 * 可选参数 :
 * limit : 返回数量 , 默认为 30
 * offset : 偏移数量，用于分页 , 如 :( 页数 -1)*200, 其中 200 为 limit 的值 , 默认为 0
 */
export const reqlikeCloud = (params: LikeAlbum) => http.get({ url: Api.likeCloud, params })

/**
 * 获取用户播放记录
 * 说明 : 登录后调用此接口 , 传入用户 id, 可获取用户播放记录
 * 必选参数 : uid : 用户 id
 * 可选参数 : type : type=1 时只返回 weekData, type=0 时返回 allData
 */
export const reqUserRecord = (params: UserRecord) => http.get({ url: Api.UserRecord, params })

/**
 * 获取每日推荐歌曲
 * 说明 : 调用此接口 , 可获得每日推荐歌曲 ( 需要登录 )
 */
export const reqRecomSongs = () => http.get({ url: Api.RecomSongs })

/**
 * 获取私人FM
 */
export const reqPersonalFM = (params: PersonalFM) => http.get({ url: Api.PersonalFM, params })

/**
 * 调用此接口 , 传入音乐 id, 可把该音乐从私人 FM 中移除至垃圾桶
 */
export const reqTrashFM = (params: TrashFM) => http.get({ url: Api.trashFM, params })
