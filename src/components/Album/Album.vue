<template>
    <section class="mt-16">
        <div class="flex justify-between items-end mb-5">
            <h3 class="text-3xl font-bold text-skin-base">{{ itemName }}</h3>
            <router-link to="/explore" class="text-skin-secondary font-semibold text-sm">
                查看全部
            </router-link>
        </div>
        <div
            class="grid gap-x-10 gap-y-10"
            :class="type === 'recomArtist' ? 'grid-cols-6' : 'grid-cols-5'"
        >
            <div v-for="(item, index) in itemList" :key="index">
                <Cover :row-list-item="item" :row-type="type"></Cover>
            </div>
        </div>
    </section>
</template>

<script setup>
import Cover from '@/components/Cover/Cover.vue'
// import { computed, reactive } from 'vue'

defineProps({
    itemList: {
        type: Array,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    itemName: {
        type: String,
        required: true
    }
})
// const typeList = reactive([
//     { type: 'recomList', name: '推荐歌单' },
//     { type: 'rankList', name: '排行榜' },
//     { type: 'recomArtist', name: '热门歌手' },
//     { type: 'albumNewest', name: '热门新碟' },
//     {
//         type: 'newSong',
//         name: '上新歌曲'
//     }
// ])

// // 处理title问题
// const itemName = computed(() => {
//     return typeList.find(item => item.type === props.type).name
// })
</script>

<style lang="postcss"></style>
