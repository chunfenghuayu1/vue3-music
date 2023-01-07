<template>
    <el-scrollbar height="100vh" ref="scrollbarRef">
        <div>测试111</div>
        <NavBar></NavBar>
        <div class="px-10vw lg:px-10 py-16">
            <router-view v-slot="{ Component }">
                <transition name="fade-route" mode="out-in">
                    <keep-alive :include="['Home', 'My']">
                        <component :is="Component"></component>
                    </keep-alive>
                </transition>
            </router-view>
        </div>
    </el-scrollbar>
</template>
<script setup lang="ts">
import NavBar from './components/NavBar.vue'

import { ElScrollbar } from 'element-plus'
import 'element-plus/es/components/scrollbar/style/css'
const scrollbarRef = ref<InstanceType<typeof ElScrollbar>>()
provide('scroll', scrollbarRef)
const route = useRoute()
// 解决页面回到顶部的问题
watch(
    () => route.path,
    () => {
        setTimeout(() => {
            scrollbarRef.value?.scrollTo({ top: 0 })
        }, 200)
    }
)
</script>
<style lang="postcss">
.el-scrollbar__bar {
    z-index: 20;
}
.fade-route-enter-active,
.fade-route-leave-active {
    @apply transition-opacity duration-150 ease-in-out;
}
.fade-route-enter-from,
.fade-route-leave-to {
    @apply opacity-0;
}
</style>
