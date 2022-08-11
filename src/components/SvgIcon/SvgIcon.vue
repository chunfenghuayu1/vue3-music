<template>
    <svg
        :class="['svg-icon', $attrs.class]"
        :style="{
            width: iconSize + 'px',
            height: iconSize + 'px'
        }"
        aria-hidden="true"
    >
        <use :xlink:href="'#icon-' + iconName" :fill="color" />
    </svg>
</template>

<script setup>
defineProps({
    iconName: {
        type: String,
        required: true
    },
    color: {
        type: String,
        default: ''
    },
    iconSize: {
        type: [Number, String],
        default: 14
    }
})
</script>

<style lang="postcss">
.svg-icon {
    vertical-align: middle;
    fill: currentColor;
}
</style>
