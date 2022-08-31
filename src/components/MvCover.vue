<template>
    <div class="relative">
        <div class="cursor-pointer" @mouseenter="show = true" @mouseleave="show = false">
            <img
                :src="`${item.imgurl}?param=285y160`"
                class="rounded-lg object-cover h-full w-full"
            />
            <!-- 图片阴影层 -->
            <transition name="cover" mode="out-in">
                <img
                    v-show="show"
                    :src="`${item.imgurl}?param=285y160`"
                    class="h-full w-full absolute top-3 -z-10 bg-cover blur-md opacity-60 scale-95"
                    loading="lazy"
                />
            </transition>
        </div>
    </div>
    <div v-if="showTitle" class="mt-2">
        <div class="font-bold mb-2 lineClamp2">{{ item.name }}</div>
        <div class="text-xs text-gray-400 italic">{{ item.publishTime }}</div>
    </div>
</template>

<script setup>
// 控制遮罩显示
const show = ref(false)

defineProps({
    item: {
        type: Object,
        required: true
    },
    showTitle: {
        type: Boolean,
        default: true
    }
})
</script>

<style lang="postcss"></style>
