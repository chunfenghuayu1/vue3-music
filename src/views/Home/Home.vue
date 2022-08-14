<template>
    <Swiper :banner-list="bannerList"></Swiper>
    <div></div>
</template>

<script setup>
import Swiper from './Swiper/Swiper.vue'
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
const recomPlayList = ref([])
const getRecomPlayList = async () => {
    const { data } = await proxy.$http.reqRecomPlayList({ limit: 10 })
    return data
}

// 获取首页数据 进行初始化
// 多个异步请求，进行同步获取
const getData = async () => {
    await Promise.allSettled([getBannerList(), getRecomPlayList()])

        .then(res => {
            const [res1, res2] = res
            if (res1.status === 'fulfilled') {
                bannerList.value = res1.value.banners
            } else {
                return Promise.reject('轮播图获取失败')
            }
            if (res2.status === 'fulfilled') {
                recomPlayList.value = res2.value.result
            } else {
                return Promise.reject('推荐歌单获取失败')
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
getData()
</script>

<style lang="postcss"></style>
