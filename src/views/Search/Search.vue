<template>
    <div v-show="isShow" class="space-y-8">
        <!-- 标题 -->
        <div class="my-8 flex space-x-8 items-center font-bold text-5xl">
            <h3>{{ $t.nav.search }}</h3>
            <p>{{ `"${$route.query.kw}"` }}</p>
        </div>
        <!-- 艺人和专辑 -->
        <div class="flex justify-between space-x-40">
            <SearchItem v-if="searchList.artists.length > 0" class="flex-1" title="艺人">
                <template #content>
                    <div class="grid grid-cols-3 gap-x-10 lg:gap-x-5">
                        <div v-for="(item, index) in searchList.artists" :key="index">
                            <Cover :row-list-item="item" row-type="recomArtist"> </Cover>
                        </div>
                    </div>
                </template>
            </SearchItem>
            <SearchItem v-if="searchList.albums.length > 0" class="flex-1" title="专辑">
                <template #content>
                    <div class="grid grid-cols-3 gap-x-10 lg:gap-x-5">
                        <div v-for="(item, index) in searchList.albums" :key="index">
                            <Cover :row-list-item="item" row-type="newAlbum"></Cover>
                        </div>
                    </div>
                </template>
            </SearchItem>
        </div>
        <!-- 歌曲 -->
        <div v-if="searchList.songs.length > 0">
            <SearchItem title="歌曲">
                <template #content>
                    <div class="h-56 lg:w-full flex flex-wrap items-center">
                        <div
                            v-for="(item, index) in searchList.songs"
                            :key="index"
                            class="w-1/4 h-1/4"
                        >
                            <TrackCover
                                :item="item"
                                :pic-url="item.al.picUrl"
                                :name="item.name"
                                :alia="item.alia"
                                :ar="item.ar"
                            ></TrackCover>
                        </div>
                    </div>
                </template>
            </SearchItem>
        </div>
        <!-- 视频 -->
        <div v-if="searchList.mvs.length > 0">
            <SearchItem title="视频">
                <template #content>
                    <div class="grid grid-cols-5 gap-10 lg:gap-x-5">
                        <div v-for="(item, index) in searchList.mvs" :key="index">
                            <MvCover
                                :item="item"
                                :show-title="true"
                                :name="item.name"
                                :sub-text="item.artists[0].userName"
                                :img-url="item.cover"
                            ></MvCover>
                        </div>
                    </div>
                </template>
            </SearchItem>
        </div>
        <!-- 歌单 -->
        <div v-if="searchList.playlists.length > 0">
            <SearchItem title="歌单">
                <template #content>
                    <div class="grid grid-cols-6 gap-10 lg:gap-x-5">
                        <div v-for="(item, index) in searchList.playlists" :key="index">
                            <Cover :row-list-item="item">
                                <!-- 推荐歌单、排行榜显示播放数量 -->
                                <template #playCount="{ playCount }">
                                    <div
                                        class="flex justify-center items-center absolute left-0 bottom-2 pl-1.5 py-0.5"
                                    >
                                        <SvgIcon
                                            name="play"
                                            size="18"
                                            class="opacity-90 text-white"
                                        ></SvgIcon>
                                        <span
                                            class="italic text-white text-sm lg:text-xs flex-shrink-0 font-semibold text-opacity-90"
                                            >{{ playCount }}</span
                                        >
                                    </div>
                                </template>
                            </Cover>
                        </div>
                    </div>
                </template>
            </SearchItem>
        </div>
    </div>
</template>

<script setup>
const { proxy } = getCurrentInstance()
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
        limit: 16,
        kw: 'songs'
    },
    {
        type: 1004,
        limit: 5,
        kw: 'mvs'
    },
    {
        type: 1000,
        limit: 12,
        kw: 'playlists'
    }
])
const isShow = ref(false)
const searchList = reactive({
    artists: [],
    albums: [],
    songs: [],
    mvs: [],
    playlists: []
})
// 定义请求数组
const searchData = computed(() => {
    return type.value.map(item => {
        return proxy.$http.reqSearch({
            keywords: route.query.kw,
            type: item.type,
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
                if (!res[index].data.result[item.kw]) return
                if (item.kw === 'songs') {
                    // 需要拿到歌曲id，依次请求详细数据
                    getSongsDetail(res[index].data.result[item.kw], item.kw)
                    return
                }
                searchList[item.kw] = res[index].data.result[item.kw]
            })
        })
        .catch(error => {
            proxy.$notify({
                title: 'Error',
                message: error.response.data.message,
                type: 'error'
            })
        })
        .finally(() => {
            isShow.value = true
        })
}
// 歌曲请求逻辑
const getSongsDetail = (res, key) => {
    const ids = res.map(item => item.id).join(',')
    proxy.$http.reqSongDetail({ ids }).then(({ data }) => {
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
    }
)
getSearchData()
</script>

<style lang="postcss"></style>
