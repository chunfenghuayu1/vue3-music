<template>
    <div
        class="px-6 py-3 bg-theme-baseActive bg-opacity-20 text-theme-baseActive text-opacity-90 rounded-lg flex items-center justify-center space-x-1 flex-shrink-0 active:scale-95 transition select-none cursor-pointer"
    >
        <slot></slot>
        <span class="font-bold" v-if="text !== ''">{{ text }}</span>
    </div>
</template>

<script setup lang="ts">
withDefaults(defineProps<{ text?: string }>(), {
    text: ''
})
</script>

<style scoped></style>
