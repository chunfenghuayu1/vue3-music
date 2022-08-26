<template>
    <div class="cursor-pointer relative w-5 h-5 select-none" @click="switch1">
        <Transition name="theme-slide">
            <SvgIcon v-if="switchTheme" name="check" size="20" class="absolute"></SvgIcon>
            <SvgIcon v-else name="close" size="20" class="absolute"></SvgIcon>
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

<style lang="postcss"></style>
