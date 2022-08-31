<template>
    <TransitionGroup name="tagList" class="flex flex-wrap mb-4 relative" tag="div">
        <div
            v-for="item in activeTags"
            :key="item"
            class="selector-tag transition-all"
            :class="category === item && !showMore ? 'activeTag' : ''"
            @click="changeCategory(item)"
        >
            {{ item }}
        </div>
        <slot name="more"></slot>
    </TransitionGroup>
</template>

<script setup>
defineProps({
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
// 直接把值给过去就行了父组件v-model自动触发
const emit = defineEmits(['update:showMore'])
const router = useRouter()
const changeCategory = item => {
    router.push({ path: '/explore', query: { cat: item } })
    emit('update:showMore', false)
}
</script>

<style lang="postcss"></style>
