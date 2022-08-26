import request from '@/utils/request'

/**
 * 获取歌曲详情
 * 必选参数 : ids: 音乐 id, 如 ids=347230
 */
export const reqSongDetail = ({ ids, timestamp = +new Date() }) => {
    return request({ url: '/song/detail', params: { ids, timestamp } })
}
