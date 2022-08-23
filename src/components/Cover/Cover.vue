<template>
    <div class="relative" @mouseenter="show = true" @mouseleave="show = false">
        <!-- 播放按钮 遮罩层 -->
        <div
            class="flex items-center justify-center absolute top-0 min-w-full min-h-full bg-opacity-0 cursor-pointer"
        >
            <transition name="fade-play">
                <div
                    v-show="show"
                    class="flex items-center justify-center backdrop-saturate-180 backdrop-blur-md rounded-full p-1/20 bg-white bg-opacity-20 hover:bg-opacity-30 active:scale-90 transition-all"
                >
                    <SvgIcon icon-name="play" icon-size="32"></SvgIcon>
                </div>
            </transition>
        </div>
        <!-- 播放数量插槽 -->
        <slot name="playCount" :play-count="playCount"></slot>
        <!-- 图片层 -->
        <img
            v-lazy="picUrl"
            loading="lazy"
            :class="rowType === 'recomArtist' ? 'rounded-full' : 'rounded-lg'"
            class="object-cover w-full h-full"
        />
        <!-- 图片阴影层 -->
        <transition name="fade">
            <img
                v-show="show"
                :src="picUrl"
                class="w-full h-full absolute top-3 -z-10 bg-cover blur-md opacity-60 scale-95"
                :class="rowType === 'recomArtist' ? 'rounded-full' : 'rounded-lg'"
                loading="lazy"
            />
        </transition>
    </div>
    <!-- 标题 -->
    <div class="lineClamp2 mt-2" :class="rowType === 'recomArtist' ? 'text-center' : ''">
        <router-link to="/" class="cursor-pointer hover:underline font-semibold">
            {{ rowListItem.name }}
        </router-link>
    </div>
    <!-- 副标题 -->
    <slot name="subTilte" :row-list-item="rowListItem"></slot>
</template>

<script setup>
import { ref, computed } from 'vue'
import { formatPlayCount } from '@/utils/fromat.js'
const props = defineProps({
    rowListItem: {
        type: Object,
        default: () => {}
    },
    rowType: {
        type: String,
        default: ''
    }
})
// 控制遮罩显示
const show = ref(false)

// 计算图片地址
const picUrl = computed(() => {
    let url = props.rowListItem.picUrl || props.rowListItem.coverImgUrl
    return `${url?.replace('http://', 'https://')}?param=512y512`
})
// 计算播放数量
const playCount = computed(() => {
    let count = props.rowListItem?.playCount
    return formatPlayCount(count)
})
</script>

<style lang="postcss">
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.3s;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
.fade-play-enter-active,
.fade-play-leave-active {
    transition: opacity 0.3s;
    transition: scale 0.5s;
}

.fade-play-enter-from,
.fade-play-leave-to {
    opacity: 0;
    scale: 0.86;
}
</style>
