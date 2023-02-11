<template>
    <transition name="player-out">
        <div
            class="fixed bottom-0 left-0 right-0 h-16 z-50 backdrop-saturate-150 backdrop-blur-lg transition-all duration-300 ease-linear bg-theme-base bg-opacity-80 flex flex-col"
            v-if="showPlayer"
        >
            <!-- 进度 -->
            <div
                class="w-full h-1 relative bg-theme-baseSecond transition-all duration-300 ease-linear"
            >
                <!-- 进度 -->
                <div
                    class="bg-theme-baseActive h-full bg-opacity-80"
                    :style="{ width: toPercent(sliderProgress.x.value) }"
                ></div>
                <!-- 圆点 -->
                <div
                    class="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 bg-theme-baseActive w-2.5 h-2.5 rounded-full shadow-lg hover:w-4 hover:h-4 cursor-pointer"
                    @mousedown="sliderProgress.handleSlide"
                    :style="{
                        left: toPercent(sliderProgress.x.value),
                        transition:
                            'width 0.1s cubic-bezier(0.12, 0.63, 0.74, 0.41),height 0.1s cubic-bezier(0.12, 0.63, 0.74, 0.41)'
                    }"
                ></div>
            </div>
            <!-- 操作区 -->
            <div class="px-10vw flex-1 flex justify-between text-theme-base">
                <!-- 歌曲信息 -->
                <div class="flex items-center h-full flex-1">
                    <div class="w-12">
                        <img
                            class="rounded-lg align-middle object-cover shadow-lg"
                            :src="$imgUrl(currentTrack.al.picUrl, 96)"
                        />
                    </div>
                    <div class="flex-col flex justify-center px-4">
                        <div class="font-semibold line-clamp-1">
                            {{ currentTrack.name }}
                        </div>
                        <div class="text-xs opacity-60 font-semibold line-clamp-1">
                            <p
                                v-for="(item, index) in currentTrack.ar"
                                :key="item.id"
                                class="inline"
                            >
                                <span v-if="index !== 0"> / </span>
                                <span v-text="item.name"></span>
                            </p>
                        </div>
                    </div>
                </div>

                <!-- 操作 -->
                <div
                    class="flex-1 flex justify-center items-center text-theme-base select-none space-x-6"
                >
                    <div class="rounded-full active:scale-90 transition-all cursor-pointer">
                        <SvgIcon name="playback" size="32" @click="nextOrPrePlay('pre')"></SvgIcon>
                    </div>
                    <div class="rounded-full active:scale-90 transition-all cursor-pointer">
                        <SvgIcon
                            :name="isPlaying ? 'pause' : 'playfill'"
                            size="32"
                            @click="playOrPause"
                        ></SvgIcon>
                    </div>
                    <div class="rounded-full active:scale-90 transition-all cursor-pointer">
                        <SvgIcon
                            name="playforward"
                            size="32"
                            @click="nextOrPrePlay('next')"
                        ></SvgIcon>
                    </div>
                </div>
                <div class="flex-1 flex justify-end items-center text-theme-base space-x-6">
                    <!-- 音量 -->
                    <div class="flex justify-around items-center space-x-2">
                        <div>
                            <SvgIcon name="volume-low" size="18"></SvgIcon>
                        </div>
                        <div
                            class="w-32 h-1 rounded-lg relative bg-theme-baseSecond transition-all duration-300 ease-linear"
                        >
                            <!-- 进度 -->
                            <div
                                class="bg-theme-baseActive h-full rounded-lg"
                                :style="{ width: toPercent(sliderVolume.x.value) }"
                            ></div>
                            <!-- 圆点 -->
                            <div
                                class="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 bg-theme-baseActive w-3 h-3 rounded-full shadow-lg cursor-pointer"
                                @mousedown="sliderVolume.handleSlide"
                                :style="{ left: toPercent(sliderVolume.x.value) }"
                            ></div>
                        </div>
                        <div>
                            <SvgIcon name="volume-high" size="18"></SvgIcon>
                        </div>
                    </div>
                    <!-- 显示播放器 -->
                    <div
                        class="flex items-center justify-center rotate-90 cursor-pointer w-9 h-9 rounded-lg hover:bg-theme-baseSecond hover:bg-opacity-50"
                        @click="handleOpenPlayer"
                    >
                        <SvgIcon name="back" size="32"></SvgIcon>
                    </div>
                </div>
            </div>
        </div>
    </transition>
</template>

<script setup lang="ts">
import { toPercent } from '@utils/format'
import { usePlay } from '@utils/player/usePlayer'
import bus from '@utils/eventBus'
const {
    isPlaying,
    playOrPause,
    nextOrPrePlay,
    sliderVolume,
    sliderProgress,
    showPlayer,
    currentTrack
} = usePlay()
const handleOpenPlayer = () => {
    bus.$emit('openPlayer')
}
</script>

<style scoped lang="postcss">
.player-out-enter-active,
.player-out-leave-active {
    @apply translate-y-0;
}
.player-out-enter-from,
.player-out-leave-to {
    @apply translate-y-full;
}
</style>
