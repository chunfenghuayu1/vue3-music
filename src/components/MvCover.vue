<template>
    <div>
        <router-link :to="{ name: 'mv', params: { vid: item.id || item.vid } }">
            <img :src="$imgUrl(imgUrl)" class="rounded-lg object-cover aspect-video" />
        </router-link>
    </div>
    <div v-if="showTitle" class="mt-1">
        <div class="font-bold line-clamp-2">
            <router-link
                :to="{ name: 'mv', params: { vid: item.id || item.vid } }"
                class="hover:underline"
            >
                {{ name }}
            </router-link>
        </div>

        <router-link
            v-if="showArtist"
            class="text-xs text-gray-400 italic hover:underline"
            :to="{
                name: 'artist',
                params: { id: item.artists[0]?.id }
            }"
        >
            {{ subText }}
        </router-link>
        <div v-else class="text-xs text-gray-400 italic">
            {{ subText }}
        </div>
    </div>
</template>

<script setup lang="ts">
console.log('MvCover', '数据定义问题')
interface Dprops {
    item: { artistName: string; name: string; artists: any[]; cover: string; [k: string]: any }
    showTitle: boolean
    name?: string
    imgUrl: string
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
