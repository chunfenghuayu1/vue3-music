<template>
    <div class="fixed top-0 left-0 right-0 bottom-0 z-50 flex justify-center items-center">
        <!-- 模糊效果 -->
        <div class="absolute top-0 bottom-0 left-0 right-0">
            <div
                class="w-full h-full backdrop-saturate-150 backdrop-blur-3xl"
                :style="{
                    background: 'rgb(34,34,34,0.7)'
                }"
            ></div>
            <img
                :src="$imgUrl(currentTrack.al.picUrl, 512)"
                class="absolute top-0 bottom-0 left-0 right-0 object-cover w-full h-full -z-10"
            />
        </div>
        <!-- 界面 -->
        <div class="w-full h-full z-10 flex items-center text-white space-x-16 px-10">
            <div class="flex-1 flex justify-end">
                <div class="py-20">
                    <!-- 图片 -->
                    <div
                        :style="{ width: '54vh', height: '54vh' }"
                        class="flex justify-center items-center"
                    >
                        <img
                            :src="$imgUrl(currentTrack.al.picUrl, 512)"
                            class="object-cover rounded-xl shadow-xl"
                        />
                    </div>
                    <!-- 操作区域 -->
                    <div class="select-none">
                        <!-- 歌曲信息 -->
                        <div class="mt-8">
                            <div class="flex justify-between text-white text-md">
                                <div class="font-semibold" v-text="currentTrack.name"></div>
                                <div class="text-white">顺序播放</div>
                            </div>
                            <div class="opacity-80 flex justify-start">
                                <p v-for="(item, index) in currentTrack.ar" :key="item.id">
                                    <span v-if="index !== 0">&nbsp;/&nbsp;</span>
                                    <span v-text="item.name"></span>
                                </p>
                            </div>
                        </div>
                        <!-- 进度 -->
                        <div class="h-8 flex flex-col justify-center progress mt-4">
                            <div
                                class="bg-white w-full bg-opacity-20 h-1.5 rounded-lg overflow-hidden"
                                @mousedown="sliderProgress.handleSlide"
                            >
                                <div
                                    class="bg-white h-full bg-opacity-80 transition-all"
                                    :style="{ width: toPercent(sliderProgress.x.value) }"
                                ></div>
                            </div>
                            <div
                                class="flex justify-between items-center text-sm mt-1 text-white text-opacity-20 select-none h-4"
                            >
                                <div>{{ forminute(Math.round(progress) * 1000) }}</div>
                                <div>-{{ forminute(Math.round(remainProgress) * 1000) }}</div>
                            </div>
                        </div>
                        <!-- 操作 -->
                        <div class="flex justify-around items-center my-8 text-white select-none">
                            <div class="rounded-full active:scale-90 transition-all cursor-pointer">
                                <SvgIcon
                                    name="playback"
                                    size="40"
                                    @click="nextOrPrePlay('pre')"
                                ></SvgIcon>
                            </div>
                            <div class="rounded-full active:scale-90 transition-all cursor-pointer">
                                <SvgIcon
                                    :name="isPlaying ? 'pause' : 'playfill'"
                                    size="40"
                                    @click="playOrPause"
                                ></SvgIcon>
                            </div>
                            <div class="rounded-full active:scale-90 transition-all cursor-pointer">
                                <SvgIcon
                                    name="playforward"
                                    size="40"
                                    @click="nextOrPrePlay('next')"
                                ></SvgIcon>
                            </div>
                        </div>
                        <!-- 音量 -->
                        <div class="flex justify-between items-center h-8 volume">
                            <div>
                                <SvgIcon
                                    name="volume-low"
                                    size="18"
                                    class="fill-current opacity-80 volume-left"
                                ></SvgIcon>
                            </div>
                            <div
                                class="bg-white w-4/5 bg-opacity-20 h-1.5 rounded-lg relative volume-mid flex items-center overflow-hidden"
                                @mousedown="sliderVolume.handleSlide"
                            >
                                <!-- 进度 -->
                                <div
                                    class="bg-white w-1/2 h-full bg-opacity-80 transition-all"
                                    :style="{ width: toPercent(sliderVolume.x.value) }"
                                ></div>
                            </div>
                            <div>
                                <SvgIcon
                                    name="volume-high"
                                    size="18"
                                    class="fill-current opacity-80 volume-right"
                                ></SvgIcon>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="flex-1 flex flex-col items-start h-full transition-all duration-300">
                <Lyric></Lyric>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import * as Vibrant from 'node-vibrant/dist/vibrant.worker.min.js'
import { forminute, toPercent } from '@utils/format'
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

let url = 'https://p1.music.126.net/eo9_AxfxdR0D-ZLhvOEF1Q==/109951163766465119.jpg?param=1024y1024'
// 获取图片背景色
const bgColor = ref('')
watchEffect(() => {
    // MySong.personalFM.picUrl
    // if (MySong.personalFM.picUrl) {
    Vibrant.from(url, {
        colorCount: 1
    })
        .getPalette()
        // ts自动推断
        .then(
            (palette: {
                LightVibrant: { _rgb: { toString: () => any } }
                Vibrant: { _rgb: { toString: () => any } }
            }) => {
                bgColor.value = `linear-gradient(to top left, rgb(${palette.Vibrant._rgb.toString()}), rgb(${palette.LightVibrant._rgb.toString()}))`
            }
        )
    // }
})
</script>

<style lang="postcss" scoped>
.progress {
    div,
    & > div > div {
        transition: all 0.1s cubic-bezier(0.12, 0.63, 0.74, 0.41);
    }

    &:hover {
        & > div:first-child {
            height: 12px;
        }
        div:last-child {
            opacity: 1;
            color: white;
        }
    }
}
.volume {
    div,
    div > svg {
        transition: all 0.1s cubic-bezier(0.12, 0.63, 0.74, 0.41);
    }
    &:hover {
        .volume-left,
        .volume-right {
            scale: 1.2;
        }
        .volume-mid {
            height: 12px;
        }
    }
}

:deep(.el-scrollbar__thumb) {
    background-color: transparent;
}
</style>
