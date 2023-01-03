<template>
    <div>
        <div class="flex justify-between items-end mb-5 mt-16">
            <h3 class="text-3xl font-bold">热门歌曲</h3>
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
            :modules="[Navigation, Grid]"
            :slides-per-view="4"
            :grid="{
                rows: 4,
                fill: 'row'
            }"
            :space-between="0"
            :slidesPerGroup="4"
            :speed="800"
            :observer="true"
            :observe-parents="true"
            :observe-slide-children="true"
            :allow-touch-move="true"
            @swiper="onSwiper"
        >
            <swiper-slide v-for="(item, index) in list" :key="index">
                <MyTrackItem
                    :item="item"
                    :pic-url="item.al.picUrl"
                    :name="item.name"
                    :alia="item.alia"
                    :ar="item.ar"
                ></MyTrackItem>
            </swiper-slide>
        </Swiper>
    </div>
</template>

<script setup lang="ts">
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation, Grid } from 'swiper'
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
