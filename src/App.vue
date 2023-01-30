<template>
    <el-scrollbar
        height="100vh"
        ref="scrollbarRef"
        :class="IS_ELECTRON ? 'mt-8' : ''"
        view-class="bg-theme-base transition-all duration-300 ease-linear"
    >
        <NavBar></NavBar>
        <div class="px-10vw lg:px-10 pt-10 pb-32">
            <router-view v-slot="{ Component }">
                <transition name="fade-route" mode="out-in">
                    <keep-alive :include="['Home', 'My', 'LikeSongs']">
                        <component :is="Component"></component>
                    </keep-alive>
                </transition>
            </router-view>
        </div>
    </el-scrollbar>
    <PlayerDrag v-if="false"></PlayerDrag>
    <component :is="Player" v-if="false"></component>
    <component :is="PlayerBar" v-if="false"></component>
</template>
<script setup lang="ts">
import NavBar from './components/NavBar.vue'
import PlayerDrag from './components/Player/PlayerDrag.vue'
import Player from './components/Player/Player.vue'
import PlayerBar from './components/Player/PlayerBar.vue'

import { IS_ELECTRON, exitTypeSwitch } from './utils/myAPI'

import { ElScrollbar } from 'element-plus'
import 'element-plus/es/components/scrollbar/style/css'

import { useLocalStore } from '@/stores/localStore'

const localStore = useLocalStore()

const scrollbarRef = ref<InstanceType<typeof ElScrollbar>>()
provide('scroll', scrollbarRef)
const route = useRoute()

if (IS_ELECTRON) {
    document.documentElement.style.overflow = 'hidden'
}

exitTypeSwitch((e: any, arg: 'confirm' | 'minimize' | 'quit') => {
    console.log(e, arg)
    localStore.switchDialog(arg)
})
// 解决页面回到顶部的问题
watch(
    () => route.path,
    () => {
        setTimeout(() => {
            scrollbarRef.value?.scrollTo({ top: 0 })
        }, 240)
    }
)
</script>
<style lang="postcss">
.el-scrollbar__bar {
    z-index: 40;
}
.fade-route-enter-active,
.fade-route-leave-active {
    @apply transition-opacity duration-200 ease-linear;
}
.fade-route-enter-from,
.fade-route-leave-to {
    @apply opacity-0;
}
</style>
