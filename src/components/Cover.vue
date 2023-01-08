<template>
    <div class="flex flex-col">
        <!-- 图片 -->
        <div class="mb-2 text-center cover relative">
            <router-link :to="routeParams">
                <img
                    v-lazy="$imgUrl(imgUrl, 512)"
                    :alt="listItem.name"
                    lazy="loaded"
                    class="object-cover w-full h-full align-middle"
                    :class="isRounded ? 'rounded-full' : 'rounded-xl'"
                />
                <!-- 图片阴影层 -->
                <div
                    :style="{ backgroundImage: `url(${$imgUrl(imgUrl, 512)})` }"
                    class="coverbg -z-10 opacity-0 absolute w-full top-3 scale-95 transition duration-300 ease-linear bg-no-repeat bg-center bg-cover blur-lg aspect-square"
                    :class="isRounded ? 'rounded-full' : 'rounded-xl'"
                ></div>
            </router-link>
            <!-- 播放数量 -->
            <div
                v-if="isPlayCount"
                class="absolute bottom-2 right-2 flex text-white italic select-none text-sm lg:text-xs flex-shrink-0 font-semibold text-opacity-80"
            >
                <SvgIcon name="playfill" size="18" class="opacity-80 fill-current"></SvgIcon>
                {{ listItem.playCount && formatPlayCount(listItem.playCount) }}
            </div>
        </div>
        <!-- 标题 -->
        <div
            :class="isTextCenter ? 'text-center' : 'text-left'"
            class="line-clamp-2 text-theme-base"
        >
            <router-link
                :to="routeParams"
                class="cursor-pointer hover:underline font-semibold"
                :title="listItem.name"
            >
                {{ listItem?.name }}
            </router-link>
        </div>
        <!-- 副标题插槽 -->
        <slot name="subTilte"></slot>
    </div>
</template>

<script setup lang="ts">
import type { RouteLocationRaw } from 'vue-router'
import { formatPlayCount } from '@/utils/format'
interface Dprops {
    listItem: {
        name: string
        id: number
        picUrl?: string
        coverImgUrl?: string
        img1v1Url?: string
        playCount?: number
    }
    isTextCenter?: boolean
    isRounded?: boolean
    listType: string
    isPlayCount?: boolean
}
const props = withDefaults(defineProps<Dprops>(), {
    isTextCenter: false,
    isRounded: false,
    isPlayCount: false
})

const imgUrl = computed(
    () => props.listItem.img1v1Url || props.listItem.picUrl || props.listItem.coverImgUrl || ''
)
const routeParams = computed((): RouteLocationRaw => {
    if (props.listType === '歌单') {
        return { name: 'playlist', params: { id: props.listItem.id } }
    }
    if (props.listType === '歌手') {
        return { name: 'artist', params: { id: props.listItem.id } }
    }
    if (props.listType === '专辑') {
        return { name: 'album', params: { id: props.listItem.id } }
    }
    return {}
})
</script>

<style scoped lang="postcss">
.cover:hover {
    .coverbg {
        opacity: 0.95;
    }
}
</style>
