<template>
    <div class="relative" @mouseenter="show = true" @mouseleave="show = false">
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
        <img
            :src="picUrl"
            loading="lazy"
            :class="rowType === 'recomArtist' ? 'rounded-full' : 'rounded-lg'"
            class="object-cover w-full h-full"
        />
        <transition name="fade">
            <img
                v-show="show"
                class="w-full h-full absolute top-3 -z-10 bg-cover blur-md opacity-60 scale-95"
                :class="rowType === 'recomArtist' ? 'rounded-full' : 'rounded-lg'"
                :src="picUrl"
                loading="lazy"
            />
        </transition>
    </div>
    <div class="lineClamp2 mt-2" :class="rowType === 'recomArtist' ? 'text-center' : ''">
        <router-link to="/" class="cursor-pointer hover:underline font-semibold text-skin-base">
            {{ rowListItem.name }}
        </router-link>
    </div>
    <!-- 排行榜显示更新频率 -->
    <template v-if="rowType === 'rankList'">
        <span class="text-xs text-skin-tertiary lineClamp1 mt-1">
            {{ rowListItem.updateFrequency }}
        </span>
    </template>
    <!-- 热门新碟显示歌手名 -->
    <template v-if="rowType === 'albumNewest'">
        <div v-for="(item, index) in rowListItem.artists" :key="index">
            <i v-if="index !== 0">/</i>
            <router-link to="/" class="text-xs text-skin-tertiary cursor-pointer hover:underline">
                {{ item.name }}
            </router-link>
        </div>
    </template>
</template>

<script setup>
import { ref, computed } from 'vue'
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
    return `${url}?param=512y512`
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
