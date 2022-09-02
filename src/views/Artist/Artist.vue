<template>
    <div v-show="artist.name">
        <!-- 头部 -->
        <div class="flex space-x-12 mt-8 my-16">
            <div class="flex items-center justify-center flex-shrink-0 relative">
                <img :src="`${artist.cover}?param=512y512`" class="rounded-full h-72 w-72" />
                <!-- 图片阴影层 -->
                <img
                    :src="`${artist.cover}?param=512y512`"
                    class="h-72 w-72 absolute top-3 -z-10 bg-cover blur-md opacity-60 rounded-full"
                />
            </div>
            <div class="flex flex-col justify-center">
                <!-- 专辑标题 -->
                <h3 class="font-bold text-5xl mb-4 lineClamp2">
                    {{ artist.name }}
                </h3>
                <!-- 专辑简介 -->
                <div class="flex justify-start space-x-4">
                    <div class="flex items-center text-skin-tertiary text-sm space-x-1">
                        <SvgIcon name="music" size="18" class="text-gray-400"></SvgIcon>
                        <span>{{ artist.musicSize }}首</span>
                    </div>
                    <div class="flex items-center text-skin-tertiary text-sm space-x-1">
                        <SvgIcon name="album" size="18" class="text-gray-400"></SvgIcon>
                        <span>{{ artist.albumSize }}张</span>
                    </div>
                    <div class="flex items-center text-skin-tertiary text-sm space-x-1">
                        <SvgIcon name="mv" size="18" class="text-gray-400"></SvgIcon>
                        <span>{{ artist.mvSize }}部</span>
                    </div>
                </div>
                <!-- 专辑描述 -->
                <div
                    class="my-4 lineClamp3 text-skin-tertiary text-sm cursor-pointer whitespace-pre-wrap"
                    @click="showModal"
                    v-text="artist.briefDesc"
                ></div>
                <!-- 操作区 -->
                <div class="mt-4 flex items-center space-x-8">
                    <button
                        class="py-1.5 px-2.5 rounded-lg flex items-center justify-center space-x-1 bg-skin-primary bg-opacity-20 flex-shrink-0"
                    >
                        <SvgIcon name="play" size="24" class="text-skin-primary"></SvgIcon>
                        <span class="font-bold text-skin-primary">播放</span>
                    </button>
                    <button
                        class="p-2 rounded-lg flex items-center justify-center bg-gray-400 bg-opacity-10 flex-shrink-0"
                    >
                        <SvgIcon
                            v-if="true"
                            name="dislike"
                            size="20"
                            class="text-skin-primary"
                        ></SvgIcon>
                        <SvgIcon v-else name="like" size="20" class="text-skin-primary"></SvgIcon>
                    </button>
                    <button
                        class="p-0.5 rounded-lg flex items-center justify-center bg-gray-400 bg-opacity-10 flex-shrink-0"
                    >
                        <SvgIcon name="more" size="32" class="text-skin-primary"></SvgIcon>
                    </button>
                </div>
            </div>
        </div>
        <!-- 内容 -->
        <div class="space-y-8">
            <!-- 最新发布 -->
            <div v-if="newest?.album">
                <h3 class="font-bold text-2xl mb-4">最新发布</h3>
                <div class="flex h-40">
                    <!-- 最新专辑 -->
                    <div class="flex flex-1 items-center space-x-4">
                        <div class="w-40 flex-shrink-0">
                            <Cover
                                :row-list-item="newest.album"
                                row-type="newAlbum"
                                :show-title="false"
                            ></Cover>
                        </div>
                        <div>
                            <div class="font-bold text-lg mb-2">{{ newest.album.name }}</div>
                            <div class="text-sm text-gray-400">
                                {{ formatDate(newest.album.publishTime) }}
                            </div>
                            <div class="flex items-center text-sm text-gray-400 space-x-2">
                                <div>{{ newest.album.type }}</div>
                                <span>&bull;</span>
                                <div class="flex items-center space-x-1">
                                    <SvgIcon name="music" size="16"></SvgIcon>
                                    <div>{{ newest.album.size }}首</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- 最新mv -->
                    <div v-if="newest.mv" class="flex-1 flex space-x-4">
                        <div class="flex-shrink-0">
                            <MvCover
                                :item="newest.mv"
                                :img-url="newest.mv.imgurl"
                                :show-title="false"
                            ></MvCover>
                        </div>
                        <div class="flex flex-col justify-center">
                            <div class="font-bold text-lg mb-2">{{ newest.mv.name }}</div>
                            <div class="flex items-center text-sm text-gray-400 space-x-2">
                                {{ formatDateStr(newest.mv.publishTime) }}
                            </div>
                            <div class="flex items-center text-sm text-gray-400 space-x-2">
                                最新mv
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- 热门歌曲 -->
            <div v-if="topSongs.length > 0">
                <h3 class="font-bold text-2xl mb-4">热门歌曲</h3>
                <div class="w-full flex flex-wrap items-center">
                    <div v-for="(item, index) in topSongs" :key="index" class="w-1/4 h-1/3 py-1">
                        <TrackCover
                            :item="item"
                            :pic-url="item.al.picUrl"
                            :name="item.name"
                            :alia="item.alia"
                            :ar="item.ar"
                        ></TrackCover>
                    </div>
                </div>
            </div>
            <!-- 专辑 -->
            <div v-if="albums.length > 0">
                <h3 class="font-bold text-2xl mb-4">专辑</h3>
                <div class="grid grid-cols-5 gap-8 lg:gap-x-5">
                    <div v-for="(item, index) in albums" :key="index">
                        <Cover :row-list-item="item" :row-type="'newAlbum'"></Cover>
                    </div>
                </div>
            </div>
            <!-- EP和单曲 -->
            <div v-if="EP.length > 0">
                <h3 class="font-bold text-2xl mb-4">EP和单曲</h3>
                <div class="grid grid-cols-5 gap-10 lg:gap-x-5">
                    <div v-for="(item, index) in EP" :key="index">
                        <Cover :row-list-item="item" :row-type="'newAlbum'">
                            <!-- 最新专辑显示歌手名 -->
                            <template #subTilte="{ rowListItem }">
                                <div class="text-xs text-gray-400 italic">
                                    {{ rowListItem.type }}
                                </div>
                            </template>
                        </Cover>
                    </div>
                </div>
            </div>
            <!-- MVs -->
            <div v-if="mvs.length > 0">
                <h3 class="font-bold text-2xl mb-4">MVs</h3>
                <div class="grid grid-cols-5 gap-10 lg:gap-x-5">
                    <div v-for="(item, index) in mvs" :key="index">
                        <MvCover
                            :item="item"
                            :img-url="item.imgurl"
                            :name="item.name"
                            :sub-text="item.publishTime"
                            :show-title="true"
                        ></MvCover>
                    </div>
                </div>
            </div>
            <!-- 相似歌手 -->
            <div v-if="simi.length > 0">
                <h3 class="font-bold text-2xl mb-4">相似歌手</h3>
                <div class="grid gap-10 grid-cols-6 lg:gap-x-5">
                    <div v-for="(item, index) in simi" :key="index">
                        <Cover :row-list-item="item" row-type="recomArtist"> </Cover>
                    </div>
                </div>
            </div>
        </div>
        <Teleport to="#main">
            <Modal v-model="show" type="专辑介绍">
                <template #content>
                    <div class="overflow-auto text-sm whitespace-pre-wrap">
                        {{ artist.briefDesc }}
                    </div>
                </template>
            </Modal>
        </Teleport>
    </div>
</template>

<script setup>
// import { onBeforeRouteUpdate } from 'vue-router'
import { formatDate, formatDateStr } from '@/utils/format.js'
const { proxy } = getCurrentInstance()
const route = useRoute()
const router = useRouter()
// 弹出框逻辑
const show = ref(false)
const showModal = () => {
    show.value = true
}

const artist = ref({})
const topSongs = ref([])
const albums = ref([])
const EP = ref([])
const mvs = ref([])
const simi = ref([])
const newest = computed(() => {
    return { album: albums.value[0], mv: mvs.value[0] }
})
// 获取歌手数据
const getAritstDetail = () => {
    const id = route.params.id
    // 获取歌手详情
    proxy.$http.reqArtistDetail({ id }).then(({ data }) => {
        artist.value = data.data.artist
    })
    // 获取热门歌曲
    proxy.$http.reqAritstTop({ id }).then(({ data }) => {
        topSongs.value = data.songs.slice(0, 12)
    })
    // 获取专辑
    proxy.$http.reqArtistAlbum({ id, limit: 50 }).then(({ data }) => {
        // 过滤出专辑
        albums.value = data.hotAlbums.filter(item => item.type === '专辑')
        // 过滤出ep和单曲
        EP.value = data.hotAlbums.filter(item => item.type === 'EP' || item.type === 'Single')
    })
    // 获取mv
    proxy.$http.reqArtistMV({ id }).then(({ data }) => {
        mvs.value = data.mvs
    })
    //  获取相似歌手
    proxy.$http.reqArtistSimi({ id }).then(({ data }) => {
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
