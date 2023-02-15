<template>
    <!-- 歌词 -->
    <el-scrollbar class="pr-16 my-12">
        <div :style="{ marginTop: '54vh' }"></div>
        <span
            v-for="(item, index) in 50"
            :key="index"
            class="flex font-bold select-none text-3xl p-4 hover:bg-white rounded-xl hover:bg-opacity-10 transition duration-300 origin-left ease-out"
            :class="1 === index ? 'scale-100 opacity-80' : 'scale-90 opacity-30'"
        >
            何故远走潇湘 你却语多委婉 何故远走潇湘 你却语多委婉
        </span>
        <div :style="{ marginBottom: '54vh' }"></div>
    </el-scrollbar>
</template>

<script setup lang="ts">
import { usePlay } from '@utils/player/usePlayer'
import type { ComponentInternalInstance } from 'vue'
const { proxy } = getCurrentInstance() as ComponentInternalInstance
const { currentTrack, currentTime } = usePlay()
const lyric = ref()
watchEffect(() => {
    proxy?.$http.reqLyric({ id: currentTrack.value.id, timestamp: +new Date() }).then(res => {
        lyric.value = res.lrc.lyric
        console.log(lyric.value)
    })
})
</script>

<style scoped></style>
