<template>
    <div class="mt-16">
        <div class="flex justify-between items-end mb-5">
            <h3 class="text-3xl font-bold text-skin-base">{{ $t.home.albumNewest }}</h3>
            <router-link to="/explore" class="text-skin-secondary font-semibold text-sm">
                {{ $t.home.more }}
            </router-link>
        </div>
        <div class="grid gap-x-10 grid-cols-5 lg:gap-x-5">
            <div v-for="(item, index) in itemList" :key="index">
                <Cover :row-list-item="item">
                    <!-- 热门新碟显示歌手名 -->
                    <template #subTilte="{ rowListItem }">
                        <div v-for="(item1, index1) in rowListItem.artists" :key="index1">
                            <i v-if="index1 !== 0">/</i>
                            <router-link
                                to="/"
                                class="text-xs text-skin-tertiary cursor-pointer hover:underline"
                            >
                                {{ item1.name }}
                            </router-link>
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
