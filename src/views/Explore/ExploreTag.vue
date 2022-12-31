<template>
    <TransitionGroup name="tagList" class="flex flex-wrap mb-4 relative" tag="div">
        <div
            v-for="item in activeTags"
            :key="item"
            class="font-bold text-lg text-gray-600 text-opacity-80 bg-gray-300 bg-opacity-30 py-1.5 px-3.5 rounded-lg hover:bg-skin-primary hover:bg-opacity-20 hover:text-skin-primary cursor-pointer mr-4 my-2 transition-all"
            :class="category === item && !showMore ? 'bg-red-400 bg-opacity-20 text-red-300' : ''"
            @click="changeCategory(item)"
        >
            {{ item }}
        </div>
        <slot name="more"></slot>
    </TransitionGroup>
</template>

<script setup lang="ts">
defineProps({
    activeTags: {
        type: Array<string>,
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
const changeCategory = (item: string): void => {
    router.push({ path: '/explore', query: { cat: item } })
    emit('update:showMore', false)
}
</script>

<style scoped lang="postcss">
.tagList-move,
.tagList-enter-active,
.tagList-leave-active {
    @apply transition-all duration-300 ease-in;
}
.tagList-enter-from {
    @apply opacity-0;
}
.tagList-leave-to {
    @apply opacity-0;
}
.tagList-leave-active {
    @apply absolute;
}
</style>
