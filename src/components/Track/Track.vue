<template>
    <div
        v-if="song.al"
        class="flex space-x-6 items-center hover:bg-opacity-10 hover:bg-gray-500 transition-all rounded-lg p-2 my-2"
        @mouseenter="showBtn = true"
        @mouseleave="showBtn = false"
    >
        <!-- 歌曲图片 -->
        <div
            class="flex items-center justify-center rounded-md overflow-hidden relative w-12 flex-shrink-0"
        >
            <img v-lazy="$imgUrl(song.al.picUrl, 48)" class="w-12 h-12" loading="lazy" />
        </div>
        <!-- 歌名 作者 -->
        <div class="flex flex-col justify-center flex-1">
            <div class="flex font-bold text-lg line-clamp-1 select-none">
                <span :title="song.name"> {{ song.name }}</span>
                <span v-if="song.alia[0]" class="text-gray-500"> ({{ song.alia[0] }}) </span>
            </div>
            <div class="text-sm text-gray-500 line-clamp-1">
                <span v-for="(item, index) in song.ar" :key="index">
                    <span v-if="index !== 0"> / </span
                    ><span class="hover:underline cursor-pointer">{{ item.name }}</span></span
                >
            </div>
        </div>
        <!-- 专辑名 -->
        <div class="flex items-center flex-1">
            <span
                v-if="isShowAlbum && song.al.name"
                class="hover:underline cursor-pointer line-clamp-1"
                :title="song.al.name"
                >{{ song.al.name }}</span
            >
        </div>
        <div class="flex items-center justify-end">
            <template v-if="isShowOther">
                <!-- 收藏或喜欢 -->
                <div class="flex justify-center items-center w-8">
                    <div v-show="MySong.likeSongIds(song.id) || showBtn" class="cursor-pointer">
                        <SvgIcon
                            v-if="MySong.likeSongIds(song.id)"
                            name="like"
                            size="22"
                            color="red"
                        ></SvgIcon>
                        <SvgIcon
                            v-else
                            name="dislike"
                            size="22"
                            color="red"
                            class="text-red-300"
                        ></SvgIcon>
                    </div>
                </div>
                <!-- 歌曲时间 -->
                <div class="flex items-center justify-center select-none w-12">
                    {{ forminute(song.dt) }}
                </div>
            </template>
            <template v-else>
                <div class="flex items-center justify-center w-12">
                    <slot name="other"></slot>
                </div>
            </template>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useMySong } from '@/stores/MySong'
import { forminute } from '@/utils/format'
const MySong = useMySong()
interface Dprops {
    song: {
        al: {
            picUrl: string
            name: string
        }
        name: string
        alia: any[]
        ar: { name: string }[]
        id: number
        dt: number
    }
    isShowAlbum?: boolean
    isShowOther?: boolean
}
withDefaults(defineProps<Dprops>(), {
    isShowAlbum: true,
    isShowOther: true
})
const showBtn = ref(false)
</script>

<style lang="postcss"></style>
