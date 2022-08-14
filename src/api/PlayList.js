import request from '@/utils/request'

// 获取推荐歌单
// 可选参数 : limit: 取出数量 , 默认为 30 (不支持 offset)
export const reqRecomPlayList = ({ limit = 30 }) => request({ url: `/personalized?limit=${limit}` })
