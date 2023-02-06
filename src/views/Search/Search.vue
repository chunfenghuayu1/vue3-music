<template>
    <div v-show="isShow && searchList.songs.length > 0" class="space-y-8">
        <!-- 标题 -->
        <div class="mt-8 flex space-x-8 items-center text-theme-base font-bold text-5xl">
            <h3>搜索</h3>
            <p>{{ `"${$route.query.kw}"` }}</p>
        </div>
        <!-- 艺人和专辑 -->
        <div class="flex justify-between space-x-40">
            <div class="flex-1 flex flex-col space-y-5" v-if="searchList.artists.length > 0">
                <h3 class="text-theme-base text-3xl font-bold">艺人</h3>
                <div class="grid gap-10 lg:gap-x-5 grid-cols-3">
                    <template v-for="(item, index) in searchList.artists" :key="index">
                        <Cover
                            :listItem="item"
                            :isTextCenter="true"
                            :isRounded="true"
                            listType="歌手"
                        ></Cover>
                    </template>
                </div>
            </div>
            <div class="flex-1 flex flex-col space-y-5" v-if="searchList.albums.length > 0">
                <h3 class="text-theme-base text-3xl font-bold">专辑</h3>
                <div class="grid gap-10 lg:gap-x-5 grid-cols-3">
                    <template v-for="(item, index) in searchList.albums" :key="index">
                        <Cover :listItem="item" listType="专辑"></Cover>
                    </template>
                </div>
            </div>
        </div>
        <!-- 歌曲 -->
        <div v-if="searchList.songs.length > 0">
            <CorusalArtist :list="searchList.songs" class="-mt-8"></CorusalArtist>
        </div>
        <!-- 视频 -->
        <div class="space-y-5" v-if="searchList.mvs.length > 0">
            <h3 class="text-theme-base text-3xl font-bold">视频</h3>
            <div class="grid grid-cols-5 gap-10 lg:gap-x-5">
                <div v-for="(item, index) in searchList.mvs" :key="index">
                    <MvCover
                        :item="item"
                        :img-url="item.cover"
                        :name="item.name"
                        :sub-text="item.publishTime"
                        :show-title="true"
                        :show-artist="false"
                    ></MvCover>
                </div>
            </div>
        </div>
        <!-- 歌单 -->
        <div class="space-y-5" v-if="searchList.playlists.length > 0">
            <h3 class="text-theme-base text-3xl font-bold">歌单</h3>
            <div class="grid grid-cols-5 gap-10 lg:gap-x-5">
                <div v-for="(item, index) in searchList.playlists" :key="index">
                    <Cover :listItem="item" listType="歌单"></Cover>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { ComponentInternalInstance } from 'vue'
import CorusalArtist from '@views/Artist/CorusalArtist.vue'
import MvCover from '@components/MvCover.vue'
import Cover from '@components/Cover.vue'

const { proxy } = getCurrentInstance() as ComponentInternalInstance
const route = useRoute()

const type = ref([
    {
        type: 100,
        limit: 3,
        kw: 'artists'
    },
    {
        type: 10,
        limit: 3,
        kw: 'albums'
    },
    {
        type: 1,
        limit: 48,
        kw: 'songs'
    },
    {
        type: 1004,
        limit: 10,
        kw: 'mvs'
    },
    {
        type: 1000,
        limit: 12,
        kw: 'playlists'
    }
])
const isShow = ref(false)

// 此处比较随意，接口太多
interface DsearchList {
    [k: string]: any
    mvs: { artistName: string; name: string; artists: any[]; cover: string; [k: string]: any }[]
}
const searchList: DsearchList = reactive({
    artists: [],
    albums: [],
    songs: [],
    mvs: [],
    playlists: []
})
// 定义请求数组
const searchData = computed(() => {
    return type.value.map(item => {
        return proxy?.$http.reqSearch({
            keywords: route.query.kw,
            type: item.type as any,
            limit: item.limit
        })
    })
})

// 请求函数
const getSearchData = () => {
    if (!route.query.kw) return
    Promise.all(searchData.value)
        .then(res => {
            type.value.forEach((item, index) => {
                if (!res[index].result[item.kw]) return
                if (item.kw === 'songs') {
                    // 需要拿到歌曲id，依次请求详细数据
                    getSongsDetail(res[index].result[item.kw], item.kw)
                    return
                }
                searchList[item.kw] = res[index].result[item.kw]
            })
        })
        .catch(error => {
            proxy?.$message({
                message: error.response.message,
                type: 'error'
            })
        })
        .finally(() => {
            isShow.value = true
        })
}
// 歌曲请求逻辑
const getSongsDetail = (res: { [k: string]: any }[], key: string) => {
    const ids = res.map(item => item.id).join(',')
    proxy?.$http.reqSongDetail({ ids }).then(data => {
        searchList[key] = data.songs
    })
}

// 再次请求前重置数据
const resetSearchList = reactive({ ...searchList })
watch(
    () => route.query.kw,
    () => {
        isShow.value = false
        // 重置数据
        Object.assign(searchList, resetSearchList)
        getSearchData()
    },
    {
        immediate: true
    }
)
</script>

<style lang="postcss"></style>
