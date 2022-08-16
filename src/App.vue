<template>
    <NavBar></NavBar>
    <main class="pt-16 pb-24 px-vw fixed inset-0 overflow-auto">
        <router-view v-slot="{ Component }">
            <keep-alive include="Home">
                <component :is="Component"></component>
            </keep-alive>
        </router-view>
    </main>
</template>

<script setup>
import NavBar from './layout/NavBar.vue'
</script>

<style lang="postcss"></style>
