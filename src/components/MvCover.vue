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
                params: { id: artistId }
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
    },
    artistId: {
        type: Number,
        default: 0
    },
    showArtist: {
        type: Boolean,
        default: false
    }
})
</script>

<style lang="postcss"></style>
