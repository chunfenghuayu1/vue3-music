<template>
    <div v-if="mounted">
        <h3 class="font-bold text-6xl my-8">{{ $t.explore.title }}</h3>
        <!-- 标签栏 -->
        <ExploreTag
            v-model:showMore="showMore"
            :active-tags="storageStore.settings.activeTags"
            :category="category"
        >
            <template #more>
                <div
                    class="selector-tag"
                    :class="showMore ? 'activeTag' : ''"
                    @click="showMore = !showMore"
                >
                    &bull;&bull;&bull;
                </div>
            </template>
        </ExploreTag>
        <TagSelector
            :show-more="showMore"
            :active-tags="storageStore.settings.activeTags"
        ></TagSelector>
        <!-- 渲染歌单列表 -->
        <div
            v-infinite-scroll="load"
            class="mt-12 grid gap-10 grid-cols-6 lg:gap-x-5"
            :infinite-scroll-immediate="false"
            infinite-scroll-distance="300"
            infinite-scroll-delay="500"
        >
            <div v-for="(item, index) in playList" :key="index">
                <Cover :row-list-item="item">
                    <template #playCount="{ playCount }">
                        <div
                            class="absolute right-0 top-2 flex justify-center items-center pr-3 pt-0.5"
                        >
                            <SvgIcon name="play" size="18" class="opacity-90 text-white"></SvgIcon>
                            <span
                                class="italic text-white text-sm lg:text-xs flex-shrink-0 font-semibold text-opacity-90"
                                >{{ playCount }}</span
                            >
                        </div>
                    </template>
                </Cover>
            </div>
        </div>
    </div>
</template>

<script setup>
import { onBeforeRouteUpdate } from 'vue-router'
import { useStorageStore } from '@/store/Storage.js'
const storageStore = useStorageStore()
const { proxy } = getCurrentInstance()
const route = useRoute()

// 计算路由变化，决定类型参数
// 如果点击更多，则进行切换,用两个值进行控制，同时控制下面选择框显示与隐藏
const showMore = ref(false)
// 该值依赖路由
const category = computed(() => {
    const { query } = route
    return query?.cat || '全部'
})

// 每次获取的限制值和偏移量
const limit = ref(24)
const offset = ref(0)
const more = ref(true)
const lasttime = ref(null)
// 重置数据
const reset = () => {
    playList.value = []
    offset.value = 0
    more.value = true
    lasttime.value = null
}

// 请求对象歌单数据
const playList = ref([])
const getPlayList = ({ limit, cat, offset, before }) => {
    if (cat === '排行榜') {
        // 不需要滚动加载
        proxy.$http.reqRankList().then(res => {
            playList.value = res.data.list
        })
        return
    }
    if (cat === '精品歌单') {
        proxy.$http.reqHighqualityPlaylist({ limit: 24, cat: '全部', before }).then(res => {
            playList.value = [...playList.value, ...res.data.playlists]
            more.value = res.data.more
            lasttime.value = res.data.lasttime
        })
        return
    }
    if (cat === '推荐歌单') {
        proxy.$http.reqAlbumListList({ limit: 100 }).then(res => {
            playList.value = [...playList.value, ...res.data.result]
        })
        return
    }
    // 如果是其他类型则获取歌单
    proxy.$http.reqPlayList({ limit, cat, offset }).then(res => {
        playList.value = [...playList.value, ...res.data.playlists]
        more.value = res.data.more
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
    getPlayList({ limit: limit.value, cat: to.query.cat })
})

// 解决无限滚动获取不到dom的问题
const mounted = ref(false)
onMounted(() => {
    mounted.value = true
    reset()
    // 获取标签信息
    getPlayList({ limit: limit.value, cat: category.value, offset: offset.value * limit.value })
})
</script>

<style lang="postcss"></style>
