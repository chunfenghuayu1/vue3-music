<template>
    <div v-cloak>
        <!-- 轮播图 -->
        <Swiper :banner-list="bannerList"></Swiper>
        <!-- 推荐歌单 -->
        <Album
            :item-list="dataList.albumList"
            :type="'recomList'"
            :item-name="$t.home.recomAlbumTitle"
        ></Album>
        <!-- 个性推荐 -->
        <Personalized></Personalized>

        <!-- 热门歌手 -->
        <Album
            :item-list="dataList.topArtists"
            :type="'recomArtist'"
            :item-name="$t.home.recomArtist"
        ></Album>
        <!-- 热门新专 -->
        <Album
            :item-list="dataList.albumNewestList"
            :type="'albumNewest'"
            :item-name="$t.home.albumNewest"
        ></Album>
        <!-- 排行榜单 -->
        <Album
            :item-list="dataList.rankList"
            :type="'rankList'"
            :item-name="$t.home.recomRank"
        ></Album>
    </div>
</template>

<script setup>
import Swiper from './Swiper/Swiper.vue'
import Album from '@/components/Album/Album.vue'
import { getCurrentInstance, onActivated, reactive, ref } from 'vue'
import Personalized from './Personalized/Personalized.vue'
import { sampleSize } from 'lodash'
const { proxy } = getCurrentInstance()

// 轮播图数据获取
const bannerList = ref([])
// 其他数据
const dataList = reactive({
    albumList: [],
    topArtists: [],
    albumNewestList: [],
    rankList: []
})

// 数据初始化
const getData = () => {
    try {
        // console.log(show.value)
        // 轮播图数据获取
        proxy.$http.reqBanner().then(res => {
            bannerList.value = res.data.banners
        })
        // 推荐歌单数据获取
        proxy.$http.reqAlbumListList({ limit: 10 }).then(res => {
            dataList.albumList = res.data.result
        })
        // 热门歌手数据
        proxy.$http.reqTopArtists({ limit: 20 }).then(res => {
            dataList.topArtists = sampleSize(res.data.artists, 6)
        })
        // 热门新碟数据
        proxy.$http.reqAlbumNewest().then(res => {
            dataList.albumNewestList = res.data.albums.splice(0, 5)
        })
        // 排行榜单数据获取
        proxy.$http.reqRankList().then(res => {
            dataList.rankList = res.data.list.splice(0, 5)
        })
    } catch (error) {
        proxy.$notify({
            title: 'Error',
            message: error,
            type: 'error'
        })
    }
}
onActivated(() => {
    getData()
})
</script>

<style lang="postcss">
[v-cloak] {
    display: none !important;
}
</style>
