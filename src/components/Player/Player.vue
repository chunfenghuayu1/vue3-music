<template>
    <Transition name="player-up">
        <div
            class="fixed top-0 left-0 right-0 bottom-0 z-50 flex justify-center items-center"
            v-if="openPlayer"
        >
            <!-- 下拉按钮 -->
            <div class="absolute right-10 top-10 text-white z-50">
                <div
                    class="flex items-center justify-center -rotate-90 opacity-60 cursor-pointer w-10 h-10 rounded-lg hover:opacity-100 hover:bg-zinc-50 hover:bg-opacity-10"
                    @click="closePlayer"
                >
                    <SvgIcon name="back" size="36"></SvgIcon>
                </div>
            </div>
            <!-- 模糊效果 -->
            <div class="absolute top-0 bottom-0 left-0 right-0">
                <!-- :style="{
                    background: 'rgb(34,34,34,0.7)'
                }" -->

                <div
                    class="w-full h-full backdrop-saturate-150 backdrop-blur-3xl transition duration-300"
                    :style="{
                        background: 'rgb(34,34,34,0.7)'
                    }"
                ></div>
                <img
                    ref="playerImg"
                    :src="$imgUrl(currentTrack.al.picUrl, 512)"
                    class="absolute top-0 bottom-0 left-0 right-0 object-cover w-full h-full -z-10"
                    :class="{ fadeImg: flag }"
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
                                class="object-cover rounded-xl shadow-xl transition duration-300 origin-center"
                                draggable="false"
                                :class="{
                                    'scale-75': !isPlaying,
                                    'hover:scale-95': isPlaying
                                }"
                            />
                        </div>
                        <!-- 操作区域 -->
                        <div class="select-none">
                            <!-- 歌曲信息 -->
                            <div class="mt-8">
                                <div class="flex justify-between text-white text-md">
                                    <div
                                        class="font-semibold text-2xl line-clamp-1"
                                        v-text="currentTrack.name"
                                    ></div>
                                    <div class="text-white">顺序播放</div>
                                </div>
                                <div class="opacity-80 flex justify-start">
                                    <p v-for="(item, index) in currentTrack.ar" :key="item.id">
                                        <i v-if="index !== 0">&nbsp;/&nbsp;</i>
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
                            <div
                                class="flex justify-around items-center my-8 text-white select-none"
                            >
                                <div
                                    class="rounded-full active:scale-90 transition-all cursor-pointer"
                                >
                                    <SvgIcon
                                        name="playback"
                                        size="40"
                                        @click="nextOrPrePlay('pre')"
                                        v-if="playType !== 'fm'"
                                    ></SvgIcon>
                                    <SvgIcon
                                        name="thumbs-down"
                                        size="28"
                                        v-else
                                        @click="disLikeFM"
                                    ></SvgIcon>
                                </div>
                                <div
                                    class="rounded-full active:scale-90 transition-all cursor-pointer"
                                >
                                    <SvgIcon
                                        :name="isPlaying ? 'pause' : 'playfill'"
                                        size="40"
                                        @click="playOrPause"
                                    ></SvgIcon>
                                </div>
                                <div
                                    class="rounded-full active:scale-90 transition-all cursor-pointer"
                                >
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
    </Transition>
</template>

<script setup lang="ts">
import * as Vibrant from 'node-vibrant/dist/vibrant.worker.min.js'
import { forminute, toPercent } from '@utils/format'
import { usePlay } from '@utils/player/usePlayer'
import bus from '@utils/eventBus'
const {
    isPlaying,
    playOrPause,
    nextOrPrePlay,
    progress,
    sliderVolume,
    sliderProgress,
    remainProgress,
    currentTrack,
    playType,
    disLikeFM
} = usePlay()
// 获取图片背景色
const bgColor = ref('')
watchEffect(() => {
    // MySong.personalFM.picUrl
    // if (MySong.personalFM.picUrl) {
    Vibrant.from(currentTrack.value.al.picUrl, {
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

const flag = ref(false)
let timer = ref<number>()
const playerImg = ref<HTMLElement>()
watch(
    () => currentTrack.value.al.picUrl,
    () => {
        clearTimeout(timer.value)
        timer.value = 0
        flag.value = true
        playerImg.value?.addEventListener('load', () => {
            timer.value = window.setTimeout(() => {
                flag.value = false
            }, 800)
        })
    },
    {
        immediate: true
    }
)
const openPlayer = ref(false)
bus.$on('openPlayer', () => {
    openPlayer.value = !openPlayer.value
})

const closePlayer = () => {
    openPlayer.value = !openPlayer.value
}
onBeforeUnmount(() => {
    bus.$off('openPlayer')
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
.fadeImg {
    animation: fadeImg ease-in-out 0.8s forwards;
}
@keyframes fadeImg {
    0% {
        opacity: 0.25;
    }
    100% {
        opacity: 1;
    }
}
.player-up-enter-active,
.player-up-leave-active {
    @apply translate-y-0  transition duration-500;
}
.player-up-enter-from,
.player-up-leave-to {
    @apply translate-y-full;
}
</style>
