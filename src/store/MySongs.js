import { defineStore } from 'pinia'
import { useStorageStore } from '@/store/Storage'
import {
    reqUserPlayList,
    reqLikeSongs,
    reqLikeAlbum,
    reqLikeArtist,
    reqLikeMV,
    reqlikeCloud,
    reqUserRecord
} from '@/api/User.js'
// import { reqSongDetail } from '@/api/Song.js'
import { reqPlayListDetail } from '@/api/PlayList.js'

export const useMySongs = defineStore('MySongs', {
    state: () => {
        return {
            // 用户喜欢的音乐
            like: {
                // 我喜欢的音乐列表
                tracks: [],
                // 用户喜欢的音乐全部列表 对比用
                likeSongIds: [],
                // 用户喜欢的专辑
                likeAlbum: [],
                // 用户喜欢的艺人
                likeArtist: [],
                // 用户喜欢的MV
                likeMV: [],
                // 用户云盘
                likeCloud: [],
                // 用户听歌记录
                likeRecord: {
                    weekData: [],
                    allData: []
                }
            },
            // 用户全部歌单
            userList: {
                // 是否还有更多
                more: false,
                // 用户歌单
                playlist: []
            }
        }
    },
    actions: {
        // 初始化我的音乐
        initMySong() {
            const storageStore = useStorageStore()
            // 如果没有登录，则不发送请求
            if (storageStore.data.loginMode === '') return
            // 如果登录了
            // 则获取用户歌单及喜欢的音乐
            this.getUserPlayList()
            this.getLikeList()
        },
        // 在my页面获取数据
        getMyData() {
            this.getUserLikeAlbum()
            this.getUserLikeArtist()
            this.getUserLikeMV()
            this.getUserLikeCloud()
            this.getUserRecord({ type: 1 })
            this.getUserRecord({ type: 0 })
        },
        // 获取用户歌单列表
        async getUserPlayList() {
            const storageStore = useStorageStore()
            const { data } = await reqUserPlayList({ uid: storageStore.userId, limit: 100 })
            if (data.code === 200) {
                this.userList.more = data.more
                this.userList.playlist = data.playlist
                this.getUserLikeSongs()
            }
        },
        // 获取用户喜欢的音乐列表信息（包括音乐信息，但没有详细信息）
        async getUserLikeSongs() {
            const { data } = await reqPlayListDetail({ id: this.userList.playlist[0].id })
            if (data.code === 200) {
                this.like.tracks = data.playlist.tracks
            }
        },
        // 获取用户已喜欢的音乐列表
        async getLikeList() {
            const storageStore = useStorageStore()
            const { data } = await reqLikeSongs({ uid: storageStore.userId })
            if (data.code === 200) {
                this.like.likeSongIds = data.ids
            }
        },
        // 获取用户关注专辑
        async getUserLikeAlbum() {
            const { data } = await reqLikeAlbum({ limit: 30 })
            if (data.code === 200) {
                this.like.likeAlbum = data.data
            }
        },
        // 获取用户关注艺人
        async getUserLikeArtist() {
            const { data } = await reqLikeArtist({ limit: 30 })
            if (data.code === 200) {
                this.like.likeArtist = data.data
            }
        },
        // 获取用户关注mv
        async getUserLikeMV() {
            const { data } = await reqLikeMV({ limit: 30 })
            if (data.code === 200) {
                this.like.likeMV = data.data
            }
        },
        // 获取用户云盘
        // 这里不做按需加载，默认获取1000首
        async getUserLikeCloud() {
            const { data } = await reqlikeCloud({ limit: 1000, offset: 0 })
            if (data.code === 200) {
                this.like.likeCloud = data.data
            }
        },
        // 获取用户听歌排行
        async getUserRecord({ type = 1 }) {
            // 用户id
            const storageStore = useStorageStore()
            const id = storageStore.userId
            const { data } = await reqUserRecord({ uid: id, type: type })
            if (data.code === 200) {
                if (type === 1) {
                    this.like.likeRecord.weekData = data.weekData
                    return
                }
                if (type === 0) {
                    this.like.likeRecord.allData = data.allData
                    return
                }
            }
        }
    },
    getters: {
        // 歌单列表
        playlist: state => {
            // 用户id
            const storageStore = useStorageStore()
            const id = storageStore.userId
            // 缓存数组
            const list = state.userList.playlist.slice(1)
            return value => {
                // 创建的歌单
                if (value === 1) {
                    return list.filter(i => i.userId === id)
                }
                // 所有歌单列表
                if (value === 2) {
                    return list
                }
                // 收藏的歌单列表
                if (value === 3) {
                    return list.filter(i => i.userId !== id)
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
            return id => ids.includes(id)
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
        likeRecord: state => value => {
            // 1为一周，0为全部
            if (value === 1) return state.like.likeRecord.weekData
            if (value === 0) return state.like.likeRecord.allData
        }
    }
})
