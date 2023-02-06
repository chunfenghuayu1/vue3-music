<template>
    <div class="cursor-pointer relative w-5 h-5 select-none" @click="switchTheme">
        <Transition name="theme-slide" mode="out-in">
            <SvgIcon
                v-if="localStore.settings.theme === 'light'"
                name="light"
                size="20"
                color="#000000cc"
                class="absolute"
            ></SvgIcon>
            <SvgIcon
                v-else
                name="dark"
                size="20"
                class="absolute text-theme-base text-opacity-70"
            ></SvgIcon>
        </Transition>
    </div>
</template>

<script setup lang="ts">
import { useLocalStore } from '@stores/localStore'
const localStore = useLocalStore()
// 控制主题切换
const switchTheme = () => {
    // console.log(localStore.settings.theme)
    if (localStore.settings.theme === 'light') {
        localStore.switchTheme('dark')
    } else {
        localStore.switchTheme('light')
    }
}
// 默认进行一次主题切换
document.documentElement.classList.add(localStore.settings.theme)
</script>

<style lang="postcss" scoped>
.theme-slide-enter-active,
.theme-slide-leave-active {
    @apply transition-all duration-150;
}

.theme-slide-enter-from {
    @apply opacity-0 transform rotate-45;
}

.theme-slide-leave-to {
    @apply opacity-0 transform rotate-45;
}
</style>
