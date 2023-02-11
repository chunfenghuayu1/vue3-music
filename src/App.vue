<template>
    <el-scrollbar
        ref="scrollbarRef"
        height="100vh"
        :class="IS_ELECTRON ? 'mt-8 mb-8' : ''"
        wrap-class="bg-theme-base transition duration-300 ease-linear"
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
    <component :is="currentTab"></component>
    <Player></Player>
</template>
<script setup lang="ts">
import NavBar from '@components/NavBar.vue'
import PlayerDrag from '@components/Player/PlayerDrag.vue'
import Player from '@components/Player/Player.vue'
import PlayerBar from '@components/Player/PlayerBar.vue'

import { useMyAPI, IS_ELECTRON } from '@utils/electron/myAPI'

import { ElScrollbar } from 'element-plus'
import 'element-plus/es/components/scrollbar/style/css'

import { useLocalStore } from '@stores/localStore'

const scrollbarRef = ref<InstanceType<typeof ElScrollbar>>()
provide('scroll', scrollbarRef)
document.documentElement.style.overflow = 'hidden'
const localStore = useLocalStore()
const { exitTypeSwitch } = useMyAPI()
exitTypeSwitch((e, arg) => {
    localStore.switchDialog(arg)
})

const route = useRoute()
// 解决页面回到顶部的问题
watch(
    () => route.path,
    () => {
        setTimeout(() => {
            scrollbarRef.value?.scrollTo({ top: 0 })
        }, 240)
    }
)
// 动态组件
const currentTab = computed(() => {
    if (localStore.settings.switchPlayer === '卡片') {
        return markRaw(PlayerDrag)
    }
    if (localStore.settings.switchPlayer === '底部') {
        return markRaw(PlayerBar)
    }
})
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
