<template>
    <div
        v-show="song.name"
        class="flex space-x-6 items-center hover:bg-theme-baseSecond transition-all rounded-lg py-3 px-4"
        @mouseenter="showBtn = true"
        @mouseleave="showBtn = false"
    >
        <!-- 序号 -->
        <div class="w-2 flex items-center justify-center">
            <div class="text-theme-baseSecond font-bold italic">
                {{ song.no }}
            </div>
        </div>
        <!-- 歌名 作者 -->
        <div class="flex flex-col justify-center flex-1 line-clamp-1">
            <div class="flex font-bold text-lg select-none">
                <span class="text-theme-base line-clamp-1" :title="song.name">
                    {{ song.name }}</span
                >
                <span v-if="song.alia[0]" class="line-clamp-1 text-theme-baseSecond">
                    ({{ song.alia[0] }})
                </span>
            </div>
        </div>
        <!-- 收藏或喜欢 -->
        <div class="flex justify-end items-center w-8">
            <div
                v-show="MySong.likeSongIds(song.id) || (showBtn && song.dt)"
                class="cursor-pointer"
            >
                <SvgIcon
                    v-if="MySong.likeSongIds(song.id)"
                    name="like"
                    size="20"
                    class="text-theme-baseActive stroke-current"
                ></SvgIcon>
                <SvgIcon
                    v-else
                    name="dislike"
                    size="20"
                    class="text-theme-baseActive stroke-current"
                ></SvgIcon>
            </div>
        </div>
        <!-- 歌曲时间 -->
        <div v-if="song.dt" class="text-theme-base flex items-center justify-center">
            {{ forminute(song.dt) }}
        </div>
    </div>
</template>

<script setup lang="ts">
import { useMySong } from '@/stores/MySong'
import { forminute } from '@/utils/format'
const MySong = useMySong()
interface Dprops {
    song: {
        id: number
        no: number
        name: string
        alia: any[]
        dt: number
    }
}
defineProps<Dprops>()
const showBtn = ref(false)
</script>

<style lang="postcss"></style>
