<template>
    <div>
        <!-- 头部 -->
        <div class="flex items-center space-x-4 my-8">
            <!-- 头像 -->
            <img :src="`${storageStore.avatarUrl}?param=54y54`" class="rounded-full" />
            <!-- 用户名 -->
            <h3 class="text-5xl font-bold flex-wrap">{{ storageStore.nickname }}喜欢的音乐</h3>
        </div>
        <!-- 内容 -->
        <div>
            <template v-for="(item, index) in MySongs.showAllLikeSongs" :key="index">
                <PlayListItem :song="item"></PlayListItem>
            </template>
        </div>
    </div>
</template>

<script setup>
import { useStorageStore } from '@/store/Storage.js'
import { useMySongs } from '@/store/MySongs.js'
const storageStore = useStorageStore()
const MySongs = useMySongs()
</script>

<style lang="postcss"></style>
