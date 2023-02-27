<template>
    <div v-show="MySong.dailySongs">
        <div class="mt-32 text-center mb-32 space-y-2 select-none">
            <p
                class="letter text-7xl leading-tight font-semibold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500"
            >
                每日歌曲推荐
            </p>
            <p class="text-theme-base letter text-lg font-light">
                根据你的音乐口味生成 · 每天6:00更新
            </p>
        </div>
        <div>
            <template v-for="(item, index) in MySong.dailySongs" :key="item.id">
                <Track
                    :song="item"
                    :item="MySong.dailySongs"
                    @dblclick="addPlayList(MySong.dailySongs, index)"
                ></Track>
            </template>
        </div>
    </div>
</template>

<script setup lang="ts">
import Track from '@components/Track/Track.vue'
import { useMySong } from '@stores/MySong'
import { usePlay } from '@utils/player/usePlayer'
const MySong = useMySong()
const { addPlayList } = usePlay()

onMounted(() => {
    MySong.getUserPersonalRecom()
})
</script>

<style lang="postcss" scoped>
@keyframes letterspacing {
    0% {
        letter-spacing: 0em;
    }
    100% {
        letter-spacing: 0.05em;
    }
}
.letter {
    animation: letterspacing 1.5s ease-out forwards;
}
</style>
