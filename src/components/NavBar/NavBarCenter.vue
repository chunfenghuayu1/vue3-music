<template>
    <div class="flex flex-grow justify-center items-center">
        <router-link
            to="/"
            class="mx-4 my-1 px-2 py-1 text-lg font-bold active:scale-95 rounded-md"
            :class="$route.name === 'home' ? 'text-skin-primary' : ''"
        >
            {{ $t.nav.home }}
        </router-link>
        <router-link
            to="/explore"
            class="mx-4 my-1 px-2 py-1 text-lg font-bold active:scale-95 rounded-md"
            :class="$route.name === 'explore' ? 'text-skin-primary' : ''"
        >
            {{ $t.nav.explore }}
        </router-link>
        <router-link
            to="/my"
            class="mx-4 my-1 px-2 py-1 text-lg font-bold active:scale-95 rounded-md"
            :class="$route.name === 'my' ? 'text-skin-primary' : ''"
        >
            {{ $t.nav.my }}
        </router-link>
    </div>
</template>

<script setup></script>

<style lang="postcss"></style>
