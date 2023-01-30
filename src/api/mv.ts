import http from '@/utils/axios/request'
import type { MVUrl, MVDetail } from './modules/mv'
enum Api {
    MVUrl = '/mv/url',
    MVDetail = '/mv/detail',
    MVSimi = '/simi/mv'
}
/**
 * mv 地址
 * 说明 : 调用此接口 , 传入 mv id,可获取 mv 播放地址
 * 必选参数 : id: mv id
 * 可选参数 : r: 分辨率,默认 1080,可从 /mv/detail 接口获取分辨率列表
 */
export const reqMVUrl = (params: MVUrl) => http.get({ url: Api.MVUrl, params })

/**
 * 获取 mv 数据
 * 说明 : 调用此接口 , 传入 mvid ( 在搜索音乐的时候传 type=1004 获得 ) , 可获取对应 MV 数据 , 数据包含 mv 名字 , 歌手 , 发布时间 , mv 视频地址等数据 , 其中 mv 视频 网易做了防盗链处理 , 可能不能直接播放 , 需要播放的话需要调用 ' mv 地址' 接口
 * 必选参数 : mvid: mv 的 id
 */
export const reqMVDetail = (params: MVDetail) => http.get({ url: Api.MVDetail, params })

/**
 * 相似 mv
 * 说明 : 调用此接口 , 传入 mvid 可获取相似 mv
 * 必选参数 : mvid: mv id
 */
export const reqMVSimi = (params: MVDetail) => http.get({ url: Api.MVSimi, params })
