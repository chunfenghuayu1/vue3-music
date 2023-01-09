<template>
    <div class="relative" @mouseleave.stop="emit('update:toggleShow', false)">
        <!-- 提供给外面的按钮 -->
        <slot name="button" :active="activeItem"></slot>

        <transition name="dropDown" mode="in-out">
            <div
                v-if="toggleShow"
                class="absolute top-full left-0 z-20 w-full origin-top shadow-lg min-w-max"
                ref="dropDown"
                :style="{ marginLeft: `${setMargin}px` }"
            >
                <div class="flex justify-center">
                    <div class="w-2 h-2 bg-theme-baseSecond rotate-45 translate-y-1/2"></div>
                </div>
                <div class="bg-theme-baseSecond rounded-xl px-1 py-2">
                    <div
                        v-for="(item, index) in row"
                        :key="index"
                        class="flex items-center space-x-1 font-semibold py-1 px-1.5 text-theme-base cursor-pointer hover:text-theme-baseActive"
                        @click="handlerClick(item)"
                    >
                        <SvgIcon v-if="item.svgIcon" :name="item.svgIcon" size="18"></SvgIcon>
                        <span>{{ item.name }}</span>
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
    svgIcon?: string
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
const emit = defineEmits(['update:toggleShow', 'update:type', 'click'])
const handlerClick = (item: DrowType) => {
    emit('update:toggleShow', false)
    emit('update:type', item.type)
    emit('click', item)
}
const activeItem = computed(() => {
    return props.row.filter(item => item.type === props.type)[0]
})

// 解决下拉框偏移
const dropDown = ref<HTMLElement>()
const setMargin = ref(0)
const getPosition = () => {
    if (props.toggleShow) {
        nextTick(() => {
            // 外层节点宽度
            const outWidth: number = dropDown.value!.parentElement!.offsetWidth
            // 下拉框宽度
            const innerWidth: number = dropDown.value!.offsetWidth
            console.log(innerWidth, outWidth)
            // 如果外层元素宽度小于内层元素宽度，则让下拉框偏移
            if (outWidth < innerWidth) {
                setMargin.value = (outWidth - innerWidth) / 2
            }
        })
    }
}
getPosition()
watch(() => props.toggleShow, getPosition)
</script>

<style lang="postcss" scoped>
.dropDown-enter-active,
.dropDown-leave-active {
    transform: rotateX(0deg);
    @apply transition duration-300 ease-in-out;
}

.dropDown-enter-from,
.dropDown-leave-to {
    transform: rotateX(90deg);
    @apply opacity-30;
}
</style>
