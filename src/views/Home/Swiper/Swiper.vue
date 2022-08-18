<template>
    <swiper
        :modules="[Autoplay, Pagination]"
        :slides-per-view="4"
        :speed="1200"
        :loop="true"
        :space-between="10"
        :autoplay="{
            delay: 3000,
            stopOnLastSlide: false,
            disableOnInteraction: false
        }"
        :pagination="{ clickable: true, dynamicBullets: false }"
    >
        <swiper-slide v-for="(item, index) in bannerList" :key="index" class="cursor-pointer">
            <img
                :src="`${item.imageUrl}?param=512y512`"
                loading="lazy"
                class="object-fill rounded-lg h-36 w-full hover:shadow-lg transition-shadow"
            />
        </swiper-slide>
    </swiper>
</template>

<script setup>
// core version + navigation, pagination modules:
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Autoplay, Pagination } from 'swiper'

defineProps({
    bannerList: {
        type: Array,
        default: () => []
    }
})
</script>

<style lang="postcss" scoped>
.swiper {
    :deep(.swiper-wrapper) {
        @apply my-8;
    }
    :deep(.swiper-pagination) {
        .swiper-pagination-bullet-active {
            @apply rounded bg-skin-primary animate-widthChange;
        }
    }
}
</style>
