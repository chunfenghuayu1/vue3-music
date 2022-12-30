import http from '@/utils/axios/request'
import type { SongDetail } from './modules/song'
enum Api {
    SongDetail = '/song/detail'
}
/**
 * 获取歌曲详情
 * 必选参数 : ids: 音乐 id, 如 ids=347230
 */
export const reqSongDetail = (params: SongDetail) => http.get({ url: Api.SongDetail, params })
