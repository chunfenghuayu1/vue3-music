<template>
    <div class="relative">
        <router-link
            :to="{ name: 'mv', params: { vid: item.id || item.vid } }"
            @mouseenter="show = true"
            @mouseleave="show = false"
        >
            <img
                :src="`${imgUrl.replace(/^http:/, 'https://')}?param=285y160`"
                class="rounded-lg object-cover"
            />
            <!-- 图片阴影层 -->
            <transition name="cover" mode="out-in">
                <img
                    v-show="show"
                    :src="`${imgUrl.replace(/^http:/, 'https://')}?param=285y160`"
                    class="absolute top-3 -z-10 object-cover blur-md opacity-60 scale-95"
                    loading="lazy"
                />
            </transition>
        </router-link>
    </div>
    <div v-if="showTitle" class="mt-2">
        <div class="font-bold mb-2 lineClamp2">
            <router-link
                :to="{ name: 'mv', params: { vid: item.id || item.vid } }"
                class="hover:underline"
            >
                {{ name }}
            </router-link>
        </div>
        <router-link
            class="text-xs text-gray-400 italic hover:underline"
            :to="{
                name: 'artist',
                params: { id: item.artist?.id || item.artists[0].id }
            }"
        >
            {{ subText }}
        </router-link>
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
