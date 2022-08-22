<template>
    <div>
        <h3 class="text-3xl font-bold text-skin-base mb-5">{{ $t.home.personlizedSong }}</h3>
        <div
            class="h-52 rounded-lg shadow-lg bg-no-repeat bg-cover bg-center w-full"
            :class="anime ? 'bg-opacity-60' : ''"
            :style="{ backgroundImage: `url(${itemObj.picUrl})` }"
        >
            <div
                class="backdrop-saturate-180 backdrop-blur-xl w-full h-full flex space-x-6 p-4 rounded-lg"
            >
                <!-- 歌曲图片 -->
                <div class="flex-shrink-0">
                    <img
                        class="h-44 object-fill rounded-lg shadow-lg transition-all duration-700 hover:scale-105"
                        :class="anime ? 'scale-95' : ''"
                        :src="itemObj.picUrl"
                    />
                </div>
                <div class="flex flex-col justify-between flex-grow">
                    <div>
                        <!-- 歌曲名 -->
                        <div class="mb-2">
                            <h3 class="text-white font-bold text-2xl">
                                {{ itemObj.title }}
                            </h3>
                        </div>
                        <!-- 歌手 -->
                        <div class="flex flex-wrap">
                            <template v-for="(item, index) in itemObj.artistList" :key="index">
                                <div
                                    class="text-white text-opacity-80 font-bold text-sm flex-grow-0"
                                >
                                    <span v-if="index !== 0">&nbsp;/&nbsp;</span>
                                    <router-link to="/" class="hover:underline">
                                        {{ item.name }}
                                    </router-link>
                                </div>
                            </template>
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
                                {{ currentIndex + 1 }}&nbsp;/&nbsp;{{ itemObj.length }}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { throttle } from 'lodash'
const { proxy } = getCurrentInstance()

// 保存信息
const newSongList = ref([]) // 推荐新音乐
const currentIndex = ref(0) //当前索引

const itemObj = computed(() => {
    const obj = {
        picUrl: '',
        artistList: [],
        title: '',
        length: 0
    }
    const length = newSongList.value.length
    const index = currentIndex.value
    if (length > 0) {
        obj.picUrl = `${newSongList.value[index].picUrl?.replace(
            'http://',
            'https://'
        )}?param=512y512`
        obj.artistList = newSongList.value[index].song.artists
        obj.title = newSongList.value[index].name
        obj.length = newSongList.value.length
    }
    return obj
})
// 监听图片变化，开始切换动画
const anime = ref(false)
watch(
    () => itemObj.value.picUrl,
    () => {
        anime.value = true
        setTimeout(() => {
            anime.value = false
        }, 300)
    }
)
// 处理索引值点击事件
const changePic = throttle(() => {
    currentIndex.value++
    if (currentIndex.value + 1 > newSongList.value.length) {
        currentIndex.value = 0
    }
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
