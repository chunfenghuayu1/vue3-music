<template>
    <div class="nav-items-right">
        <el-avatar fit="cover" class="select-none">User</el-avatar>
        <button class="login">未登录</button>
        <SwitchTheme></SwitchTheme>
    </div>
</template>

<script setup>
import SwitchTheme from '@/components/NavBarRightComp/SwitchTheme.vue'
</script>

<style lang="postcss">
.nav-items-right {
    @apply flex flex-1 items-center justify-end min-w-max;
    .login {
        @apply flex justify-center items-center font-bold my-4 mx-2 p-2 hover:text-skin-primary transition-colors;
    }
}
</style>
