<template>
    <NavBar></NavBar>
    <main class="pt-16 pb-24 px-vw lg:px-10 fixed inset-0 overflow-auto">
        <router-view v-slot="{ Component }">
            <transition name="fade-route">
                <keep-alive include="Home,Explore,My">
                    <component :is="Component"></component>
                </keep-alive>
            </transition>
        </router-view>
    </main>
</template>

<script setup></script>

<style lang="postcss">
/* 过渡动画 */
.fade-route-enter-active {
    transition: all 0.5s ease;
}
.fade-route-leave-active {
    transition: all 0.2s ease-in;
}
.fade-route-enter-from,
.fade-route-leave-to {
    transform: translateX(-10px);
    opacity: 0;
}
</style>
