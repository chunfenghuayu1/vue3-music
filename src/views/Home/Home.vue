<template>
    <Swiper :banner-list="bannerList"></Swiper>
    <div></div>
</template>

<script setup>
import Swiper from './Swiper/Swiper.vue'
import { getCurrentInstance, ref } from 'vue'
const { proxy } = getCurrentInstance()

// 轮播图数据获取
const bannerList = ref([])
const getBannerList = async () => {
    const { data } = await proxy.$http.reqBanner()
    return data
}
// 获取首页数据 进行初始化
// 多个异步请求，进行同步获取
const getData = async () => {
    const res = await Promise.all([getBannerList()])
    bannerList.value = res[0].banners
}
getData()
</script>

<style lang="postcss"></style>
