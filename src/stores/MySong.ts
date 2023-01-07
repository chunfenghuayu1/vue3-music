import { defineStore } from 'pinia'
import { useLocalStore } from '@/stores/localStore'
import {
    reqUserPlayList,
    reqLikeSongs,
    reqLikeAlbum,
    reqLikeArtist,
    reqLikeMV,
    reqlikeCloud,
    reqUserRecord,
    reqRecomSongs,
    reqPersonalFM
} from '@/api/user'
import { reqPlayListDetail } from '@/api/playList'
import { imgUrl } from '@/utils/imgUrl'

export const useMySong = defineStore('MySong', {
    state: () => {
        return {
            // 用户喜欢的音乐
            like: {
                // 我喜欢的音乐列表
                tracks: <any>[],
                // 用户喜欢的音乐全部列表 对比用
                likeSongIds: <any>[],
                // 用户喜欢的专辑
                likeAlbum: <any>[],
                // 用户喜欢的艺人
                likeArtist: <any>[],
                // 用户喜欢的MV
                likeMV: <any>[],
                // 用户云盘
                likeCloud: <any>[],
                // 用户听歌记录
                likeRecord: {
                    weekData: <any>[],
                    allData: <any>[]
                },
                // 用户每日推荐
                dailySongs: <any>[],
                // FM
                personalFM: <any>[]
            },
            // 用户全部歌单
            userList: {
                // 是否还有更多
                more: false,
                // 用户歌单
                playlist: <any>[]
            }
        }
    },
    actions: {
        // 初始化我的音乐
        async initMySong() {
            const localStore = useLocalStore()
            // 如果没有登录，则不发送请求
            if (!localStore.loginStatus) {
                localStore.data.loginMode = ''
                localStore.data.user = {
                    userId: 0,
                    avatarUrl: '',
                    nickname: ''
                }
                return
            }
            // 验证用户信息是否可以拿到
            await localStore.getUserInfo()
            // 如果登录了
            // 则获取用户歌单及喜欢的音乐
            this.getUserPlayList()
            this.getLikeList()
        },
        // 在my页面获取数据
        async getMyData() {
            this.getUserLikeAlbum()
            this.getUserLikeArtist()
            this.getUserLikeMV()
            this.getUserLikeCloud()
            this.getUserRecord({ type: 1 })
            this.getUserRecord({ type: 0 })
        },
        // 获取用户歌单列表
        async getUserPlayList() {
            const localStore = useLocalStore()
            const res = await reqUserPlayList({ uid: localStore.userId, limit: 100 })
            if (res.code === 200) {
                this.userList.more = res.more
                this.userList.playlist = res.playlist
                this.getUserLikeSongs()
            }
        },
        // 获取用户喜欢的音乐列表信息（包括音乐信息，但没有详细信息）
        async getUserLikeSongs() {
            const res = await reqPlayListDetail({ id: this.userList.playlist[0].id })
            if (res.code === 200) {
                this.like.tracks = res.playlist.tracks
            }
        },
        // 获取用户已喜欢的音乐列表
        async getLikeList() {
            const localStore = useLocalStore()
            const res = await reqLikeSongs({ uid: localStore.userId })
            if (res.code === 200) {
                this.like.likeSongIds = res.ids
            }
        },
        // 获取用户关注专辑
        async getUserLikeAlbum() {
            const res = await reqLikeAlbum({ limit: 30 })
            if (res.code === 200) {
                this.like.likeAlbum = res.data
            }
        },
        // 获取用户关注艺人
        async getUserLikeArtist() {
            const res = await reqLikeArtist({ limit: 30 })
            if (res.code === 200) {
                this.like.likeArtist = res.data
            }
        },
        // 获取用户关注mv
        async getUserLikeMV() {
            const res = await reqLikeMV({ limit: 30 })
            if (res.code === 200) {
                this.like.likeMV = res.data
            }
        },
        // 获取用户云盘
        // 这里不做按需加载，默认获取1000首
        async getUserLikeCloud() {
            const res = await reqlikeCloud({ limit: 300, offset: 0 })
            if (res.code === 200) {
                this.like.likeCloud = res.data
            }
        },
        // 获取用户听歌排行
        async getUserRecord({ type = 1 }) {
            // 用户id
            const localStore = useLocalStore()
            const id = localStore.userId
            const res = await reqUserRecord({ uid: id, type: type })
            if (res.code === 200) {
                if (type === 1) {
                    this.like.likeRecord.weekData = res.weekData
                    return
                }
                if (type === 0) {
                    this.like.likeRecord.allData = res.allData
                    return
                }
            }
        },
        //获取用户每日推荐
        async getUserPersonalRecom() {
            const { data } = await reqRecomSongs()
            this.like.dailySongs = data.dailySongs
        },
        // 获取私人FM
        async getUserPersonalFM() {
            const res = await reqPersonalFM({ timestamp: +new Date() })
            this.like.personalFM = res.data[0]
            this.like.personalFM.picUrl = imgUrl(res.data[0].album.picUrl, 512)
        }
    },
    getters: {
        // 歌单列表
        playlist: state => {
            // 用户id
            const localStore = useLocalStore()
            const id = localStore.userId
            // 缓存数组
            const list = state.userList.playlist.slice(1)
            return (value: number) => {
                // 创建的歌单
                if (value === 1) {
                    return list.filter((i: any) => i.userId === id)
                }
                // 所有歌单列表
                if (value === 2) {
                    return list
                }
                // 收藏的歌单列表
                if (value === 3) {
                    return list.filter((i: any) => i.userId !== id)
                }
            }
        },
        // 喜欢的音乐数量
        tracksCount: state => state.like.tracks.length,
        // 展示的音乐，只有12首
        showLikeSongs: state => state.like.tracks.slice(0, 12),
        // 全部喜欢音乐
        showAllLikeSongs: state => state.like.tracks,
        // 喜欢的音乐id
        likeSongIds: state => {
            const ids = state.like.likeSongIds
            return (id: number) => ids.includes(id)
        },
        // 用户喜欢专辑
        likeAlbum: state => state.like.likeAlbum,
        // 用户喜欢艺人
        likeArtist: state => state.like.likeArtist,
        // 用户喜欢mv
        likeMV: state => state.like.likeMV,
        // 用户云盘
        likeCloud: state => state.like.likeCloud,
        // 用户听歌记录
        likeRecord: state => (value: number) => {
            // 1为一周，0为全部
            if (value === 1) return state.like.likeRecord.weekData
            if (value === 0) return state.like.likeRecord.allData
        },
        // 每日推荐
        dailySongs: state => state.like.dailySongs,
        //FM
        personalFM: state => state.like.personalFM
    }
})
