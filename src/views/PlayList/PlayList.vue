<template>
    <div v-show="playlist.name">
        <!-- 头部 -->
        <div class="flex space-x-12 mt-8 my-16">
            <div class="flex items-center justify-center flex-shrink-0">
                <img :src="`${playlist.coverImgUrl}?param=512y512`" class="rounded-lg h-72 w-72" />
            </div>
            <div class="flex flex-col justify-center">
                <!-- 歌单标题 -->
                <h3 class="font-bold text-4xl mb-4 lineClamp2">
                    {{ playlist.name }}
                </h3>
                <!-- 歌单简介 -->
                <div class="">
                    <div class="lineClamp1 font-bold">
                        <span>歌单列表</span>
                        <span> &bull; </span>
                        <a
                            target="_blank"
                            :href="`https://music.163.com/#/user/home?id=${playlist.creator?.userId}`"
                            class="hover:underline"
                            >{{ playlist.creator?.nickname }}</a
                        >
                    </div>
                    <div class="lineClamp1 text-skin-tertiary text-sm">
                        <span>最后更新于{{ formatDate(playlist.updateTime) }}</span>
                        <span> &bull; </span>
                        <span>{{ playlist.trackCount }}首歌</span>
                    </div>
                </div>
                <!-- 歌单描述 -->
                <div
                    class="my-4 lineClamp3 text-skin-tertiary text-sm cursor-pointer"
                    @click="showModal"
                >
                    {{ playlist.description }}
                </div>
                <!-- 操作区 -->
                <div class="mt-4 flex items-center space-x-8">
                    <button
                        class="py-1 px-4 rounded-lg flex items-center justify-center bg-skin-primary bg-opacity-20 flex-shrink-0"
                    >
                        <span class="font-bold text-lg text-skin-primary">播放</span>
                    </button>
                    <button
                        class="py-1 px-4 rounded-lg flex items-center justify-center bg-gray-400 bg-opacity-20 font-bold text-lg flex-shrink-0"
                    >
                        收藏
                    </button>
                    <button
                        class="py-1 px-2 rounded-lg flex items-center justify-center bg-gray-400 bg-opacity-20 flex-shrink-0"
                    >
                        &bull;&bull;&bull;
                    </button>
                </div>
            </div>
        </div>
        <!-- 列表 -->
        <div v-for="(item, index) in trackAll" :key="index" class="space-y-6">
            <ListItem :song="item"></ListItem>
        </div>
        <Teleport to="#main">
            <Modal v-model="show" type="歌单介绍" :content="playlist.description"></Modal>
        </Teleport>
    </div>
</template>

<script setup>
import { formatDate } from '@/utils/format.js'
const { proxy } = getCurrentInstance()
const route = useRoute()
// 弹出框逻辑
const show = ref(false)
const showModal = () => {
    show.value = true
}
// 获取对应id
const playlist = ref({})
const trackAll = ref([])
const getPlayListDetail = () => {
    // 获取歌单详情
    proxy.$http.reqPlayListDetail({ id: route.params.id }).then(({ data }) => {
        playlist.value = data.playlist
    })
    // 获取歌单歌曲详情
    proxy.$http
        .reqPlayLsitTrankAll({ id: route.params.id, limit: 100, offset: 0 })
        .then(({ data }) => {
            trackAll.value = data.songs
        })
}
getPlayListDetail()
</script>

<style lang="postcss"></style>
