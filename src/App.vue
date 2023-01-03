<template>
    <el-scrollbar height="100vh" ref="scrollbarRef" @scroll="scrollFn">
        <NavBar :scrollDistance="scrollDistance"></NavBar>
        <div class="px-10vw lg:px-10 py-16">
            <router-view></router-view>
        </div>
    </el-scrollbar>
</template>
<script setup lang="ts">
import { ElScrollbar } from 'element-plus'
const scrollbarRef = ref<InstanceType<typeof ElScrollbar>>()
provide('scroll', scrollbarRef)
interface scrollValue {
    scrollLeft: number
    scrollTop: number
}
const scrollDistance = ref({ scrollTop: 0, scrollLeft: 0 })
const scrollFn = (value: scrollValue) => {
    scrollDistance.value.scrollTop = value.scrollTop
    scrollDistance.value.scrollLeft = value.scrollLeft
}
</script>
<style lang="postcss">
.el-scrollbar__bar {
    z-index: 20;
}
</style>
