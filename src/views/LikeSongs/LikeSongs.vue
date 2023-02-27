<template>
    <div v-show="MySong.showAllLikeSongs">
        <!-- 头部 -->
        <div class="flex items-center space-x-4 my-8">
            <!-- 头像 -->
            <img :src="localStore.avatarUrl" class="rounded-full" />
            <!-- 用户名 -->
            <h3 class="text-5xl text-theme-base font-bold line-clamp-1">
                {{ localStore.nickname }}喜欢的音乐
            </h3>
        </div>
        <!-- 内容 -->
        <div>
            <template v-for="(item, index) in MySong.showAllLikeSongs" :key="item.id">
                <Track
                    :song="item"
                    :item="MySong.showAllLikeSongs"
                    @dblclick="addPlayList(MySong.showAllLikeSongs, index)"
                ></Track>
            </template>
        </div>
    </div>
</template>

<script setup lang="ts">
import Track from '@components/Track/Track.vue'
import { IS_ELECTRON } from '@utils/electron/myAPI'
import { useLocalStore } from '@stores/localStore'
import { useMySong } from '@stores/MySong'
import { usePlay } from '@utils/player/usePlayer'
const localStore = useLocalStore()
const MySong = useMySong()
const { addPlayList } = usePlay()
onActivated(() => {
    !IS_ELECTRON && MySong.getUserPlayList()
})
</script>

<style lang="postcss"></style>
