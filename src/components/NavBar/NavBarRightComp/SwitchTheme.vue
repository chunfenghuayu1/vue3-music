<template>
    <div class="cursor-pointer relative w-5 h-5" @click="switch1">
        <Transition name="slide-up">
            <SvgIcon v-if="switchTheme" icon-name="check" icon-size="20" class="absolute"></SvgIcon>
            <SvgIcon v-else icon-name="close" icon-size="20" class="absolute"></SvgIcon>
        </Transition>
    </div>
</template>

<script setup>
// 控制主题切换
const switchTheme = ref(true)
const switch1 = () => {
    switchTheme.value = !switchTheme.value
}
</script>

<style lang="postcss">
.slide-up-enter-active,
.slide-up-leave-active {
    transition: all 0.25s ease-out;
}

.slide-up-enter-from {
    opacity: 0;
    transform: translateY(30px);
}

.slide-up-leave-to {
    opacity: 0;
    transform: translateY(-20px);
}
</style>
