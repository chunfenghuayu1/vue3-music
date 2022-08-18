<template>
    <div class="flex flex-grow justify-center items-center">
        <router-link
            to="/"
            class="btn mx-4 my-1 px-2 py-1 text-lg font-bold active:scale-95 rounded-md"
            :class="$route.name === 'home' ? 'text-skin-primary' : 'text-skin-base'"
        >
            首页
        </router-link>
        <router-link
            to="/explore"
            class="btn mx-4 my-1 px-2 py-1 text-lg font-bold active:scale-95 rounded-md"
            :class="$route.name === 'explore' ? 'text-skin-primary' : 'text-skin-base'"
        >
            发现
        </router-link>
        <router-link
            to="/my"
            class="btn mx-4 my-1 px-2 py-1 text-lg font-bold active:scale-95 rounded-md"
            :class="$route.name === 'my' ? 'text-skin-primary' : 'text-skin-base'"
        >
            我的
        </router-link>
    </div>
</template>

<script setup></script>

<style lang="postcss"></style>
<!-- text-skin-primary -->
