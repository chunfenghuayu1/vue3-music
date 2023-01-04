<template>
    <nav
        class="fixed z-10 top-0 h-16 min-w-max w-full px-10vw lg:px-10 bg-white flex items-center justify-center transition-all duration-300 ease-linear bg-opacity-80 backdrop-saturate-180 backdrop-blur-lg"
    >
        <div class="flex items-center flex-1 space-x-4 lg:space-x-2">
            <button class="hover:bg-gray-200 rounded-lg active:scale-90 transition-all p-0.5">
                <SvgIcon name="back" size="32" color="#000"></SvgIcon>
            </button>
            <button class="hover:bg-gray-200 rounded-lg active:scale-90 transition-all p-0.5">
                <SvgIcon name="forward" size="32" color="#000"></SvgIcon>
            </button>
        </div>
        <div class="flex flex-1 flex-shrink-0 justify-center items-center">
            <router-link
                to="/"
                class="mx-4 my-1 px-2 py-1 text-lg font-bold active:scale-95 rounded-md"
                :class="$route.name === 'home' ? 'text-green-500' : ''"
                >首页</router-link
            >
            <router-link
                to="/explore"
                class="mx-4 my-1 px-2 py-1 text-lg font-bold active:scale-95 rounded-md"
                :class="$route.name === 'explore' ? 'text-green-500' : ''"
                >发现</router-link
            >
            <router-link
                to="/my"
                class="mx-4 my-1 px-2 py-1 text-lg font-bold active:scale-95 rounded-md"
                :class="$route.name === 'my' ? 'text-green-500' : ''"
                >我的</router-link
            >
        </div>
        <div class="flex flex-1 items-center justify-end min-w-max space-x-5">
            <SearchInput></SearchInput>
            <SwitchTheme></SwitchTheme>
            <el-avatar
                fit="cover"
                class="select-none cursor-pointer"
                :src="localStore.data.user.avatarUrl || avatar"
            >
            </el-avatar>
        </div>
    </nav>
</template>

<script setup lang="ts">
import SearchInput from './SearchInput.vue'
import SwitchTheme from './SwitchTheme.vue'

import avatar from '@/assets/img/avatar.png'
import { useLocalStore } from '@/stores/localStore'
const localStore = useLocalStore()
</script>

<style scoped lang="postcss"></style>
