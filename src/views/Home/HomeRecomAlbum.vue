<template>
    <div class="mt-16">
        <div class="flex justify-between items-end mb-5">
            <h3 class="text-3xl font-bold">{{ $t.home.recomAlbumTitle }}</h3>
            <router-link
                :to="{ path: '/explore', query: { cat: '推荐歌单' } }"
                class="text-skin-secondary font-semibold text-sm"
            >
                {{ $t.home.more }}
            </router-link>
        </div>
        <div class="grid gap-10 grid-cols-5 lg:gap-x-5">
            <div v-for="(item, index) in itemList" :key="index">
                <Cover :row-list-item="item">
                    <!-- 推荐歌单、排行榜显示播放数量 -->
                    <template #playCount="{ playCount }">
                        <div
                            class="flex justify-center items-center absolute left-0 bottom-2 pl-1.5 py-0.5"
                        >
                            <SvgIcon name="play" size="18" class="opacity-90"></SvgIcon>
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
defineProps({
    itemList: {
        type: Array,
        required: true
    }
})
</script>

<style lang="postcss"></style>
