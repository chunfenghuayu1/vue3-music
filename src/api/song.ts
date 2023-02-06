import http from '@utils/axios/request'
import { useDB } from '@utils/electron/myAPI'
import type { SongDetail, Lyric, SongUrl } from './modules/song'
import { getLocal } from '@utils/localStorage'
enum Api {
    SongDetail = '/song/detail',
    Lyric = '/lyric',
    SongUrl = '/song/url'
}
const { selectDB, dbCache } = useDB()
/**
 * 获取歌曲详情
 * 必选参数 : ids: 音乐 id, 如 ids=347230
 */
export const reqSongDetail = (params: SongDetail) => http.get({ url: Api.SongDetail, params })

/**
 * 说明 : 调用此接口 , 传入音乐 id 可获得对应音乐的歌词 ( 不需要登录 )
 * 必选参数 : id: 音乐 id
 * 此处有数据库缓存校验
 */
export const reqLyric = async (params: Lyric) => {
    const { res } = await selectDB('lyric', params.id)
    if (res) {
        return Promise.resolve(JSON.parse(res.value).lyrics)
    } else {
        const res2 = await http.get({ url: Api.Lyric, params })
        dbCache('lyric', [{ id: params.id, lyrics: res2 }])
        return Promise.resolve(res2)
    }
}

/**
 * 说明 : 使用歌单详情接口后 , 能得到的音乐的 id, 但不能得到的音乐 url, 调用此接口, 传入的音乐 id( 可多个 , 用逗号隔开 ), 可以获取对应的音乐的 url,未登录* 状态或者非会员返回试听片段(返回字段包含被截取的正常歌曲的开始时间和结束时间)
 * 必选参数 : id : 音乐 id
 * 可选参数 : br: 码率,默认设置了 999000 即最大码率,如果要 320k 则可设置为 320000,其他类推
 */
/**
 * 改写逻辑
 * 如果解锁音乐，从接口查找，如果没有找到则从sql找
 * 如果sql有数据，则返回source buffer类型
 * 如果sql没有数据，则从unm拿数据，并且存储
 * 最后如果不解锁，则从接口取，以上情况可能都没有数据
 */
export const reqSongUrl = async (params: SongUrl) => {
    const { unlockMusic } = getLocal('settings')
    if (unlockMusic) {
        const res = await selectDB('trackSource', params.id)

        if (res) {
            return res
        }
        const res2 = await http.get({ url: Api.SongUrl, params: { id: params.id, br: '350000' } })
        if (res2.data[0].fee !== 1 && res2.data[0].url) {
            // 如果存在链接则存储
            res2.data[0].source = res2.data[0].url
            dbCache('trackSource', [{ id: params.id, song: res2.data[0] }])
            return res2.data[0].source
        }
    } else {
        const res = await http.get({ url: Api.SongUrl, params })
        return res.data[0].url
    }
}
