<template>
    <div class="cursor-pointer relative w-5 h-5 select-none" @click="switchTheme">
        <Transition name="theme-slide" mode="out-in">
            <SvgIcon
                v-if="toggleTheme"
                name="light"
                size="20"
                color="#000"
                class="absolute"
            ></SvgIcon>
            <SvgIcon v-else name="dark" size="20" color="#000" class="absolute"></SvgIcon>
        </Transition>
    </div>
</template>

<script setup lang="ts">
// 控制主题切换
const toggleTheme = ref(true)
const switchTheme = () => {
    toggleTheme.value = !toggleTheme.value
}
</script>

<style lang="postcss">
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
