<template>
    <div
        v-show="song.name"
        v-if="song.al"
        class="flex space-x-6 items-center hover:bg-opacity-10 hover:bg-skin-tertiary transition-all rounded-lg p-2 my-2"
        @mouseenter="showBtn = true"
        @mouseleave="showBtn = false"
    >
        <!-- 歌曲图片 -->
        <div
            class="flex items-center justify-center rounded-md overflow-hidden relative w-12 flex-shrink-0"
        >
            <img
                v-lazy="`${song.al?.picUrl.replace(/^http:/, 'https://')}?param=48y48`"
                class="w-12 h-12"
                loading="lazy"
            />
        </div>
        <!-- 歌名 作者 -->
        <div class="flex flex-col justify-center flex-1">
            <div class="flex font-bold text-lg lineClamp1">
                <span class="cursor-pointer hover:underline lineClamp1"> {{ song.name }}</span>
                <span v-if="song.alia[0]" class="text-skin-tertiary lineClamp1">
                    ({{ song.alia[0] }})
                </span>
            </div>
            <div class="text-sm text-skin-tertiary lineClamp1">
                <span v-for="(item, index) in song.ar" :key="index">
                    <span v-if="index !== 0"> / </span
                    ><span class="hover:underline cursor-pointer">{{ item.name }}</span></span
                >
            </div>
        </div>
        <!-- 出处 -->
        <div class="flex items-center flex-1">
            <span class="hover:underline cursor-pointer lineClamp1">{{ song.al.name }}</span>
        </div>
        <!-- 收藏或喜欢 -->
        <div class="flex justify-end items-center w-8">
            <div v-show="MySongs.likeSongIds(song.id) || showBtn" class="cursor-pointer">
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
        <div class="flex items-center justify-center select-none">{{ forminute(song.dt) }}</div>
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
