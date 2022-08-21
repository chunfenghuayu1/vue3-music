<template>
    <div class="flex flex-1 items-center justify-end min-w-max space-x-5">
        <SwitchTheme></SwitchTheme>
        <el-avatar fit="cover" class="select-none cursor-pointer" @click="$router.push('/login')">
            User
        </el-avatar>
    </div>
</template>

<script setup>
import SwitchTheme from '@/components/NavBarRightComp/SwitchTheme.vue'
</script>

<style lang="postcss"></style>
