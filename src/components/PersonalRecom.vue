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
            <FMRecom></FMRecom>
        </div>
    </div>
</template>

<script setup lang="ts">
import FMRecom from './FMRecom.vue'
import { useLocalStore } from '@stores/localStore'
import { useMySong } from '@stores/MySong'

const localStore = useLocalStore()
const MySong = useMySong()

// 每日推荐背景图（需要登录）

const picUrl = computed<string>(() => {
    if (localStore.loginStatus && MySong.dailySongs.length > 0) {
        return MySong.dailySongs[0].al.picUrl
    } else {
        return ''
    }
})

onMounted(() => {
    MySong.getUserPersonalRecom()
})
</script>

<style lang="postcss"></style>
