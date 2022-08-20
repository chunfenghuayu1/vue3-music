<template>
    <h3 class="font-bold text-6xl my-9">{{ $t.explore.title }}</h3>
    <!-- 标签栏 -->
    <div class="flex flex-wrap mb-2">
        <ExploreTag
            :active-tags="storageStore.data.activeTags"
            :category="category"
            :show-more="showMore"
        >
            <template #more>
                <div class="tag" :class="showMore ? 'activeTag' : ''" @click="showMore = !showMore">
                    &bull;&bull;&bull;
                </div>
            </template>
        </ExploreTag>
    </div>
    <TagSelector :show-more="showMore"></TagSelector>
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
onActivated(() => {
    storageStore.getTags()
    getPlayList({ limit: 10, cat: category.value })
})
// 组件复用时，在动态组件中，不更改路由，但更新参数，需要根据路由参数不同调用方法
onBeforeRouteUpdate(to => {
    const { query } = to
    if (query?.cat) {
        getPlayList({ limit: 10, cat: query.cat })
    }
})
const route = useRoute()
// 计算路由变化，决定类型参数
// 如果点击更多，则进行切换,用两个值进行控制，同时控制下面选择框显示与隐藏
const showMore = ref(false)
const category = computed(() => {
    const { query } = route
    return query.cat || '全部'
})
// 请求对象歌单数据
const playList = ref([])
const getPlayList = value => {
    proxy.$http.reqPlayList(value).then(res => {
        playList.value = res.data.playlists
    })
}
</script>

<style lang="postcss"></style>
