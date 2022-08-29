import { defineStore } from 'pinia'
import { useStorageStore } from '@/store/Storage'
import { reqUserPlayList, reqLikeSongs } from '@/api/User.js'
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
                likeSongIds: []
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
        // 获取用户已喜欢音乐列表
        async getLikeList() {
            const storageStore = useStorageStore()
            const { data } = await reqLikeSongs({ uid: storageStore.userId })
            if (data.code === 200) {
                this.like.likeSongIds = data.ids
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
        // 喜欢的音乐id
        likeSongIds: state => {
            const ids = state.like.likeSongIds
            return id => ids.includes(id)
        }
    }
})
