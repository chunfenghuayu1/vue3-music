<template>
    <div class="relative">
        <slot name="button" :active="activeItem"></slot>

        <transition name="tagSelector" mode="in-out">
            <div
                v-if="toggleShow"
                class="absolute left-0 top-full z-10 mt-1 w-full origin-top-right rounded-md bg-white shadow-lg border border-solid"
            >
                <div class="py-1">
                    <div
                        v-for="(item, index) in row"
                        :key="index"
                        class="font-bold text-base text-skin-tertiary py-1 px-2 hover:bg-skin-tertiary hover:bg-opacity-20"
                        @click="handlerClick(item)"
                    >
                        {{ item.name }}
                    </div>
                </div>
            </div>
        </transition>
    </div>
</template>

<script setup>
const props = defineProps({
    row: {
        type: Array,
        default: () => []
    },
    toggleShow: {
        type: Boolean,
        default: false
    },
    type: {
        type: Number,
        default: 1
    }
})
const emit = defineEmits(['update:toggleShow', 'update:type'])
const handlerClick = item => {
    emit('update:toggleShow', false)
    emit('update:type', item.type)
}
const activeItem = computed(() => {
    return props.row.filter(item => item.type === props.type)[0]
})
</script>

<style lang="postcss"></style>
