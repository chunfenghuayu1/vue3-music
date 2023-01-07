<template>
    <nav
        class="fixed z-10 top-0 h-16 min-w-max w-full px-10vw lg:px-10 flex items-center justify-center backdrop-saturate-150 backdrop-blur-lg transition-all duration-300 ease-linear bg-theme-base bg-opacity-80"
    >
        <div class="flex items-center flex-1 space-x-4 lg:space-x-2">
            <button
                class="hover:bg-gray-100 rounded-lg active:scale-90 transition p-0.5"
                @click="$router.go(-1)"
            >
                <SvgIcon name="back" size="32" class="text-theme-base fill-current"></SvgIcon>
            </button>
            <button
                class="hover:bg-gray-100 rounded-lg active:scale-90 transition p-0.5"
                @click="$router.go(1)"
            >
                <SvgIcon name="forward" size="32" class="text-theme-base fill-current"></SvgIcon>
            </button>
        </div>
        <div class="flex flex-1 flex-shrink-0 justify-center items-center">
            <router-link
                to="/"
                class="mx-4 my-1 px-2 py-1 text-lg font-bold active:scale-95 rounded-md"
                :class="$route.name === 'home' ? 'text-theme-baseActive' : 'text-theme-base'"
                >首页</router-link
            >
            <router-link
                :to="{ name: 'explore', query: { cat } }"
                class="mx-4 my-1 px-2 py-1 text-lg font-bold active:scale-95 rounded-md"
                :class="$route.name === 'explore' ? 'text-theme-baseActive' : 'text-theme-base'"
                >发现</router-link
            >
            <router-link
                to="/my"
                class="mx-4 my-1 px-2 py-1 text-lg font-bold active:scale-95 rounded-md"
                :class="$route.name === 'my' ? 'text-theme-baseActive' : 'text-theme-base'"
                >我的</router-link
            >
        </div>
        <div class="flex flex-1 items-center justify-end min-w-max space-x-5">
            <SearchInput></SearchInput>
            <SwitchTheme></SwitchTheme>
            <el-avatar
                fit="cover"
                class="select-none cursor-pointer"
                :src="localStore.avatarUrl || avatar"
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
const route = useRoute()
// 解决发现页面缓存路由信息的问题
const cat = ref('')
watch(
    () => route.query.cat,
    newVal => {
        if (newVal) {
            cat.value = newVal as string
        }
    }
)
</script>

<style scoped lang="postcss"></style>
