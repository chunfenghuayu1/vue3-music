<template>
    <TransitionGroup name="tagList" class="flex flex-wrap mb-4 relative" tag="div">
        <div
            v-for="item in activeTags"
            :key="item"
            class="font-bold text-lg py-1.5 px-3.5 rounded-lg hover:bg-theme-baseActive hover:text-theme-baseActive hover:bg-opacity-20 cursor-pointer mr-4 my-2 transition-all"
            :class="
                category === item && !showMore
                    ? 'bg-theme-baseActive text-theme-baseActive bg-opacity-20 '
                    : 'text-theme-baseSecond bg-opacity-50 bg-theme-baseSecond'
            "
            @click="changeCategory(item)"
        >
            {{ item }}
        </div>
        <slot name="more"></slot>
    </TransitionGroup>
</template>

<script setup lang="ts">
interface Dprops {
    activeTags: string[]
    category: string
    showMore: boolean
}
defineProps<Dprops>()
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
