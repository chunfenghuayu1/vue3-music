<template>
    <svg aria-hidden="true" class="svg-icon" :style="{ width: size + 'px', height: size + 'px' }">
        <use :xlink:href="symbolId" :fill="color" />
    </svg>
</template>

<script setup lang="ts">
interface Dprops {
    prefix?: string
    name: string
    color?: string
    size?: string
}
const props = withDefaults(defineProps<Dprops>(), {
    prefix: 'icon',
    color: '#fff',
    size: '14'
})
const symbolId = computed(() => `#${props.prefix}-${props.name}`)
</script>

<style lang="postcss">
.svg-icon {
    width: 1em;
    height: 1em;
    fill: currentColor;
    vertical-align: middle;
}
</style>
