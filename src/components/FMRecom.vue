<template>
    <!-- 私人fm -->
    <div
        class="h-52 rounded-2xl flex px-4 space-x-4 shadow-lg"
        :style="{ backgroundColor: bgColor }"
    >
        <div class="align-middle h-full py-4 flex-shrink-0">
            <img
                class="h-full rounded-2xl shadow-xl transition duration-300"
                :src="$imgUrl(FMTrack.al.picUrl, 512)"
                loading="lazy"
                :class="isPlaying && playType === 'fm' ? 'hover:scale-95' : 'scale-95'"
                draggable="false"
            />
        </div>
        <div class="py-4 flex flex-col justify-between w-full">
            <div>
                <h3 class="font-semibold text-3xl text-white line-clamp-1" :title="FMTrack.name">
                    {{ FMTrack.name }}
                </h3>
                <div class="text-white opacity-70 mt-2">
                    <template v-for="(item, index) in FMTrack.ar" :key="index">
                        <span v-if="index !== 0"> / </span>
                        <router-link
                            :to="{ name: 'artist', params: { id: item.id } }"
                            class="cursor-pointer hover:underline"
                            :title="item.name"
                            >{{ item.name }}</router-link
                        >
                    </template>
                </div>
            </div>
            <div class="flex justify-between items-center space-x-4">
                <div class="flex items-center space-x-4">
                    <div
                        title="添加音乐黑名单"
                        class="cursor-pointer hover:bg-white rounded-lg hover:bg-opacity-10 p-1.5 transition-all duration-300"
                        @click="disLikeFM"
                    >
                        <SvgIcon name="thumbs-down" size="24" class="text-white"></SvgIcon>
                    </div>
                    <div
                        title="播放"
                        class="cursor-pointer hover:bg-white rounded-lg hover:bg-opacity-10 p-0.5 transition-all duration-300"
                    >
                        <SvgIcon
                            name="playfill"
                            v-if="!isFMPlaying"
                            size="32"
                            class="text-white"
                            @click="handleFMPlay"
                        ></SvgIcon>
                        <SvgIcon
                            name="pause"
                            size="32"
                            class="text-white"
                            @click="playOrPause"
                            v-else
                        ></SvgIcon>
                    </div>
                    <div
                        title="下一首"
                        class="cursor-pointer hover:bg-white rounded-lg hover:bg-opacity-10 p-1 transition-all duration-300"
                        @click="FMPlayNext"
                    >
                        <SvgIcon name="playforwardfill" size="28" class="text-white"></SvgIcon>
                    </div>
                </div>
                <div class="flex items-center space-x-2 text-white opacity-30 select-none">
                    <SvgIcon name="radio" size="26"></SvgIcon>
                    <p class="font-semibold">私人FM</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import * as Vibrant from 'node-vibrant/dist/vibrant.worker.min.js'
import { usePlay } from '@utils/player/usePlayer'
const {
    isPlaying,
    playType,
    FMTrack,
    isFMPlaying,
    handleFMPlay,
    FMPlayNext,
    disLikeFM,
    playOrPause
} = usePlay()

// 获取图片背景色
const bgColor = ref('')
watchEffect(() => {
    if (FMTrack.value.al.picUrl) {
        Vibrant.from(FMTrack.value.al.picUrl, { colorCount: 1 })
            .getPalette()
            // ts自动推断
            .then((palette: { Vibrant: { _rgb: { toString: () => any } } }) => {
                bgColor.value = `rgb(${palette.Vibrant._rgb.toString()})`
            })
    }
})
</script>

<style lang="postcss"></style>
