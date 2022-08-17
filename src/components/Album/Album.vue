<template>
    <div class="mt-16">
        <div class="flex justify-between items-end mb-5">
            <h3 class="text-3xl font-bold text-skin-base">{{ itemName }}</h3>
            <router-link to="/explore" class="text-skin-secondary font-semibold text-sm">
                查看全部
            </router-link>
        </div>
        <div
            class="grid gap-x-10 gap-y-10"
            :class="type === 'recomArtist' ? 'grid-cols-6' : 'grid-cols-5'"
        >
            <div v-for="(item, index) in itemList" :key="index">
                <Cover :row-list-item="item" :row-type="type"></Cover>
            </div>
        </div>
    </div>
</template>

<script setup>
import Cover from '@/components/Cover/Cover.vue'

defineProps({
    itemList: {
        type: Array,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    itemName: {
        type: String,
        required: true
    }
})
</script>

<style lang="postcss"></style>
