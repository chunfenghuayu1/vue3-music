<template>
    <div
        v-show="song.name"
        class="flex space-x-6 items-center hover:bg-opacity-10 hover:bg-skin-tertiary transition-all rounded-lg p-2 my-2"
        @mouseenter="showBtn = true"
        @mouseleave="showBtn = false"
    >
        <!-- 歌曲图片 -->
        <div
            class="flex items-center justify-center rounded-md overflow-hidden relative w-12 flex-shrink-0"
        >
            <img
                v-lazy="`${song.al?.picUrl.replace(/^http:/, 'https://')}?param=48y48`"
                class="w-12 h-12"
                loading="lazy"
            />
        </div>
        <!-- 歌名 作者 -->
        <div class="flex flex-col justify-center flex-1">
            <div class="flex font-bold text-lg lineClamp1">
                <span class="lineClamp1 hover:underline cursor-pointer"> {{ song.name }}</span>
                <span v-if="song.alia[0]" class="text-skin-tertiary lineClamp1">
                    ({{ song.alia[0] }})
                </span>
            </div>
            <div class="text-sm text-skin-tertiary lineClamp1">
                <span v-for="(item, index) in song.ar" :key="index">
                    <span v-if="index !== 0"> / </span
                    ><span class="hover:underline cursor-pointer">{{ item.name }}</span></span
                >
            </div>
        </div>
        <!-- 歌曲时间 -->
        <div v-if="count" class="flex items-center justify-center font-bold">
            {{ count }}
        </div>
    </div>
</template>

<script setup>
defineProps({
    song: {
        type: Object,
        default: () => {}
    },
    count: {
        type: Number,
        default: 0
    }
})
const showBtn = ref(false)
</script>

<style lang="postcss"></style>
