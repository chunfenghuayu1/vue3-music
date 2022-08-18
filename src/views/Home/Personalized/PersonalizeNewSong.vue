<template>
    <div>
        <h3 class="text-3xl font-bold text-skin-base mb-5">上新音乐</h3>
        <div
            class="flex space-x-6 h-52 p-4 rounded-lg shadow-lg bg-gradient-to-r from-gray-500 to-gray-700"
        >
            <!-- 歌曲图片 -->
            <div class="flex-shrink-0">
                <img
                    loading="lazy"
                    class="h-44 w-44 object-fill rounded-lg shadow-lg"
                    :src="picUrl"
                />
            </div>
            <div class="flex flex-col justify-between flex-grow">
                <div>
                    <!-- 歌曲名 -->
                    <div class="mb-2">
                        <h3 class="text-white font-bold text-2xl lineClamp1">大苏打</h3>
                    </div>
                    <!-- 歌手 -->
                    <div class="flex flex-wrap">
                        <div class="text-white text-opacity-80 font-bold text-sm flex-grow-0">
                            <span>&nbsp;/&nbsp;</span>
                            <router-link to="/" class="hover:underline"> abc </router-link>
                        </div>
                    </div>
                </div>
                <!-- 按钮操作 -->
                <div class="flex space-x-4">
                    <button class="btn m-1 p-1 cursor-pointer">
                        <SvgIcon icon-name="play" icon-size="32"></SvgIcon>
                    </button>
                    <button class="btn m-1 p-1 cursor-pointer" @click="changePic">
                        <SvgIcon icon-name="goEnd" icon-size="32"></SvgIcon>
                    </button>
                    <div class="flex flex-grow justify-end items-end m-1 p-1">
                        <p class="text-white text-opacity-80 font-bold text-sm">
                            {{ picIndex + 1 }}&nbsp;/&nbsp;{{ picLength }}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { throttle } from 'lodash'
import { computed, getCurrentInstance, ref, onActivated, watch } from 'vue'
const { proxy } = getCurrentInstance()

// // 推荐新音乐
const newSongList = ref([])
const picIndex = ref(0)
const picLength = computed(() => {
    return newSongList.value.length
})
const picUrl = computed(() => {
    return picLength.value > 0 && `${newSongList.value[picIndex.value].picUrl}?param=512y512`
})
watch(picIndex, newValue => {
    if (newValue + 1 > picLength.value) {
        picIndex.value = 0
    }
})
const changePic = throttle(() => {
    picIndex.value++
}, 300)

// 数据初始化
const initData = () => {
    try {
        // 获取新音乐
        proxy.$http.reqRecomNewSong({ limit: 10 }).then(res => {
            newSongList.value = res.data.result
        })
    } catch (error) {
        proxy.$notify({
            title: 'Error',
            message: error,
            type: 'error'
        })
    }
}

onActivated(() => {
    initData()
})
</script>

<style lang="postcss" scoped></style>
