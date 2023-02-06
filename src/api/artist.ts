import http from '@utils/axios/request'
import type { TopArtists, Artist, ArtistAlbum } from './modules/artist'
enum Api {
    TopArtists = '/top/artists',
    ArtistDetail = '/artist/detail',
    ArtistSingle = '/artists',
    ArtistMV = '/artist/mv',
    ArtistAlbum = '/artist/album',
    ArtistSimi = '/simi/artist',
    AritstTop = '/artist/top/song'
}
/**
 * 获取热门歌手
 * limit: 取出数量 , 默认为 50
 * @params {number}
 */
export const reqTopArtists = (params: TopArtists) => http.get({ url: Api.TopArtists, params })

/**
 * 获取歌手详情
 * 说明 : 调用此接口 , 传入歌手 id, 可获得获取歌手详情
 * 必选参数 : id: 歌手 id
 */
export const reqArtistDetail = (params: Artist) => http.get({ url: Api.ArtistDetail, params })

/**
 * 获取歌手单曲
 * 说明 : 调用此接口 , 传入歌手 id, 可获得歌手部分信息和热门歌曲
 * 必选参数 : id: 歌手 id, 可由搜索接口获得
 */
export const reqArtistSingle = (params: Artist) => http.get({ url: Api.ArtistSingle, params })

/**
 * 获取歌手 mv
 * 说明 : 调用此接口 , 传入歌手 id, 可获得歌手 mv 信息 , 具体 mv 播放地址可调 用/mv传入此接口获得的 mvid 来拿到 , 如 : /artist/mv?id=6452,/mv?mvid=5461064
 * 必选参数 : id: 歌手 id, 可由搜索接口获得
 */
export const reqArtistMV = (params: Artist) => http.get({ url: Api.ArtistMV, params })

/**
 * 获取歌手专辑
 * 说明 : 调用此接口 , 传入歌手 id, 可获得歌手专辑内容
 * 必选参数 : id: 歌手 id
 * 可选参数 : limit: 取出数量 , 默认为 30
 * offset: 偏移数量 , 用于分页 , 如 :( 页数 -1)*30, 其中 30 为 limit 的值 , 默认 为 0
 */
export const reqArtistAlbum = (params: ArtistAlbum) => http.get({ url: Api.ArtistAlbum, params })

/**
 * 获取相似歌手
 * 说明 : 调用此接口 , 传入歌手 id, 可获得相似歌手
 * 必选参数 : id: 歌手 id
 */
export const reqArtistSimi = (params: Artist) => http.get({ url: Api.ArtistSimi, params })

/**
 * 歌手热门 50 首歌曲
 * 说明 : 调用此接口,可获取歌手热门 50 首歌曲
 * id : 歌手 id
 */
export const reqAritstTop = (params: Artist) => http.get({ url: Api.AritstTop, params })
