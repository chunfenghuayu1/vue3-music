<template>
    <section class="mt-14">
        <div class="flex justify-between items-end mb-5">
            <h3 class="text-3xl font-bold text-skin-base">{{ albumName }}</h3>
            <router-link to="/my" class="text-skin-base font-semibold text-sm">
                查看更多
            </router-link>
        </div>
        <div class="grid grid-cols-5 gap-x-6 gap-y-10">
            <div v-for="(item, index) in itemList" :key="index">
                <Cover :album-list-item="item" :album-name="itemName"></Cover>
            </div>
        </div>
    </section>
</template>

<script setup>
import Cover from '@/components/Cover/Cover.vue'

defineProps({
    itemList: {
        type: Array,
        default: () => []
    },
    itemName: {
        type: String,
        default: ''
    }
})
</script>

<style lang="postcss"></style>
