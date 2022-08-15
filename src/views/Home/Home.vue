<template>
    <!-- 轮播图 -->
    <Swiper :banner-list="bannerList"></Swiper>
    <!-- 推荐歌曲 -->
    <Album :item-list="albumList" :item-name="'推荐歌单'"></Album>
    <!-- 排行榜单 -->
    <Album :item-list="rankList" :item-name="'排行榜'"></Album>
</template>

<script setup>
import Swiper from './Swiper/Swiper.vue'
import Album from '@/components/Album/Album.vue'
import { getCurrentInstance, ref } from 'vue'
import { ElNotification } from 'element-plus'
const { proxy } = getCurrentInstance()

// 轮播图数据获取
const bannerList = ref([])
const getBannerList = async () => {
    const { data } = await proxy.$http.reqBanner()
    return data
}
// 推荐歌单数据获取
const albumList = ref([])
const getAlbumList = async () => {
    const { data } = await proxy.$http.reqAlbumListList({ limit: 10 })
    return data
}
// 排行榜单数据获取
const rankList = ref([])
const getRankList = async () => {
    const { data } = await proxy.$http.reqRankList()
    return data
}

// 获取首页数据 进行初始化
// 多个异步请求，进行同步获取
// 保证不阻塞其他任务
const getData = async () => {
    await Promise.allSettled([getBannerList(), getAlbumList(), getRankList()])

        .then(res => {
            const [res1, res2, res3] = res
            // console.log(res3)
            if (res1.status === 'fulfilled') {
                bannerList.value = res1.value.banners
            } else {
                return Promise.reject('轮播图获取失败')
            }
            if (res2.status === 'fulfilled') {
                albumList.value = res2.value.result
            } else {
                return Promise.reject('推荐歌单获取失败')
            }
            if (res3.status === 'fulfilled') {
                rankList.value = res3.value.list.splice(0, 5)
            } else {
                return Promise.reject('获取排行榜失败')
            }
        })
        .catch(error => {
            ElNotification({
                title: 'Error',
                message: error,
                type: 'error'
            })
        })
}
getData()
// const getData = () => {
//     try {
//         proxy.$http.reqBanner().then(res => {
//             bannerList.value = res.data.banners
//         })
//         proxy.$http.reqRecomPlayList({ limit: 10 }).then(res => {
//             recomPlayList.value = res.data.result
//         })
//     } catch (error) {
//         ElNotification({
//             title: 'Error',
//             message: error,
//             type: 'error'
//         })
//     }
// }
</script>

<style lang="postcss"></style>
