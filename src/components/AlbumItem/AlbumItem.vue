<template>
    <div
        v-show="song.name"
        class="flex space-x-6 items-center hover:bg-opacity-10 hover:bg-skin-tertiary transition-all rounded-lg py-2 px-4"
        @mouseenter="showBtn = true"
        @mouseleave="showBtn = false"
    >
        <!-- 序号 -->
        <div class="w-2 flex items-center justify-center">
            <div v-if="!showBtn || !song.dt" class="font-semibold italic text-skin-tertiary">
                {{ song.no }}
            </div>
            <div v-else-if="song.dt">
                <SvgIcon name="play" size="24" class="text-skin-primary"></SvgIcon>
            </div>
        </div>
        <!-- 歌名 作者 -->
        <div class="flex flex-col justify-center flex-1">
            <div class="flex font-bold text-lg lineClamp1">
                <span class="lineClamp1 hover:underline cursor-pointer"> {{ song.name }}</span>
                <span v-if="song.alia[0]" class="text-skin-tertiary lineClamp1">
                    ({{ song.alia[0] }})
                </span>
            </div>
        </div>
        <!-- 收藏或喜欢 -->
        <div class="flex justify-end items-center w-8">
            <div v-show="showBtn && song.dt" class="cursor-pointer">
                <SvgIcon
                    v-if="MySongs.likeSongIds(song.id)"
                    name="like"
                    size="20"
                    class="text-skin-primary"
                ></SvgIcon>
                <SvgIcon v-else name="dislike" size="20" class="text-skin-primary"></SvgIcon>
            </div>
        </div>
        <!-- 歌曲时间 -->
        <div v-if="song.dt" class="flex items-center justify-center font-semibold">
            {{ forminute(song.dt) }}
        </div>
    </div>
</template>

<script setup>
import { useMySongs } from '@/store/MySongs.js'
import { forminute } from '@/utils/format.js'
const MySongs = useMySongs()
defineProps({
    song: {
        type: Object,
        default: () => {}
    }
})
const showBtn = ref(false)
</script>

<style lang="postcss"></style>
