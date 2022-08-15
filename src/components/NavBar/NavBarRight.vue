<template>
    <div class="flex flex-1 items-center justify-end min-w-max">
        <el-avatar fit="cover" class="select-none">User</el-avatar>
        <button
            class="flex justify-center items-center font-bold my-4 mx-2 p-2 hover:text-skin-primary transition-colors"
        >
            未登录
        </button>
        <SwitchTheme></SwitchTheme>
    </div>
</template>

<script setup>
import SwitchTheme from '@/components/NavBarRightComp/SwitchTheme.vue'
</script>

<style lang="postcss"></style>
