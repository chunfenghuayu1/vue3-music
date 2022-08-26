import { defineStore } from 'pinia'
import { useStorageStore } from '@/store/Storage'
import { reqUserPlayList } from '@/api/User.js'
import { reqSongDetail } from '@/api/Song.js'
import { reqPlayListDetail } from '@/api/PlayList.js'

export const useMySongs = defineStore('MySongs', {
    state: () => {
        return {
            // 用户喜欢的音乐
            like: {
                trackIds: [],
                likeSongsWithDetails: []
            },
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
            const { data } = await reqUserPlayList({ uid: storageStore.userId })
            if (data.code === 200) {
                this.userList.more = data.more
                this.userList.playlist = data.playlist
                this.getUserLikeSongs()
            }
        },
        // 获取用户喜欢的音乐
        async getUserLikeSongs() {
            const { data } = await reqPlayListDetail({ id: this.userList.playlist[0].id })
            if (data.code === 200) {
                this.like.trackIds = data.playlist.trackIds
                this.getUserLikeSongsDetail()
            }
        },
        // 获取喜欢歌曲详情
        async getUserLikeSongsDetail() {
            const ids = this.like.trackIds
                .slice(0, 12)
                .map(i => i.id)
                .join(',')
            const { data } = await reqSongDetail({ ids })
            if (data.code === 200) {
                this.like.likeSongsWithDetails = data.songs
            }
        }
    },
    getters: {
        // 喜欢的歌单列表
        playlist: state => state.userList.playlist.slice(1),
        // 喜欢的音乐数量
        trackCount: state => state.like.trackIds.length,
        // 展示的音乐，只有12首
        showLikeSongs: state => state.like.likeSongsWithDetails.slice(0, 12)
    }
})
