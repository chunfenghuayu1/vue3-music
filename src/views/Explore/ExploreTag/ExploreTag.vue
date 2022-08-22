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
// const { proxy } = getCurrentInstance()
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
const emit = defineEmits(['update:showMore'])
const router = useRouter()
const changeCategory = item => {
    router.push({ path: '/explore', query: { cat: item } })
    emit('update:showMore', false)
}
</script>

<style lang="postcss"></style>
