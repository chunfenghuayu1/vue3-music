<template>
    <div class="mt-16">
        <div class="flex justify-between items-center mb-5">
            <h3 class="text-3xl font-bold">
                {{ $t.home.albumNewest }}
            </h3>
            <div class="flex space-x-8 items-center justify-center">
                <div class="cursor-pointer swiper-prev" @click="mySwiper.slidePrev()">
                    <SvgIcon name="back" size="20"></SvgIcon>
                </div>
                <div class="cursor-pointer swiper-next" @click="mySwiper.slideNext()">
                    <SvgIcon name="forward" size="20"></SvgIcon>
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
                1023: {
                    spaceBetween: 40
                }
            }"
            :scrollbar="{
                el: '.swiper-scrollbar',
                draggable: true,
                hide: true
            }"
            :allow-touch-move="false"
            @swiper="onSwiper"
        >
            <swiper-slide
                v-for="(item, index) in itemList"
                :key="index"
                class="cursor-pointer relative"
            >
                <div>
                    <Cover :row-list-item="item">
                        <!-- 热门新碟显示歌手名 -->
                        <template #subTilte="{ rowListItem }">
                            <div v-for="(item1, index1) in rowListItem.artists" :key="index1">
                                <i v-if="index1 !== 0">/</i>
                                <router-link
                                    to="/"
                                    class="text-xs text-skin-tertiary cursor-pointer hover:underline"
                                >
                                    {{ item1.name }}
                                </router-link>
                            </div>
                        </template>
                    </Cover>
                </div>
            </swiper-slide>
            <div class="swiper-scrollbar"></div>
        </Swiper>
    </div>
</template>

<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation, Scrollbar } from 'swiper'
defineProps({
    itemList: {
        type: Array,
        required: true
    }
})
const mySwiper = ref(null)
const onSwiper = swiper => {
    mySwiper.value = swiper
}
</script>

<style lang="postcss" scoped>
.swiper {
    :deep(.swiper-wrapper) {
        @apply pb-2;
    }
}
</style>
