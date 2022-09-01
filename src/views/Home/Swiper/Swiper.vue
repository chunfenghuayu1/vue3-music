<template>
    <div>
        <swiper
            :modules="[Autoplay, Pagination]"
            :slides-per-view="4"
            :speed="1200"
            :space-between="10"
            :observer="true"
            :observe-parents="true"
            :autoplay="{
                delay: 3000,
                stopOnLastSlide: false,
                disableOnInteraction: false
            }"
            :pagination="{ clickable: true, dynamicBullets: false }"
        >
            <swiper-slide
                v-for="(item, index) in bannerList"
                :key="index"
                class="cursor-pointer relative"
                @click="handlerClick(item.typeTitle, item)"
            >
                <img
                    :src="`${item.imageUrl?.replace('http://', 'https://')}?param=377y144`"
                    loading="lazy"
                    class="object-fill rounded-lg h-36 w-full hover:shadow-lg transition-shadow"
                />
                <div
                    class="absolute bottom-0 right-0 bg-gradient-to-r bg-red-500 rounded-tl-lg rounded-br-lg px-1.5 py-0.5 text-white text-xs"
                >
                    {{ item.typeTitle }}
                </div>
            </swiper-slide>
        </swiper>
    </div>
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
const router = useRouter()
const handlerClick = (type, item) => {
    if (type === '歌单') {
        router.push({ name: 'playlist', params: { id: item.targetId } })
        return
    }
    if (type === '数字专辑') {
        const id = item.url.split('?id=')[1]
        router.push({ name: 'newAlbum', params: { id } })
        return
    }
    if (type === '新歌首发') {
        console.log('还未处理')
        return
    }
    if (type === '新碟首发') {
        router.push({ name: 'newAlbum', params: { id: item.targetId } })
        return
    }
}
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
