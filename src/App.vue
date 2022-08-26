<template>
    <NavBar></NavBar>
    <main id="main" class="pt-16 pb-24 px-vw lg:px-10 fixed inset-0 overflow-auto">
        <router-view v-slot="{ Component }">
            <transition name="fade-route">
                <keep-alive include="Home,Explore,My">
                    <component :is="Component"></component>
                </keep-alive>
            </transition>
        </router-view>
    </main>
</template>

<script setup>
import { useStorageStore } from '@/store/Storage.js'
import { useMySongs } from '@/store/MySongs.js'

// 初始化本地存储
const MySongs = useMySongs()
// 初始化my数据

onMounted(() => {
    MySongs.getUserPlayList()
    useStorageStore()
})
</script>

<style lang="postcss"></style>
