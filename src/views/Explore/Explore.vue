<template>
    <h3 class="font-bold text-6xl my-9">{{ $t.explore.title }}</h3>
    <!-- 标签栏 -->
    <div class="flex flex-wrap mb-2">
        <ExploreTag
            v-model="showMore"
            :active-tags="storageStore.data.activeTags"
            :category="category"
        >
            <template #more>
                <div class="tag" :class="showMore ? 'activeTag' : ''" @click="showMore = !showMore">
                    &bull;&bull;&bull;
                </div>
            </template>
        </ExploreTag>
    </div>
    <TagSelector :show-more="showMore" :active-tags="storageStore.data.activeTags"></TagSelector>
    <!-- 渲染歌单列表 -->
    <Album :item-list="playList" :type="'explore'" :item-name="'explore'"></Album>
</template>

<script setup>
import { computed, onActivated, getCurrentInstance, ref } from 'vue'
import { onBeforeRouteUpdate, useRoute } from 'vue-router'
import ExploreTag from './ExploreTag/ExploreTag.vue'
import TagSelector from './TagSelector/TagSelector.vue'
import { useStorageStore } from '@/store/Storage.js'
const storageStore = useStorageStore()
const { proxy } = getCurrentInstance()
const route = useRoute()
onActivated(() => {
    // 获取标签信息
    storageStore.getTags()
    getPlayList({ limit: 20, cat: category.value })
})
// 组件复用时，在动态组件中，不更改路由，但更新参数，需要根据路由参数不同调用方法
onBeforeRouteUpdate(to => {
    getPlayList({ limit: 20, cat: to.query?.cat || '全部' })
})

// 计算路由变化，决定类型参数
// 如果点击更多，则进行切换,用两个值进行控制，同时控制下面选择框显示与隐藏
const showMore = ref(false)
// 该值依赖路由
const category = computed(() => {
    const { query } = route
    return query?.cat || '全部'
})

// 请求对象歌单数据
const playList = ref([])
const getPlayList = ({ limit, cat }) => {
    // console.log(limit, cat)
    if (cat === '排行榜') {
        proxy.$http.reqRankList().then(res => {
            playList.value = res.data.list
        })
    } else if (cat === '精品歌单') {
        proxy.$http.reqHighqualityPlaylist({ limit: 20, cat: '全部' }).then(res => {
            playList.value = res.data.playlists
        })
    } else if (cat === '推荐歌单') {
        proxy.$http.reqAlbumListList({ limit: 20 }).then(res => {
            playList.value = res.data.result
        })
    } else {
        proxy.$http.reqPlayList({ limit, cat }).then(res => {
            playList.value = res.data.playlists
        })
    }
}
</script>

<style lang="postcss"></style>
