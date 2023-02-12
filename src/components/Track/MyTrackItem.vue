<template>
    <div
        class="flex items-center space-x-3 py-2 px-2 rounded-lg"
        :class="
            id === currentTrack.id
                ? 'bg-theme-baseActive bg-opacity-50'
                : 'hover:bg-theme-baseSecond'
        "
    >
        <!-- 歌曲图片 -->
        <div class="flex-shrink-0 flex items-center justify-center">
            <img v-lazy="`${picUrl}?param=36y36`" class="rounded-lg h-9 w-9" loading="lazy" />
        </div>
        <!-- 歌曲描述 -->
        <div class="flex flex-col justify-center">
            <!-- 歌名 -->
            <div
                class="font-bold line-clamp-1 select-none"
                :class="id === currentTrack.id ? 'text-theme-baseActive' : 'text-theme-base'"
                :title="name"
            >
                <span>{{ name }}</span>
                <span
                    v-if="alia.length > 0"
                    :class="
                        id === currentTrack.id
                            ? 'text-theme-baseActive opacity-50'
                            : 'text-theme-baseSecond'
                    "
                >
                    ({{ alia[0] }})
                </span>
            </div>
            <!-- 歌手 -->
            <div class="text-xs line-clamp-1 text-theme-baseSecond">
                <div v-for="(ar1, index1) in ar" :key="index1" class="inline">
                    <span v-if="index1 !== 0"> / </span>
                    <router-link
                        class="hover:underline font-semibold"
                        :to="ar1.id !== 0 ? { name: 'artist', params: { id: ar1.id } } : ''"
                        :class="
                            id === currentTrack.id
                                ? 'text-theme-baseActive'
                                : 'text-theme-baseSecond'
                        "
                    >
                        {{ ar1.name }}
                    </router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { usePlay } from '@utils/player/usePlayer'
const { currentTrack } = usePlay()
interface Dprops {
    id: number
    picUrl: string
    name: string
    alia: any[]
    ar: { id: number; name: string }[]
}
defineProps<Dprops>()
</script>

<style lang="postcss"></style>
