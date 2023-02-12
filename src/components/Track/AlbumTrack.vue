<template>
    <div
        v-show="song.name"
        class="flex space-x-6 items-center transition-all rounded-lg py-3 px-4"
        :class="
            song.id === currentTrack.id
                ? 'bg-theme-baseActive bg-opacity-50'
                : 'hover:bg-theme-baseSecond'
        "
        @mouseenter="showBtn = true"
        @mouseleave="showBtn = false"
    >
        <!-- 序号 -->
        <div class="w-2 flex items-center justify-center">
            <div
                class="font-bold italic"
                :class="
                    song.id === currentTrack.id ? 'text-theme-baseActive' : 'text-theme-baseSecond'
                "
            >
                {{ song.no }}
            </div>
        </div>
        <!-- 歌名 作者 -->
        <div class="flex flex-col justify-center flex-1">
            <div class="flex font-bold text-lg select-none">
                <span
                    class="line-clamp-1"
                    :title="song.name"
                    :class="
                        song.id === currentTrack.id ? 'text-theme-baseActive' : 'text-theme-base'
                    "
                >
                    {{ song.name }}</span
                >
                <span
                    v-if="song.alia[0]"
                    class="line-clamp-1"
                    :class="
                        song.id === currentTrack.id
                            ? 'text-theme-baseActive opacity-50'
                            : 'text-theme-baseSecond'
                    "
                >
                    ({{ song.alia[0] }})
                </span>
            </div>
        </div>
        <!-- 收藏或喜欢 -->
        <div class="flex justify-end items-center w-8">
            <div
                v-show="MySong.likeSongIds(song.id) || showBtn"
                class="cursor-pointer"
                @click="MySong.likeSongSub(song.id, !MySong.likeSongIds(song.id))"
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
        <div
            v-if="song.dt"
            class="flex items-center justify-center select-none font-semibold w-12"
            :class="song.id === currentTrack.id ? 'text-theme-baseActive' : 'text-theme-base'"
        >
            {{ forminute(song.dt) }}
        </div>
    </div>
</template>

<script setup lang="ts">
import { useMySong } from '@stores/MySong'
import { forminute } from '@utils/format'
import { usePlay } from '@utils/player/usePlayer'
const { currentTrack } = usePlay()
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
