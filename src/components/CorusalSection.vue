<template>
    <div>
        <div class="flex justify-between items-end mb-5 mt-16">
            <h3 class="text-3xl font-bold">最新专辑</h3>
            <div class="flex space-x-8 items-center justify-center">
                <div class="cursor-pointer swiper-prev select-none" @click="mySwiper.slidePrev()">
                    <SvgIcon name="back" size="32" color="#000"></SvgIcon>
                </div>
                <div class="cursor-pointer swiper-next select-none" @click="mySwiper.slideNext()">
                    <SvgIcon name="forward" size="32" color="#000"></SvgIcon>
                </div>
            </div>
        </div>
        <Swiper
            :modules="[Navigation, Scrollbar]"
            :slides-per-view="5"
            :slides-per-group="5"
            :space-between="20"
            :speed="800"
            :observer="true"
            :observe-parents="true"
            :observe-slide-children="true"
            :breakpoints="{
                1300: {
                    spaceBetween: 40
                }
            }"
            :scrollbar="{
                el: '.swiper-scrollbar',
                draggable: true,
                hide: true
            }"
            :allow-touch-move="true"
            @swiper="onSwiper"
        >
            <swiper-slide v-for="(item, index) in list" :key="index">
                <Cover :listItem="item">
                    <template #subTilte>
                        <div class="mb-1">
                            <router-link
                                to="/"
                                class="text-xs text-gray-400 hover:underline cursor-pointer"
                            >
                                {{ item.artist.name }}
                            </router-link>
                        </div>
                    </template>
                </Cover>
            </swiper-slide>
            <div class="swiper-scrollbar"></div>
        </Swiper>
    </div>
</template>

<script setup lang="ts">
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation, Scrollbar } from 'swiper'
import type { Ref } from 'vue'
defineProps({
    list: Array(Object)
})
const mySwiper: Ref<typeof Swiper> = ref(Swiper)
const onSwiper = (swiper: any) => {
    mySwiper.value = swiper
}
</script>

<style scoped></style>
