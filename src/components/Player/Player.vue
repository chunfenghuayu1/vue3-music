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
            <div
                class="w-full h-full z-10 flex items-center justify-center text-white space-x-16 px-10 transition-all duration-500"
            >
                <div
                    class="flex justify-end flex-1 transition-all duration-300"
                    :class="{
                        '!justify-center': lyric.length === 0
                    }"
                >
                    <div class="">
                        <!-- 图片 -->
                        <div
                            :style="{ width: '54vh', height: '54vh' }"
                            class="flex justify-center items-center"
                        >
                            <img
                                :src="$imgUrl(currentTrack.al.picUrl, 512)"
                                class="w-full h-full object-cover rounded-xl shadow-xl transition duration-300 origin-center"
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
                                <div class="flex justify-between items-center text-white text-md">
                                    <div
                                        class="font-semibold text-2xl line-clamp-1 w-1/2"
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
                                    <div>{{ forminute(Math.round(currentTime) * 1000) }}</div>
                                    <div>-{{ forminute(Math.round(remainDuration) * 1000) }}</div>
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
                <!-- 歌词 -->
                <div
                    class="flex flex-1 flex-col h-full transition-all duration-300"
                    v-if="lyric.length > 0"
                >
                    <el-scrollbar class="pr-16 my-12" ref="scrollbar">
                        <div :style="{ marginTop: '40vh', marginBottom: '40vh' }">
                            <span
                                ref="spans"
                                v-for="(item, index) in lyric"
                                :key="index"
                                class="flex font-bold select-none text-3xl p-4 rounded-xl scale-90 opacity-30 transition-all duration-500 origin-left"
                                :class="{
                                    '!scale-100 !opacity-80': currentIndex === index,
                                    'hover:bg-white hover:bg-opacity-10': item.lyric !== ''
                                }"
                                @click="playCurrent(item.time)"
                            >
                                {{ item.lyric }}
                            </span>
                        </div>
                    </el-scrollbar>
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
import { ElScrollbar } from 'element-plus'
import type { ComponentInternalInstance } from 'vue'
const { proxy } = getCurrentInstance() as ComponentInternalInstance
const {
    isPlaying,
    playOrPause,
    nextOrPrePlay,
    currentTime,
    sliderVolume,
    sliderProgress,
    remainDuration,
    currentTrack,
    playType,
    disLikeFM,
    playCurrent
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
        if (playerImg.value) {
            playerImg.value.onchange = () => {
                console.log(33)
            }
            playerImg.value.onload = () => {
                timer.value = window.setTimeout(() => {
                    flag.value = false
                }, 800)
            }
        }
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

/**
 * 歌词
 */
interface Lyric {
    time: number
    lyric: any
}
const scrollbar = ref<InstanceType<typeof ElScrollbar>>()
const spans = ref<HTMLElement[]>()
// 歌词获取
const lyric = ref<Lyric[]>([])
watch(
    () => currentTrack.value.id,
    () => {
        proxy?.$http.reqLyric({ id: currentTrack.value.id, timestamp: +new Date() }).then(res => {
            lyric.value = []
            if (res.lrc) {
                const reg = /\[([^\]]+)\]([^[]+)/g
                let arr: { time: number; lyric: any }[] = []
                res.lrc.lyric.replace(reg, ($0: any, $1: string, $2: string) => {
                    arr.push({
                        time: formatTime($1),
                        lyric: $2.replace('\n', '')
                    })
                })
                // 过滤空内容
                lyric.value = arr.filter(item => item.lyric !== '')
            }
        })
    }
)

const formatTime = (value: string): number => {
    const res = value.split(':')
    return Number((Number(res[0]) * 60 + Number(res[1])).toFixed(3))
}
// 歌词当前索引
const currentIndex = ref(-1)
watch(
    () => currentTime.value,
    () => {
        if (lyric.value.length > 0) {
            currentIndex.value = lyric.value.findIndex((item, index) => {
                if (index === 0) {
                    return currentTime.value < lyric.value[index + 1].time
                }
                if (index === lyric.value.length - 1) {
                    return currentTime.value > item.time
                }
                return (
                    currentTime.value < lyric.value[index + 1].time &&
                    currentTime.value > lyric.value[index - 1].time
                )
            })
            if (scrollbar.value) {
                const scrollHeight = scrollbar.value.wrapRef?.offsetHeight

                if (spans.value && scrollHeight) {
                    scrollbar.value.scrollTo({
                        top: spans.value[currentIndex.value].offsetTop - scrollHeight / 3,
                        behavior: 'smooth'
                    })
                }
            }
        }
    }
)
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
