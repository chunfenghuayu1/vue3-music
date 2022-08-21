<template>
    <div
        v-for="(item, index) in activeTags"
        :key="index"
        class="tag transition-all"
        :class="category === item && !modelValue ? 'activeTag' : ''"
        @click="changeCategory(item)"
    >
        {{ item }}
    </div>
    <slot name="more"></slot>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { getCurrentInstance } from 'vue'
const { proxy } = getCurrentInstance()
defineProps({
    activeTags: {
        type: Array,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    modelValue: {
        type: Boolean,
        required: true
    }
})
defineEmits(['update:modelValue'])
const router = useRouter()
const changeCategory = item => {
    router.push({ path: '/explore', query: { cat: item } })
    proxy.$emit('update:modelValue', false)
}
</script>

<style lang="postcss"></style>
