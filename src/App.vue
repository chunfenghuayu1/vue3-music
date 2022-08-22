<template>
    <NavBar></NavBar>
    <main class="pt-16 pb-24 px-vw lg:px-10 fixed inset-0 overflow-auto">
        <router-view v-slot="{ Component }">
            <keep-alive include="Home,Explore,My">
                <component :is="Component"></component>
            </keep-alive>
        </router-view>
    </main>
</template>

<script setup></script>

<style lang="postcss"></style>
