<template>
    <div v-show="playList.name" class="px-10vw lg:px-10 pb-16">
        <!-- 头部 -->
        <div class="flex space-x-12 mt-8 my-16">
            <div class="flex items-center justify-center flex-shrink-0 relative">
                <img :src="`${playList.coverImgUrl}?param=512y512`" class="rounded-lg h-72 w-72" />
                <!-- 图片阴影层 -->
                <img
                    :src="`${playList.coverImgUrl}?param=512y512`"
                    class="h-72 w-72 absolute top-3 -z-10 bg-cover blur-md opacity-60 rounded-lg"
                />
            </div>
            <div class="flex flex-col justify-center">
                <!-- 歌单标题 -->
                <h3 class="font-bold text-5xl mb-4">
                    {{ playList.name }}
                </h3>
                <!-- 歌单简介 -->
                <div>
                    <div class="line-clamp-1 font-bold mb-2">
                        <span>歌单列表</span>
                        <span> &bull; </span>
                        <a
                            target="_blank"
                            :href="`https://music.163.com/#/user/home?id=${playList.creator.userId}`"
                            class="hover:underline"
                            >{{ playList.creator?.nickname }}</a
                        >
                    </div>
                    <div class="line-clamp-1 text-gray-500 text-sm">
                        <span>最后更新于{{ formatDate(playList.updateTime) }}</span>
                        <span> &bull; </span>
                        <span>{{ playList.trackCount }}首歌</span>
                    </div>
                </div>
                <!-- 歌单描述 -->
                <div
                    class="mt-2 mb-4 line-clamp-3 text-gray-500 text-sm"
                    v-text="playList.description"
                ></div>
                <!-- 操作区 -->
                <div class="mt-4 flex items-center space-x-8">
                    <button
                        class="py-1.5 px-2.5 rounded-lg flex items-center justify-center space-x-1 bg-skin-primary bg-opacity-20 flex-shrink-0"
                    >
                        <SvgIcon name="play" size="24" class="text-skin-primary"></SvgIcon>
                        <span class="font-bold text-skin-primary">播放</span>
                    </button>
                    <button
                        v-if="likeBtn"
                        class="p-2 rounded-lg flex items-center justify-center bg-gray-400 bg-opacity-10 flex-shrink-0"
                    >
                        <SvgIcon
                            v-if="true"
                            name="dislike"
                            size="20"
                            class="text-skin-primary"
                        ></SvgIcon>
                        <SvgIcon v-else name="like" size="20" class="text-skin-primary"></SvgIcon>
                    </button>
                    <button
                        class="p-0.5 rounded-lg flex items-center justify-center bg-gray-400 bg-opacity-10 flex-shrink-0"
                    >
                        <SvgIcon name="more" size="32" class="text-skin-primary"></SvgIcon>
                    </button>
                </div>
            </div>
        </div>
        <!-- 列表 -->
        <div
            v-infinite-scroll="load"
            :infinite-scroll-immediate="false"
            infinite-scroll-distance="100"
            infinite-scroll-delay="600"
        >
            <transition-group tag="div" name="track-item">
                <div v-for="(item, index) in trackAll" :key="index" class="space-y-6">
                    <Track :song="item"></Track>
                </div>
            </transition-group>
        </div>
        <!-- 到底了 -->
        <div class="text-sm text-gray-400 flex items-center justify-center mt-8 select-none">
            <div v-if="more">没有更多数据了......</div>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { ComponentInternalInstance, Ref } from 'vue'
import { useMySong } from '@/stores/MySong'
import { formatDate } from '@/utils/format'
const { proxy } = getCurrentInstance() as ComponentInternalInstance
const route = useRoute()
const MySong = useMySong()

// 获取对应id
interface List {
    name: string
    coverImgUrl: string
    creator: {
        userId: number
        nickname: string
    }
    updateTime: number
    trackCount: number
    description: string
}
const playList: Ref<List> = ref({
    name: '',
    coverImgUrl: '',
    creator: {
        userId: 0,
        nickname: ''
    },
    updateTime: 0,
    trackCount: 0,
    description: ''
})
const trackAll: Ref<any[]> = ref([])
interface PlayListDetail {
    id: number
    limit: number
    offset: number
}
const getPlayListDetail = ({ id, limit, offset }: PlayListDetail) => {
    // 获取歌单详情
    if (offset < 1) {
        proxy?.$http.reqPlayListDetail({ id }).then(data => {
            playList.value = data.playlist
        })
    }
    // 获取歌单歌曲详情
    proxy?.$http.reqPlayLsitTrankAll({ id, limit, offset }).then(data => {
        trackAll.value = [...trackAll.value, ...data.songs]
        // 判断是否全部获取
        more.value = data.songs.length === 0 ? true : false
    })
}

// 无限加载数据
const offset = ref(0)
const limit = ref(25)
const more = ref(false)
getPlayListDetail({
    id: +route.params.id,
    limit: limit.value,
    offset: limit.value * offset.value
})

const load = () => {
    if (more.value) return
    offset.value++
    getPlayListDetail({
        id: +route.params.id,
        limit: limit.value,
        offset: limit.value * offset.value
    })
}

// 判断收藏按钮是否显示
// 如果歌单id在自己的所有歌单里面，则不显示
const likeBtn = computed(() => {
    return !MySong.userList.playlist.some((item: any) => item.id === Number(route.params.id))
})
</script>

<style lang="postcss"></style>
