<template>
    <div v-if="dataList.albumList.length > 0">
        <!-- 轮播图 -->
        <Swiper :banner-list="bannerList"></Swiper>
        <!-- 推荐歌单 -->
        <HomeRecomAlbum :item-list="albumList"></HomeRecomAlbum>
        <!-- 个性推荐 -->
        <Personalized></Personalized>
        <!-- 热门歌手 -->
        <HomeRecomArtist :item-list="topArtists"></HomeRecomArtist>
        <!-- 最新专辑 -->
        <HomeAlbumNewest :item-list="albumNewestList"></HomeAlbumNewest>
        <!-- 排行榜单 -->
        <HomeRankList :item-list="rankList"></HomeRankList>
    </div>
</template>

<script setup>
import { sampleSize } from 'lodash'
const { proxy } = getCurrentInstance()
const isShow = ref(false)
// 轮播图数据获取
const bannerList = ref([])
// 其他数据
const dataList = reactive({
    albumList: [],
    topArtists: [],
    albumNewestList: [],
    rankList: []
})
const { albumList, topArtists, albumNewestList, rankList } = toRefs(dataList)

// 数据初始化
const getData = () => {
    try {
        // 轮播图数据获取
        proxy.$http.reqBanner().then(res => {
            bannerList.value = res.data.banners
        })
        // 推荐歌单数据获取
        proxy.$http.reqAlbumListList({ limit: 10 }).then(res => {
            dataList.albumList = res.data.result
            // 展示页面
            isShow.value = true
        })
        // 热门歌手数据
        proxy.$http.reqTopArtists({ limit: 20 }).then(res => {
            dataList.topArtists = sampleSize(res.data.artists, 6)
        })
        // 最新专辑数据
        proxy.$http.reqAlbumNewest().then(res => {
            dataList.albumNewestList = res.data.albums
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

<style lang="postcss"></style>
