<template>
    <div class="nav-items-center">
        <router-link to="/home" class="btn">首页</router-link>
        <router-link to="/explore" class="btn">发现</router-link>
        <router-link to="/my" class="btn">我的</router-link>
    </div>
</template>

<script setup></script>

<style lang="postcss">
.nav-items-center {
    @apply flex flex-grow justify-center items-center;
    a {
        @apply text-skin-base text-lg mx-6 font-bold active:scale-95;
    }
    .router-link-exact-active {
        @apply text-skin-primary;
    }
}
</style>
