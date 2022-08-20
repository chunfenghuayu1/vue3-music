<template>
    <div
        v-for="(item, index) in activeTags"
        :key="index"
        class="tag transition-all"
        :class="category === item && !showMore ? 'activeTag' : ''"
        @click="changeCategory(item)"
    >
        {{ item }}
    </div>
    <slot name="more"></slot>
</template>

<script setup>
import { useRouter } from 'vue-router'

const props = defineProps({
    activeTags: {
        type: Array,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    showMore: {
        type: Boolean,
        required: true
    }
})
const router = useRouter()
const changeCategory = item => {
    !props.showMore && router.push({ path: '/explore', query: { cat: item } })
}
</script>

<style lang="postcss"></style>
