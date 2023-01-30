<template>
    <div>
        <router-link :to="{ name: 'mv', params: { vid: item?.id || item.vid } }">
            <img
                :src="$imgUrl(imgUrl, 512)"
                class="rounded-lg object-cover aspect-video"
                loading="lazy"
            />
        </router-link>
    </div>
    <div v-if="showTitle" class="mt-1">
        <div class="font-bold text-theme-base line-clamp-2">
            <router-link
                :to="{ name: 'mv', params: { vid: item?.id || item.vid } }"
                class="hover:underline"
            >
                {{ name }}
            </router-link>
        </div>

        <router-link
            v-if="showArtist"
            class="text-xs font-semibold text-theme-baseSecond italic hover:underline"
            :to="{
                name: 'artist',
                params: { id: artistId }
            }"
        >
            {{ subText }}
        </router-link>
        <div v-else class="text-xs font-semibold text-theme-baseSecond italic">
            {{ subText }}
        </div>
    </div>
</template>

<script setup lang="ts">
// console.log('MvCover', '数据定义问题')
interface Dprops {
    item: {
        artistName: string
        name: string
        artists: any[]
        cover: string
        [k: string | number]: any
    }
    showTitle: boolean
    name?: string
    imgUrl: string
    // 传递mv所有歌手
    subText?: string
    showArtist?: boolean
    artistId?: number
}
withDefaults(defineProps<Dprops>(), {
    name: '',
    subText: '',
    showArtist: false,
    artistId: 0
})
</script>

<style lang="postcss"></style>
