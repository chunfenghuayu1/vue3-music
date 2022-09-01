<template>
    <div class="relative">
        <div class="cursor-pointer" @mouseenter="show = true" @mouseleave="show = false">
            <img :src="`${imgUrl}?param=285y160`" class="rounded-lg object-cover" />
            <!-- 图片阴影层 -->
            <transition name="cover" mode="out-in">
                <img
                    v-show="show"
                    :src="`${imgUrl}?param=285y160`"
                    class="absolute top-3 -z-10 object-cover blur-md opacity-60 scale-95"
                    loading="lazy"
                />
            </transition>
        </div>
    </div>
    <div v-if="showTitle" class="mt-2">
        <div class="font-bold mb-2 lineClamp2">
            {{ name }}
        </div>
        <div class="text-xs text-gray-400 italic">
            {{ subText }}
        </div>
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
    },
    name: {
        type: String,
        default: ''
    },
    imgUrl: {
        type: String,
        required: true
    },
    subText: {
        type: String,
        default: ''
    }
})
</script>

<style lang="postcss"></style>
