<template>
    <div class="flex flex-col">
        <div
            class="mb-2 overflow-hidden text-center"
            :class="isRounded ? 'rounded-full' : 'rounded-xl'"
        >
            <router-link :to="routeParams">
                <img
                    v-lazy="$imgUrl(imgUrl, 512)"
                    :alt="listItem.name"
                    lazy="loaded"
                    class="object-cover w-full h-full align-middle"
                />
            </router-link>
        </div>
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
        <div></div>
    </div>
</template>

<script setup lang="ts">
import type { RouteLocationRaw } from 'vue-router'
interface Dprops {
    listItem: {
        name: string
        id: number
        picUrl?: string
        coverImgUrl?: string
        img1v1Url?: string
    }
    isTextCenter?: boolean
    isRounded?: boolean
    listType: string
}
const props = withDefaults(defineProps<Dprops>(), {
    isTextCenter: false,
    isRounded: false
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

<style scoped></style>
