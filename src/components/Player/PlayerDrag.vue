<template>
    <!--  backgroundColor: 'rgb(34,34,34,0.7)'  -->
    <div
        class="w-80 h-60 z-40 absolute backdrop-saturate-150 backdrop-blur-lg rounded-xl select-none text-white shadow-xl"
        :style="{ right: '20px', bottom: '20px', backgroundColor: 'rgb(34,34,34,0.7)' }"
    >
        <!-- 拖拽区域 -->
        <div v-drag class="h-4 w-full cursor-move"></div>
        <div class="flex flex-col h-full px-4">
            <!-- 标题显示 -->
            <div class="flex items-center">
                <div class="w-24 h-24">
                    <img
                        class="rounded-lg align-middle object-cover shadow-lg"
                        :src="$imgUrl(currentTrack.al.picUrl, 96)"
                    />
                </div>
                <div class="flex flex-col flex-1 px-2">
                    <div class="font-semibold" v-text="currentTrack.name"></div>
                    <div class="text-sm opacity-80">
                        <p v-for="(item, index) in currentTrack.ar" :key="item.id">
                            <span v-if="index !== 0"> / </span>
                            <span v-text="item.name"></span>
                        </p>
                    </div>
                </div>
                <div class="opacity-20 hover:opacity-80 transition-opacity cursor-pointer">
                    <SvgIcon name="expand" size="20"></SvgIcon>
                </div>
            </div>
            <!-- 进度条 -->
            <div class="mt-4">
                <div class="bg-white w-full bg-opacity-20 h-1 rounded-lg relative">
                    <!-- 进度 -->
                    <div
                        class="bg-white w-2/3 h-full bg-opacity-80 rounded-lg"
                        :style="{ width: toPercent(sliderProgress.x.value) }"
                    ></div>
                    <!-- 圆点 -->
                    <div
                        class="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white w-2 h-2 rounded-full shadow-lg hover:w-4 hover:h-4 cursor-pointer"
                        @mousedown="sliderProgress.handleSlide"
                        :style="{
                            left: toPercent(sliderProgress.x.value),
                            transition:
                                'width 0.1s cubic-bezier(0.12, 0.63, 0.74, 0.41),height 0.1s cubic-bezier(0.12, 0.63, 0.74, 0.41)'
                        }"
                    ></div>
                </div>
                <div
                    class="flex justify-between items-center text-xs mt-1 text-white text-opacity-20"
                >
                    <div>{{ forminute(Math.round(progress) * 1000) }}</div>
                    <div>-{{ forminute(Math.round(remainProgress) * 1000) }}</div>
                </div>
            </div>
            <!-- 操作区 -->
            <div class="flex justify-around items-center mt-2">
                <div class="active:opacity-20 active:scale-95 transition-all cursor-pointer">
                    <SvgIcon name="playback" size="32" @click="nextOrPrePlay('pre')"></SvgIcon>
                </div>
                <div class="active:opacity-20 active:scale-95 transition-all cursor-pointer">
                    <SvgIcon
                        :name="isPlaying ? 'pause' : 'playfill'"
                        size="32"
                        @click="playOrPause"
                    ></SvgIcon>
                </div>
                <div class="active:opacity-20 active:scale-95 transition-all cursor-pointer">
                    <SvgIcon name="playforward" size="32" @click="nextOrPrePlay('next')"></SvgIcon>
                </div>
            </div>
            <!-- 音量 -->
            <div class="flex justify-around items-center mt-4 space-x-2">
                <div>
                    <SvgIcon name="volume-low" size="18" class="fill-current opacity-20"></SvgIcon>
                </div>
                <div class="bg-white w-4/5 bg-opacity-20 h-1 rounded-lg relative">
                    <!-- 进度 -->
                    <div
                        class="bg-white h-full bg-opacity-80 rounded-lg"
                        :style="{ width: toPercent(sliderVolume.x.value) }"
                    ></div>
                    <!-- 圆点 -->
                    <div
                        class="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white w-4 h-4 rounded-full shadow-lg cursor-pointer"
                        @mousedown="sliderVolume.handleSlide"
                        :style="{ left: toPercent(sliderVolume.x.value) }"
                    ></div>
                </div>
                <div>
                    <SvgIcon name="volume-high" size="18" class="fill-current opacity-20"></SvgIcon>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { toPercent, forminute } from '@utils/format'
import { usePlay } from '@utils/player/usePlayer'
const {
    isPlaying,
    playOrPause,
    nextOrPrePlay,
    progress,
    sliderVolume,
    sliderProgress,
    remainProgress,
    currentTrack
} = usePlay()
</script>

<style scoped lang="postcss"></style>
