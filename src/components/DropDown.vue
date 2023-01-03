<template>
    <div class="relative" @mouseleave.stop="emit('update:toggleShow', false)">
        <!-- 提供给外面的按钮 -->
        <slot name="button" :active="activeItem"></slot>

        <transition name="dropDown" mode="in-out">
            <div
                v-if="toggleShow"
                class="absolute left-0 top-full z-10 w-full origin-top-right shadow-lg"
            >
                <div class="w-full flex justify-center">
                    <div
                        class="w-2 h-2 bg-gray-100 rotate-45 translate-y-1/2 border border-solid rounded-tl-sm border-b-transparent border-r-transparent"
                    ></div>
                </div>
                <div class="bg-gray-100 rounded-md border border-solid py-1">
                    <div
                        v-for="(item, index) in row"
                        :key="index"
                        class="font-bold py-1 px-2 hover:bg-gray-100 hover:bg-opacity-20"
                        @click="handlerClick(item)"
                    >
                        {{ item.name }}
                    </div>
                </div>
            </div>
        </transition>
    </div>
</template>

<script setup lang="ts">
interface DrowType {
    type: number
    name: string
}
const props = withDefaults(
    defineProps<{
        row: DrowType[]
        toggleShow?: boolean
        type?: number
    }>(),
    {
        toggleShow: false,
        type: 1
    }
)
const emit = defineEmits(['update:toggleShow', 'update:type'])
const handlerClick = (item: DrowType) => {
    emit('update:toggleShow', false)
    emit('update:type', item.type)
}
const activeItem = computed(() => {
    return props.row.filter(item => item.type === props.type)[0]
})
</script>

<style lang="postcss" scoped>
.dropDown-enter-active,
.dropDown-leave-active {
    transform: rotateX(0deg);
    @apply transition-all duration-300 ease-in-out;
}

.dropDown-enter-from,
.dropDown-leave-to {
    transform: rotateX(90deg);
    @apply opacity-30;
}
</style>
