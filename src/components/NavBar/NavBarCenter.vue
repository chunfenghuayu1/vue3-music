<template>
    <div class="flex flex-grow justify-center items-center">
        <router-link
            to="/"
            class="btn text-lg mx-4 font-bold active:scale-95 rounded-md py-1"
            :class="$route.name === 'home' ? 'text-skin-primary' : 'text-skin-base'"
        >
            首页
        </router-link>
        <router-link
            to="/explore"
            class="btn text-lg mx-4 font-bold active:scale-95 rounded-md py-1"
            :class="$route.name === 'explore' ? 'text-skin-primary' : 'text-skin-base'"
        >
            发现
        </router-link>
        <router-link
            to="/my"
            class="btn text-lg mx-4 font-bold active:scale-95 rounded-md py-1"
            :class="$route.name === 'my' ? 'text-skin-primary' : 'text-skin-base'"
        >
            我的
        </router-link>
    </div>
</template>

<script setup></script>

<style lang="postcss"></style>
<!-- text-skin-primary -->
