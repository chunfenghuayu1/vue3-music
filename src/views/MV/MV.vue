<template>
    <div class="w-full mt-4">
        <!-- 播放器 -->
        <div class="space-y-2">
            <div class="rounded-2xl bg-transparent overflow-hidden max-h-full">
                <video ref="VideoPlayer"></video>
            </div>
            <div class="flex items-center space-x-8">
                <div class="font-bold text-2xl">{{ mv.artistName }} - {{ mv.name }}</div>
            </div>
            <div class="flex items-center space-x-8">
                <div class="text-xs text-skin-tertiary">{{ mv.publishTime }}</div>
                <div class="flex items-center text-xs text-skin-tertiary italic">
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
                        :img-url="item.cover.replace(/^http:/, 'https:')"
                        :sub-text="item.artistName"
                    ></MvCover>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { formatPlayCount } from '@/utils/format.js'
import Plyr from 'plyr'
import { onBeforeRouteUpdate } from 'vue-router'
const route = useRoute()
// const router = useRouter()
const { proxy } = getCurrentInstance()

// 视频对象
const VPlayer = ref(null)

// 播放器refs
const VideoPlayer = ref(null)
const initVideo = () => {
    // 视频播放配置项
    let options = {
        settings: ['quality'],
        autoplay: false,
        quality: {
            default: 1080,
            options: [1080, 720, 480, 240]
        }
    }
    VPlayer.value = new Plyr(VideoPlayer.value, options)
}

// 获取视频数据
const mv = ref({})
const simiMv = ref([])
const getMVDetail = mvid => {
    proxy.$http.reqMVDetail({ mvid }).then(({ data }) => {
        mv.value = data.data
        let requests = data.data.brs.map(item => proxy.$http.reqMVUrl({ id: mvid, r: item.br }))
        Promise.all(requests).then(res => {
            let sources = res.map(item => {
                return {
                    src: item.data.data.url.replace(/^http:/, 'https:'),
                    type: 'video/mp4',
                    size: item.data.data.r
                }
            })
            VPlayer.value.source = {
                type: 'video',
                title: mv.value.name,
                sources: sources,
                poster: mv.value.cover.replace(/^http:/, 'https:')
            }
        })
    })
    // 获取相似mv
    proxy.$http.reqMVSimi({ mvid }).then(({ data }) => {
        simiMv.value = data.mvs
    })
}

onMounted(() => {
    initVideo()
    getMVDetail(route.params.vid)
})
onBeforeRouteUpdate(to => {
    to.name === route.name && getMVDetail(to.params.vid)
})
</script>

<style lang="postcss"></style>
