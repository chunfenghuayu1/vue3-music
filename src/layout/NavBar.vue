<template>
    <nav class="nav">
        <!-- 左侧logo、前进与后退 -->
        <NavBarLeft></NavBarLeft>
        <!-- 中间导航 -->
        <NavBarCenter></NavBarCenter>
        <!-- 右侧功能区域 -->
        <NavBarRight></NavBarRight>
    </nav>
</template>

<script setup>
import NavBarCenter from '../components/NavBar/NavBarCenter.vue'
import NavBarLeft from '../components/NavBar/NavBarLeft.vue'
import NavBarRight from '../components/NavBar/NavBarRight.vue'
</script>

<style lang="postcss">
.nav {
    @apply fixed top-0 left-0 h-16 flex w-full z-50 min-w-max;
    padding-left: 10vw;
    padding-right: 10vw;
    backdrop-filter: saturate(180%) blur(20px);
}
</style>
