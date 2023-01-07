<template>
    <div v-show="topSongs.length > 0">
        <!-- 头部 -->
        <div class="flex space-x-12 mt-8 my-16">
            <div class="flex items-center justify-center flex-shrink-0 relative">
                <img v-lazy="$imgUrl(artist.cover, 512)" class="rounded-full h-72 w-72" />
                <!-- 图片阴影层 -->
                <img
                    v-lazy="$imgUrl(artist.cover, 512)"
                    class="h-72 w-72 absolute top-3 -z-10 bg-cover blur-md opacity-60 rounded-full"
                />
            </div>
            <div class="flex flex-col justify-center">
                <!-- 专辑标题 -->
                <h3 class="text-theme-base font-bold text-5xl pb-4 line-clamp-2">
                    {{ artist.name }}
                </h3>
                <!-- 专辑简介 -->
                <div class="flex justify-start space-x-4">
                    <div class="flex items-center text-sm space-x-1">
                        <SvgIcon name="music" size="20" class="text-theme-base"></SvgIcon>
                        <span class="text-theme-base">{{ artist.musicSize }}首</span>
                    </div>
                    <div class="flex items-center text-sm space-x-1">
                        <SvgIcon name="album" size="20" class="text-theme-base"></SvgIcon>
                        <span class="text-theme-base">{{ artist.albumSize }}张</span>
                    </div>
                    <div class="flex items-center text-sm space-x-1">
                        <SvgIcon name="video" size="20" class="text-theme-base"></SvgIcon>
                        <span class="text-theme-base">{{ artist.mvSize }}部</span>
                    </div>
                </div>
                <!-- 专辑描述 -->
                <div
                    class="my-4 line-clamp-4 text-sm whitespace-pre-wrap select-none text-theme-baseSecond"
                    v-text="artist.briefDesc"
                    :title="artist.briefDesc"
                ></div>
                <!-- 操作区 -->
                <div class="mt-4 flex items-center space-x-8">
                    <button
                        class="bg-theme-baseActive bg-opacity-20 text-theme-baseActive text-opacity-90 py-1.5 px-2.5 rounded-lg flex items-center justify-center space-x-1 flex-shrink-0 active:scale-95 transition"
                    >
                        <SvgIcon name="playfill" size="24" class="fill-current"></SvgIcon>
                        <span class="font-bold">播放</span>
                    </button>
                    <button
                        class="p-2 rounded-lg flex items-center justify-center bg-theme-baseActive bg-opacity-20 flex-shrink-0 active:scale-95 transition"
                    >
                        <SvgIcon
                            v-if="true"
                            name="dislike"
                            size="20"
                            class="fill-current text-theme-baseActive"
                        ></SvgIcon>
                        <SvgIcon
                            v-else
                            name="like"
                            size="20"
                            class="fill-current text-theme-baseActive"
                        ></SvgIcon>
                    </button>
                    <button
                        v-if="false"
                        class="p-0.5 rounded-lg flex items-center justify-center bg-theme-baseSecond flex-shrink-0"
                    >
                        <SvgIcon name="more" size="32"></SvgIcon>
                    </button>
                </div>
            </div>
        </div>
        <!-- 内容 -->
        <div class="space-y-8">
            <!-- 热门歌曲 -->
            <div v-if="topSongs.length > 0">
                <CorusalArtist :list="topSongs"></CorusalArtist>
            </div>
            <!-- 专辑 -->
            <div v-if="albums.length > 0">
                <h3 class="text-theme-base font-bold text-2xl mb-4">专辑</h3>
                <div class="grid grid-cols-5 gap-8 lg:gap-x-5">
                    <div v-for="(item, index) in albums" :key="index">
                        <Cover :listItem="item" listType="专辑"></Cover>
                    </div>
                </div>
            </div>
            <!-- EP和单曲 -->
            <div v-if="EP.length > 0">
                <h3 class="text-theme-base font-bold text-2xl mb-4">EP和单曲</h3>
                <div class="grid grid-cols-5 gap-10 lg:gap-x-5">
                    <div v-for="(item, index) in EP" :key="index">
                        <Cover :listItem="item" :listType="'专辑'">
                            <!-- 最新专辑显示歌手名 -->
                            <template #subTilte>
                                <div class="text-xs text-theme-baseSecond italic">
                                    {{ item.type }}
                                </div>
                            </template>
                        </Cover>
                    </div>
                </div>
            </div>
            <!-- MVs -->
            <div v-if="mvs.length > 0">
                <h3 class="text-theme-base font-bold text-2xl mb-4">MVs</h3>
                <div class="grid grid-cols-5 gap-10 lg:gap-x-5">
                    <div v-for="(item, index) in mvs" :key="index">
                        <MvCover
                            :item="item"
                            :img-url="item.imgurl"
                            :name="item.name"
                            :sub-text="item.publishTime"
                            :show-title="true"
                            :show-artist="false"
                        ></MvCover>
                    </div>
                </div>
            </div>
            <!-- 相似歌手 -->
            <div v-if="simi.length > 0">
                <h3 class="text-theme-base font-bold text-2xl mb-4">相似歌手</h3>
                <div class="grid gap-10 grid-cols-6 lg:gap-x-5">
                    <div v-for="(item, index) in simi" :key="index">
                        <Cover
                            :listItem="item"
                            :listType="'歌手'"
                            :isRounded="true"
                            :isTextCenter="true"
                        >
                        </Cover>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import Cover from '@/components/Cover.vue'
import MvCover from '@/components/MvCover.vue'
import CorusalArtist from './CorusalArtist.vue'

import type { ComponentInternalInstance, Ref } from 'vue'
import type { topSongData, artistData, EPData, mvsData } from './index'

const { proxy } = getCurrentInstance() as ComponentInternalInstance
const route = useRoute()
const router = useRouter()

const artist: Ref<artistData> = ref({
    name: '',
    cover: '',
    albumSize: 0,
    musicSize: 0,
    mvSize: 0,
    briefDesc: ''
})
const topSongs: Ref<topSongData[]> = ref([])
const albums = ref([])
const EP: Ref<EPData[]> = ref([])
const mvs: Ref<mvsData[]> = ref([])
const simi = ref([])

// 获取歌手数据
const getAritstDetail = () => {
    const id = +route.params.id
    // 获取歌手详情
    proxy?.$http.reqArtistDetail({ id }).then(({ data }) => {
        // 获取正确的头像

        data.artist.cover = data.user?.avatarUrl || data.artist?.cover
        artist.value = data.artist
    })
    // 获取热门歌曲
    proxy?.$http.reqAritstTop({ id }).then(data => {
        topSongs.value = data.songs.slice(0, 48)
    })
    // 获取专辑
    proxy?.$http.reqArtistAlbum({ id, limit: 50 }).then(data => {
        // 过滤出专辑

        albums.value = data.hotAlbums.filter((item: any) => item.type === '专辑')
        // 过滤出ep和单曲
        EP.value = data.hotAlbums.filter(
            (item: any) => item.type === 'EP' || item.type === 'Single'
        )
    })
    // 获取mv
    proxy?.$http.reqArtistMV({ id }).then(data => {
        mvs.value = data.mvs
    })
    //  获取相似歌手
    proxy?.$http.reqArtistSimi({ id }).then(data => {
        simi.value = data.artists.slice(0, 12)
    })
}
getAritstDetail()

watch(route, (toParams, prev) => {
    // 对路由变化做出响应...
    prev.name === toParams.name && router.go(0)
})
</script>

<style lang="postcss"></style>
