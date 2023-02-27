<template>
    <div v-if="mounted">
        <h3 class="font-bold text-6xl text-theme-base my-8">发现</h3>
        <!-- 标签栏 -->
        <ExploreTag
            v-model:showMore="showMore"
            :activeTags="localStore.data.activeTags"
            :category="category"
        >
            <template #more>
                <div
                    class="font-bold text-lg py-1.5 px-3.5 rounded-lg cursor-pointer mr-4 my-2 hover:bg-theme-baseActive hover:text-theme-baseActive hover:bg-opacity-20 hover:text-opacity-90 transition-all"
                    :class="
                        showMore
                            ? 'bg-theme-baseActive text-theme-baseActive bg-opacity-20'
                            : 'text-theme-baseSecond bg-opacity-50 bg-theme-baseSecond'
                    "
                    @click="showMore = !showMore"
                >
                    &bull;&bull;&bull;
                </div>
            </template>
        </ExploreTag>
        <TagSelector :show-more="showMore" :active-tags="localStore.data.activeTags"></TagSelector>
        <!-- 渲染歌单列表 -->
        <div
            v-infinite-scroll="load"
            class="mt-12 grid gap-10 grid-cols-6 lg:gap-x-5"
            :infinite-scroll-immediate="false"
            infinite-scroll-distance="1"
            infinite-scroll-delay="1000"
        >
            <div v-for="item in playList" :key="item.id">
                <Cover :listItem="item" listType="歌单" :isPlayCount="true"></Cover>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import ExploreTag from './ExploreTag.vue'
import TagSelector from './TagSelector.vue'
import Cover from '@components/Cover.vue'

import type { ComponentInternalInstance } from 'vue'
import type { HighqualityPlaylist } from '@api/modules/playList'
import type { params } from './index'

import { useLocalStore } from '@stores/localStore'
const localStore = useLocalStore()
const route = useRoute()
const { proxy } = getCurrentInstance() as ComponentInternalInstance

// 计算路由变化，决定类型参数
// 如果点击更多，则进行切换,用两个值进行控制，同时控制下面选择框显示与隐藏
const showMore = ref(false)
// 该值依赖路由
const category = computed<string>(() => (route.query.cat as string) || '全部')

// 基础数据
const initData = reactive({
    limit: 24,
    offset: 0,
    more: true,
    lasttime: 0
})
const { limit, offset, more, lasttime } = toRefs(initData)
// 重置数据
const reset = (): void => {
    playList.value = []
    offset.value = 0
    more.value = true
    lasttime.value = 0
}
// 请求对象歌单数据
const playList = ref<any[]>([])

const getPlayList = ({ limit, cat, offset, before }: params) => {
    if (cat === '排行榜') {
        // 不需要滚动加载
        proxy?.$http.reqRankList().then(res => {
            playList.value = res.list
        })
        return
    }
    if (cat === '精品歌单') {
        proxy?.$http
            .reqHighqualityPlaylist({ limit: 24, cat: '全部', before } as HighqualityPlaylist)
            .then(res => {
                playList.value = [...playList.value, ...res.playlists] as any

                more.value = res.more
                lasttime.value = res.lasttime
            })
        return
    }
    if (cat === '推荐歌单') {
        proxy?.$http.reqAlbumListList({ limit: 100 }).then(res => {
            playList.value = [...playList.value, ...res.result] as any
        })
        return
    }
    // 如果是其他类型则获取歌单
    proxy?.$http.reqPlayList({ limit, cat, offset, order: 'hot' }).then(res => {
        playList.value = [...playList.value, ...res.playlists] as any
        more.value = res.more
    })
}
// 无限加载调用方法
const load = () => {
    if (category.value === '排行榜' || category.value === '推荐歌单') return
    if (more.value) {
        offset.value++
        getPlayList({
            limit: limit.value,
            cat: category.value,
            offset: offset.value * limit.value,
            before: lasttime.value
        })
    }
}
// 缓存组件初次激活
// 无限滚动有bug，不能使用缓存组件
// onActivated(() => {})
// 组件复用时，在动态组件中，不更改路由，但更新参数，需要根据路由参数不同调用方法
onBeforeRouteUpdate(to => {
    reset()
    getPlayList({ limit: limit.value, cat: to.query.cat as string })
})
// 解决无限滚动获取不到dom的问题
const mounted = ref(false)
onMounted(() => {
    reset()
    // 获取标签信息
    mounted.value = true
    getPlayList({
        limit: limit.value,
        cat: category.value,
        offset: offset.value * limit.value
    })
})
</script>

<style scoped></style>
