<template>
    <div class="mt-16">
        <h3 class="text-3xl font-bold text-skin-base mb-5">个性推荐</h3>
        <div class="grid grid-cols-2 gap-x-6 h-48">
            <!-- 每日推荐 -->
            <PersonalizedDaily></PersonalizedDaily>
            <!-- 热评 -->
            <PersonalizedNewSong></PersonalizedNewSong>
        </div>
    </div>
</template>

<script setup>
import PersonalizedDaily from './PersonalizedDaily.vue'
import PersonalizedNewSong from './PersonalizedNewSong.vue'
</script>

<style lang="postcss"></style>
