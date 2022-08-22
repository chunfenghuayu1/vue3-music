<template>
    <div class="mt-16">
        <div class="flex justify-between items-end mb-5">
            <h3 class="text-3xl font-bold text-skin-base">{{ $t.home.recomArtist }}</h3>
            <router-link to="/explore" class="text-skin-secondary font-semibold text-sm">
                {{ $t.home.more }}
            </router-link>
        </div>
        <div class="grid gap-x-10 grid-cols-6 lg:gap-x-5">
            <div v-for="(item, index) in itemList" :key="index">
                <Cover :row-list-item="item" :row-type="'recomArtist'"> </Cover>
            </div>
        </div>
    </div>
</template>

<script setup>
defineProps({
    itemList: {
        type: Array,
        required: true
    }
})
</script>

<style lang="postcss"></style>
