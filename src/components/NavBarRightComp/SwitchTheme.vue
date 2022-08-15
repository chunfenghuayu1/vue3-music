<template>
    <div class="cursor-pointer" @click="switch1">
        <component :is="switchTheme ? NavBarRightSwitchCheck : NavBarRightSwitchClose"></component>
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

<style lang="postcss"></style>
