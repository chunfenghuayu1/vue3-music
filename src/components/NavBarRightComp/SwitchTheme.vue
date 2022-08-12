<template>
    <div class="switchTheme" @click="switch1">
        <NavBarRightSwitchCheck v-if="switchTheme"></NavBarRightSwitchCheck>
        <NavBarRightSwitchClose v-else></NavBarRightSwitchClose>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import NavBarRightSwitchCheck from '../NavBarRightComp/SwitchCheck.vue'
import NavBarRightSwitchClose from '../NavBarRightComp/SwitchClose.vue'

// 控制主题切换
const switchTheme = ref(true)
const switch1 = () => {
    switchTheme.value = !switchTheme.value
}
</script>

<style lang="postcss">
.switchTheme {
    @apply cursor-pointer transition-all;
}
</style>
