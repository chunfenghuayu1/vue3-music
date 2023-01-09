<template>
    <div class="mt-16">
        <h3 class="text-3xl text-theme-base font-semibold mb-5">私人推荐</h3>
        <div class="grid grid-cols-2 gap-x-6">
            <!-- 每日推荐 -->
            <div
                class="h-52 rounded-2xl bg-no-repeat bg-top animate-move-y flex items-center justify-between min-w-max cursor-pointer shadow-lg select-none"
                :style="{ backgroundImage: `url(${$imgUrl(picUrl, 400)})`, backgroundSize: '100%' }"
                @click="$router.push({ name: 'dailySong' })"
            >
                <div
                    class="grid grid-cols-2 gap-y-1 text-6xl font-semibold text-white text-opacity-90 w-36 mx-4"
                >
                    <p class="flex justify-center items-center">每</p>
                    <p class="flex justify-center items-center">日</p>
                    <p class="flex justify-center items-center">推</p>
                    <p class="flex justify-center items-center">荐</p>
                </div>
            </div>
            <!-- 私人fm -->
            <div
                class="h-52 rounded-2xl flex px-4 space-x-4 shadow-lg"
                :style="{ backgroundColor: bgColor }"
            >
                <div class="align-middle h-full py-4 flex-shrink-0">
                    <img
                        class="h-full rounded-2xl"
                        :src="MySong.personalFM.picUrl"
                        loading="lazy"
                    />
                </div>
                <div class="py-4 flex flex-col justify-between w-full">
                    <div>
                        <h3
                            class="font-semibold text-3xl text-white line-clamp-1"
                            :title="MySong.personalFM.name"
                        >
                            {{ MySong.personalFM.name }}
                        </h3>
                        <div class="text-white opacity-70 mt-2">
                            <template
                                v-for="(item, index) in MySong.personalFM.artists"
                                :key="index"
                            >
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
                                title="不喜欢"
                                class="cursor-pointer hover:bg-white rounded-lg hover:bg-opacity-10 p-1.5 transition-all duration-300"
                                @click="trashFM(MySong.personalFM.id)"
                            >
                                <SvgIcon name="thumbs-down" size="24" class="text-white"></SvgIcon>
                            </div>
                            <div
                                title="播放"
                                class="cursor-pointer hover:bg-white rounded-lg hover:bg-opacity-10 p-0.5 transition-all duration-300"
                                @click="playFM(MySong.personalFM.id, togglePlay)"
                            >
                                <SvgIcon
                                    name="playfill"
                                    v-if="togglePlay"
                                    size="32"
                                    class="text-white"
                                ></SvgIcon>
                                <SvgIcon name="pause" size="32" class="text-white" v-else></SvgIcon>
                            </div>
                            <div
                                title="下一首"
                                class="cursor-pointer hover:bg-white rounded-lg hover:bg-opacity-10 p-1 transition-all duration-300"
                                @click="nextFM"
                            >
                                <SvgIcon
                                    name="playforwardfill"
                                    size="28"
                                    class="text-white"
                                ></SvgIcon>
                            </div>
                        </div>
                        <div class="flex items-center space-x-2 text-white opacity-30 select-none">
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
import * as Vibrant from 'node-vibrant/dist/vibrant.worker.min.js'
import type { ComponentInternalInstance } from 'vue'

const { proxy } = getCurrentInstance() as ComponentInternalInstance
const localStore = useLocalStore()
const MySong = useMySong()

// 每日推荐背景图（需要登录）

// 未登录则展示默认图片
const imgTemp = ref<string[]>([
    'https://p4.music.126.net/u0m8olOKfHHLKsWidtuQCw==/109951167732746957.jpg',
    'https://p3.music.126.net/JE3DYh_gqRIiAyhWAEWRjw==/109951167596992903.jpg',
    'https://p3.music.126.net/t05hLDCz72CkGkH6XcOUfA==/109951167606527269.jpg'
])
const picUrl = computed<string>(() => {
    if (localStore.loginStatus && MySong.dailySongs.length > 0) {
        return MySong.dailySongs[0].al.picUrl
    } else {
        return `${sample(imgTemp.value)}?param=512y512`
    }
})
// 获取图片背景色
const bgColor = ref('')
watchEffect(() => {
    if (MySong.personalFM.picUrl) {
        Vibrant.from(MySong.personalFM.picUrl, { colorCount: 1 })
            .getPalette()
            // ts自动推断
            .then((palette: { Vibrant: { _rgb: { toString: () => any } } }) => {
                bgColor.value = `rgb(${palette.Vibrant._rgb.toString()})`
            })
    }
})
// FM操作
// 控制播放暂停切换
const togglePlay = ref(true)
// 放入垃圾桶
const trashFM = (id: number) => {
    MySong.getUserPersonalFM()
    proxy?.$http.reqTrashFM({ id })
}
// 播放
// 暂停
const playFM = (id: number, flag: boolean) => {
    if (flag) {
        console.log(id, '播放')
        togglePlay.value = false
    } else {
        console.log(id, '暂停')
        togglePlay.value = true
    }
}

// 下一首
const nextFM = async () => {
    await MySong.getUserPersonalFM()
    playFM(MySong.personalFM.id, true)
    console.log(MySong.personalFM.name)
}

onMounted(() => {
    MySong.getUserPersonalRecom()
    MySong.getUserPersonalFM()
})
</script>

<style lang="postcss"></style>
