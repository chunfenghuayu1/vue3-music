<template>
    <div class="flex items-center space-x-3 py-2 px-2 hover:bg-theme-baseSecond rounded-lg">
        <!-- 歌曲图片 -->
        <div class="flex-shrink-0 flex items-center justify-center">
            <img :src="`${picUrl}?param=36y36`" class="rounded-lg h-9 w-9" />
        </div>
        <!-- 歌曲描述 -->
        <div class="flex flex-col justify-center">
            <!-- 歌名 -->
            <div class="font-bold line-clamp-1 select-none" :title="name">
                <span class="text-theme-base">{{ name }}</span>
                <span v-if="alia.length > 0" class="text-theme-baseSecond"> ({{ alia[0] }}) </span>
            </div>
            <!-- 歌手 -->
            <div class="text-xs line-clamp-1 text-theme-baseSecond">
                <div v-for="(ar1, index1) in ar" :key="index1" class="inline">
                    <span v-if="index1 !== 0"> / </span>
                    <router-link
                        class="hover:underline"
                        :to="{ name: 'artist', params: { id: ar1.id } }"
                    >
                        {{ ar1.name }}
                    </router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
interface Dprops {
    picUrl: string
    name: string
    alia: any[]
    ar: { id: number; name: string }[]
}
defineProps<Dprops>()
</script>

<style lang="postcss"></style>
