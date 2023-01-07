<template>
    <div>
        <div class="flex justify-between items-end mb-5 mt-16">
            <h3 class="text-3xl font-bold text-theme-base">最新专辑</h3>
            <div class="flex space-x-8 items-center justify-center">
                <div class="cursor-pointer swiper-prev select-none" @click="mySwiper.slidePrev()">
                    <SvgIcon name="back" size="32" class="text-theme-base fill-current"></SvgIcon>
                </div>
                <div class="cursor-pointer swiper-next select-none" @click="mySwiper.slideNext()">
                    <SvgIcon
                        name="forward"
                        size="32"
                        class="text-theme-base fill-current"
                    ></SvgIcon>
                </div>
            </div>
        </div>
        <Swiper
            :modules="[Navigation]"
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
            :allow-touch-move="true"
            @swiper="onSwiper"
        >
            <swiper-slide v-for="(item, index) in list" :key="index">
                <Cover :listItem="item" listType="专辑">
                    <template #subTilte>
                        <div class="mb-1">
                            <router-link
                                to="/"
                                class="text-xs text-theme-baseSecond hover:underline cursor-pointer"
                            >
                                {{ item.artist.name }}
                            </router-link>
                        </div>
                    </template>
                </Cover>
            </swiper-slide>
        </Swiper>
    </div>
</template>

<script setup lang="ts">
import Cover from './Cover.vue'
// 滑动条颜色不好处理，去除滑动条
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation } from 'swiper'
import type { Ref } from 'vue'
interface Dprops {
    list: {
        artist: { name: string }
        name: string
        id: number
    }[]
}
defineProps<Dprops>()
const mySwiper: Ref<typeof Swiper> = ref(Swiper)
const onSwiper = (swiper: any) => {
    mySwiper.value = swiper
}
</script>

<style lang="postcss"></style>
