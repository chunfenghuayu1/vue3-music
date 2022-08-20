<template>
    <div class="mt-16">
        <div class="grid grid-cols-2 gap-x-6 lg:grid-cols-1 lg:gap-y-6">
            <!-- 每日推荐 -->
            <PersonalizedDaily></PersonalizedDaily>
            <!-- 上新音乐 -->
            <PersonalizedNewSong></PersonalizedNewSong>
        </div>
    </div>
</template>

<script setup>
import PersonalizedDaily from './PersonalizedDaily.vue'
import PersonalizedNewSong from '@/views/Home/Personalized/PersonalizeNewSong.vue'
</script>

<style lang="postcss"></style>
