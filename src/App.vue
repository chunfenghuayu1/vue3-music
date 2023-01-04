<template>
    <el-scrollbar height="100vh" ref="scrollbarRef">
        <NavBar></NavBar>
        <div class="px-10vw lg:px-10 py-16">
            <router-view></router-view>
        </div>
    </el-scrollbar>
</template>
<script setup lang="ts">
import NavBar from './components/NavBar.vue'

import { ElScrollbar } from 'element-plus'
import 'element-plus/es/components/scrollbar/style/css'
const scrollbarRef = ref<InstanceType<typeof ElScrollbar>>()
provide('scroll', scrollbarRef)
</script>
<style lang="postcss">
.el-scrollbar__bar {
    z-index: 20;
}
</style>
