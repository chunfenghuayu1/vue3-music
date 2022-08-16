<template>
    <nav
        class="fixed top-0 left-0 h-16 min-w-max w-full flex z-10 bg-white px-vw bg-opacity-90 backdrop-saturate-180 backdrop-blur-lg"
    >
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

<style lang="postcss"></style>
