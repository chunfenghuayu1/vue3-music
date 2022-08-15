<template>
    <div class="relative cursor-pointer" @mouseenter="show = true" @mouseleave="show = false">
        <div
            class="flex items-center justify-center absolute top-0 min-w-full min-h-full bg-opacity-0"
        >
            <transition name="fade">
                <div
                    v-show="show"
                    class="flex items-center justify-center backdrop-saturate-180 backdrop-blur-md rounded-full p-1/20 bg-white bg-opacity-20 hover:bg-opacity-30"
                >
                    <SvgIcon icon-name="play" icon-size="32"></SvgIcon>
                </div>
            </transition>
        </div>
        <img
            :src="`${albumListItem.picUrl}?param=512y512`"
            loading="lazy"
            :class="albumName === '推荐艺人' ? 'rounded-full' : 'rounded-lg'"
            class="object-cover"
        />
        <transition name="fade">
            <div
                v-show="show"
                class="w-full h-full absolute top-3 -z-10 bg-cover rounded-lg blur-md bg-opacity-80 scale-x-95 scale-y-90"
                :style="{
                    backgroundImage: `url(${albumListItem.picUrl}?param=512y512)`
                }"
            ></div>
        </transition>
    </div>
    <div>
        <p class="cursor-pointer hover:underline font-semibold text-skin-base mt-2 lineClamp2">
            {{ albumListItem.name }}
        </p>
    </div>
</template>

<script setup>
import { ref } from 'vue'
defineProps({
    albumListItem: {
        type: Object,
        default: () => {}
    },
    albumName: {
        type: String,
        default: ''
    }
})
// 控制遮罩显示
const show = ref(false)
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
</style>
