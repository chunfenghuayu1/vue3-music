<template>
    <div
        class="flex items-center space-x-3 py-2 px-2 hover:bg-gray-300 hover:bg-opacity-30 rounded-lg"
    >
        <!-- 歌曲图片 -->
        <div class="flex-shrink-0 flex items-center justify-center">
            <img :src="`${picUrl}?param=36y36`" class="rounded-lg h-9 w-9" />
        </div>
        <!-- 歌曲描述 -->
        <div class="flex flex-col justify-center">
            <!-- 歌名 -->
            <div class="font-bold lineClamp1 select-none">
                <span>{{ name }}</span>
                <span v-if="alia?.length > 0" class="text-skin-tertiary"> ({{ alia[0] }}) </span>
            </div>
            <!-- 歌手 -->
            <div class="text-xs lineClamp1 text-skin-tertiary">
                <div v-for="(ar1, index1) in ar" :key="index1" class="inline">
                    <span v-if="index1 !== 0"> / </span>
                    <span class="cursor-pointer hover:underline">
                        {{ ar1.name }}
                    </span>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
defineProps({
    item: {
        type: Object,
        required: true
    },
    picUrl: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    alia: {
        type: Array,
        required: true
    },
    ar: {
        type: Array,
        required: true
    }
})
</script>

<style lang="postcss"></style>
