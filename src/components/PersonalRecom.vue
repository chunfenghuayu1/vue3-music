<template>
    <div class="mt-16">
        <h3 class="text-3xl font-semibold mb-5">私人推荐</h3>
        <div class="grid grid-cols-2 gap-x-6">
            <!-- 每日推荐 -->
            <div
                class="h-52 rounded-lg bg-no-repeat bg-top animate-move-y flex items-center justify-between min-w-max cursor-pointer shadow-lg"
                :style="{ backgroundImage: `url(${$imgUrl(picUrl, 400)})`, backgroundSize: '100%' }"
            >
                <div class="grid grid-cols-2 gap-y-1 text-6xl font-semibold text-white w-36 mx-4">
                    <p class="flex justify-center items-center">每</p>
                    <p class="flex justify-center items-center">日</p>
                    <p class="flex justify-center items-center">推</p>
                    <p class="flex justify-center items-center">荐</p>
                </div>
            </div>
            <!-- 私人fm -->
            <div class="h-52 rounded-lg bg-red-400 flex px-4 space-x-4 shadow-lg">
                <div class="align-middle h-full py-4 flex-shrink-0">
                    <img
                        class="h-full rounded-lg"
                        src="https://p2.music.126.net/em_fXgUJDApoV_3_8HYkNg==/109951164362973668.jpg?param=512y512"
                    />
                </div>
                <div class="py-4 flex flex-col justify-between w-full">
                    <div>
                        <h3 class="font-semibold text-3xl text-white">爱似水仙</h3>
                        <div class="text-white opacity-70 mt-2">
                            <span class="cursor-pointer hover:underline">苏星婕</span>
                        </div>
                    </div>
                    <div class="flex justify-between items-center space-x-4">
                        <div class="flex items-center space-x-4">
                            <div
                                class="cursor-pointer hover:bg-white rounded-lg hover:bg-opacity-10 p-0.5 transition-all duration-300"
                            >
                                <SvgIcon name="playfill" size="32" class="text-white"></SvgIcon>
                            </div>
                            <div
                                class="cursor-pointer hover:bg-white rounded-lg hover:bg-opacity-10 p-1 transition-all duration-300"
                            >
                                <SvgIcon
                                    name="playforwardfill"
                                    size="28"
                                    class="text-white"
                                ></SvgIcon>
                            </div>
                        </div>
                        <div
                            class="flex items-center space-x-2 text-white opacity-30 select-none flex-shrink-0"
                        >
                            <SvgIcon name="radio" size="26"></SvgIcon>
                            <p class="font-semibold">私人FM</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useLocalStore } from '@/stores/localStore'
import { useMySong } from '@/stores/MySong'
import { sample } from 'lodash-es'
const localStore = useLocalStore()
const mySong = useMySong()

// 每日推荐背景图（需要登录）

// 未登录则展示默认图片
const imgTemp = ref<string[]>([
    'https://p4.music.126.net/u0m8olOKfHHLKsWidtuQCw==/109951167732746957.jpg',
    'https://p3.music.126.net/JE3DYh_gqRIiAyhWAEWRjw==/109951167596992903.jpg',
    'https://p3.music.126.net/t05hLDCz72CkGkH6XcOUfA==/109951167606527269.jpg'
])
const picUrl = computed<string>(() => {
    if (localStore.loginStatus && mySong.dailySongs.length > 0) {
        return mySong.dailySongs[0].al.picUrl
    } else {
        return `${sample(imgTemp.value)}?param=512y512`
    }
})
mySong.getUserPersonalRecom()
</script>

<style lang="postcss"></style>
