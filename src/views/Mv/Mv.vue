<template>
    <div class="w-full mt-2">
        <!-- 播放器 -->
        <div class="space-y-2">
            <div class="rounded-2xl bg-transparent overflow-hidden max-h-full">
                <video ref="VideoPlayer" style="--plyr-color-main: #63bbd0"></video>
            </div>
            <div class="flex items-center space-x-8">
                <div class="font-bold text-2xl">{{ mv.artistName }} - {{ mv.name }}</div>
            </div>
            <div class="flex items-center space-x-4 font-semibold text-gray-500">
                <div class="text-sm">{{ mv.publishTime }}</div>
                <div class="flex items-center text-sm">
                    <SvgIcon name="play" size="18"></SvgIcon>{{ formatPlayCount(mv.playCount) }}
                </div>
            </div>
        </div>
        <!-- 更多mv -->
        <div class="mt-12">
            <div class="font-semibold text-lg">更多视频</div>
            <div class="grid grid-cols-5 gap-10 lg:gap-x-5 mt-4">
                <div v-for="(item, index) in simiMv" :key="index">
                    <MvCover
                        :item="item"
                        :show-title="true"
                        :name="item.name"
                        :img-url="$imgUrl(item.cover, 512)"
                        :sub-text="item.artistName"
                        :show-artist="true"
                        :artistId="item.artistId"
                    ></MvCover>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import MvCover from '@/components/MvCover.vue'

import type { ComponentInternalInstance, Ref } from 'vue'
import type { mvData, simiMvItem } from './index'

import { formatPlayCount } from '@/utils/format'
import Plyr from 'plyr'
import 'plyr/dist/plyr.css'
import { onBeforeRouteUpdate } from 'vue-router'
const route = useRoute()
const { proxy } = getCurrentInstance() as ComponentInternalInstance

// 视频对象
const VPlayer = ref<Plyr>()

// 播放器refs
const VideoPlayer = ref<HTMLElement>()
const initVideo = () => {
    // 视频播放配置项
    let options = {
        settings: ['quality', 'speed'],
        autoplay: false,
        loadSprite: true,
        volume: 0.5,
        quality: {
            default: 1080,
            options: [1080, 720, 480, 240]
        },
        speed: { selected: 1, options: [0.5, 0.75, 1, 1.25, 1.5, 1.75, 2, 4] }
    }
    VPlayer.value = new Plyr(VideoPlayer.value as HTMLElement, options)
}

// 获取视频数据
const mv: Ref<mvData> = ref({
    name: '',
    cover: '',
    artistName: '',
    publishTime: '',
    playCount: 0
})
const simiMv: Ref<simiMvItem[]> = ref([])
const getMVDetail = (mvid: number) => {
    proxy?.$http.reqMVDetail({ mvid }).then(({ data }) => {
        mv.value = data
        let requests = data.brs.map((item: any) => proxy.$http.reqMVUrl({ id: mvid, r: item.br }))
        Promise.all(requests).then(res => {
            let sources = res.map(item => {
                return {
                    src: item.data.url.replace(/^http:\/\//, 'https://'),
                    type: 'video/mp4',
                    size: item.data.r
                }
            })
            VPlayer.value!.source = {
                type: 'video',
                title: mv.value.name,
                sources: sources,
                poster: mv.value.cover.replace(/^http:\/\//, 'https://')
            }
        })
    })
    // 获取相似mv
    proxy?.$http.reqMVSimi({ mvid }).then(data => {
        simiMv.value = data.mvs
    })
}

onMounted(() => {
    initVideo()
    getMVDetail(+route.params.vid)
})
onBeforeRouteUpdate(to => {
    to.name === route.name && getMVDetail(+to.params.vid)
})
</script>

<style lang="postcss"></style>
