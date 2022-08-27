<template>
    <div>
        <h3 class="text-3xl font-bold mb-5">{{ $t.home.personlized }}</h3>
        <div
            class="h-52 rounded-lg bg-no-repeat bg-top animate-move-y flex items-center justify-between min-w-max cursor-pointer shadow-lg"
            :style="{ backgroundImage: `url(${picUrl})`, backgroundSize: '100%' }"
        >
            <div class="grid grid-cols-2 gap-y-1 text-6xl font-semibold text-white w-36 mx-4">
                <p class="flex justify-center items-center">每</p>
                <p class="flex justify-center items-center">日</p>
                <p class="flex justify-center items-center">推</p>
                <p class="flex justify-center items-center">荐</p>
            </div>
            <div class="flex items-end h-full px-4 py-4">
                <div
                    class="backdrop-saturate-180 backdrop-blur-md rounded-full p-2 bg-white bg-opacity-20 hover:bg-opacity-30 transition-all active:scale-90"
                >
                    <SvgIcon name="play" size="40" class="text-white"></SvgIcon>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { sample } from 'lodash'

// 每日推荐背景图（需要登录）

// 未登录则展示默认图片
const picUrl = computed(() => {
    let img = [
        'https://p4.music.126.net/u0m8olOKfHHLKsWidtuQCw==/109951167732746957.jpg',
        'https://p3.music.126.net/JE3DYh_gqRIiAyhWAEWRjw==/109951167596992903.jpg',
        'https://p3.music.126.net/t05hLDCz72CkGkH6XcOUfA==/109951167606527269.jpg'
    ]
    return `${sample(img)}?param=512y512`
})
</script>

<style lang="postcss"></style>
