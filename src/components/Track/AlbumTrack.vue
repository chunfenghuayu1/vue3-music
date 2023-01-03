<template>
    <div
        v-show="song.name"
        class="flex space-x-6 items-center hover:bg-opacity-10 hover:bg-gray-400 transition-all rounded-lg py-3 px-4"
        @mouseenter="showBtn = true"
        @mouseleave="showBtn = false"
    >
        <!-- 序号 -->
        <div class="w-2 flex items-center justify-center">
            <div class="font-semibold italic">
                {{ song.no }}
            </div>
        </div>
        <!-- 歌名 作者 -->
        <div class="flex flex-col justify-center flex-1">
            <div class="flex font-bold text-lg line-clamp-1">
                <span class="line-clamp-1 select-none" :title="song.name"> {{ song.name }}</span>
                <span v-if="song.alia[0]" class="line-clamp-1"> ({{ song.alia[0] }}) </span>
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
                    class=""
                ></SvgIcon>
                <SvgIcon v-else name="dislike" size="20" class=""></SvgIcon>
            </div>
        </div>
        <!-- 歌曲时间 -->
        <div v-if="song.dt" class="flex items-center justify-center">
            {{ forminute(song.dt) }}
        </div>
    </div>
</template>

<script setup lang="ts">
import { useMySong } from '@/stores/MySong'
import { forminute } from '@/utils/format'
const MySong = useMySong()
defineProps({
    song: {
        type: Object,
        default: () => {}
    }
})
const showBtn = ref(false)
</script>

<style lang="postcss"></style>
