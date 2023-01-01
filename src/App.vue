<template>
    <el-scrollbar height="100vh" ref="scrollbarRef">
        <NavBar></NavBar>
        <div>
            <router-view></router-view>
        </div>
    </el-scrollbar>
</template>
<script setup lang="ts">
import { ElScrollbar } from 'element-plus'
const scrollbarRef = ref<InstanceType<typeof ElScrollbar>>()
provide('scroll', scrollbarRef)
</script>
<style lang="postcss">
.el-scrollbar__bar {
    z-index: 20;
}
</style>
