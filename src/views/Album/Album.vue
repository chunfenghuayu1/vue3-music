<template>
    <div v-show="album.name">
        <!-- 头部 -->
        <div class="flex space-x-12 mt-8 my-16">
            <div class="flex items-center justify-center flex-shrink-0 relative">
                <img :src="`${album.picUrl}?param=512y512`" class="rounded-lg h-72 w-72" />
                <!-- 图片阴影层 -->
                <img
                    :src="`${album.picUrl}?param=512y512`"
                    class="h-72 w-72 absolute top-3 -z-10 bg-cover blur-md opacity-60 rounded-lg"
                />
            </div>
            <div class="flex flex-col justify-center">
                <!-- 专辑标题 -->
                <h3 class="font-bold text-5xl mb-4 lineClamp2">
                    {{ album.name }}
                </h3>
                <!-- 专辑简介 -->
                <div class="">
                    <div class="line-clamp-1 font-bold mb-4">
                        <span>专辑列表</span>
                        <span> &bull; </span>
                        <router-link
                            v-if="album.artists.length > 0"
                            :to="{ name: 'artist', params: { id: album.artist.id } }"
                            class="hover:underline"
                            >{{ album.artist.name }}</router-link
                        >
                    </div>
                    <div class="line-clamp-1 text-sm">
                        <span>发布于{{ formatDate(album.publishTime) }}</span>
                        <span> &bull; </span>
                        <span>{{ album.size }}首歌</span>
                    </div>
                </div>
                <!-- 专辑描述 -->
                <div
                    class="my-4 line-clamp-3 text-sm whitespace-pre-wrap"
                    :title="album.description"
                    v-text="album.description"
                ></div>
                <!-- 操作区 -->
                <div class="mt-4 flex items-center space-x-8">
                    <button
                        class="py-1.5 px-2.5 rounded-lg flex items-center justify-center space-x-1 bg-skin-primary bg-opacity-20 flex-shrink-0"
                    >
                        <SvgIcon name="play" size="24" class=""></SvgIcon>
                        <span class="font-bold">播放</span>
                    </button>
                    <button
                        class="p-2 rounded-lg flex items-center justify-center bg-gray-400 bg-opacity-10 flex-shrink-0"
                    >
                        <SvgIcon v-if="true" name="dislike" size="20" class=""></SvgIcon>
                        <SvgIcon v-else name="like" size="20" class=""></SvgIcon>
                    </button>
                    <button
                        class="p-0.5 rounded-lg flex items-center justify-center bg-gray-400 bg-opacity-10 flex-shrink-0"
                    >
                        <SvgIcon name="more" size="32" class=""></SvgIcon>
                    </button>
                </div>
            </div>
        </div>
        <!-- 列表 -->
        <div v-for="(item, index) in CDList.list" :key="index" class="space-y-2">
            <div v-if="CDList.isTitle" class="flex items-center my-4">
                <h3 class="font-bold text-2xl">Disc{{ item.cd }}</h3>
            </div>
            <div v-for="(song, index1) in item.list" :key="index1">
                <AlbumTrack :song="song"></AlbumTrack>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { ComponentInternalInstance, Ref } from 'vue'
import type { albumData } from './index'
import { formatDate } from '@/utils/format.js'
import { uniqBy } from 'lodash'
const { proxy } = getCurrentInstance() as ComponentInternalInstance
const route = useRoute()

// 获取对应id
const album: Ref<albumData> = ref({
    picUrl: '',
    name: '',
    artists: [],
    artist: {
        id: 0,
        name: ''
    },
    publishTime: 0,
    size: 0,
    description: ''
})
const track = ref([])
const getPlayListDetail = (id: number) => {
    proxy?.$http.reqAlbumDetail({ id }).then(data => {
        album.value = data.album
        track.value = data.songs
    })
}
// 需要计算是否有多张cd
const CDList = computed(() => {
    const CDs = uniqBy(track.value, 'cd')
    const isTitle = CDs.length > 1 ? true : false
    const list = CDs.map(item => {
        return { list: track.value.filter(i => i.cd === item.cd), cd: item.cd }
    })
    return { list, isTitle }
})

getPlayListDetail(+route.params.id)
</script>

<style lang="postcss"></style>
