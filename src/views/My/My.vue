<template>
    <div v-if="MySongs.tracksCount">
        <div>
            <!-- 标题 -->
            <div class="flex items-center space-x-4 my-8">
                <!-- 头像 -->
                <img :src="`${storageStore.avatarUrl}?param=54y54`" class="rounded-full" />
                <!-- 用户名 -->
                <h3 class="text-5xl font-bold flex-wrap">{{ storageStore.nickname }}的音乐库</h3>
            </div>
            <!-- 喜欢的音乐 -->
            <div
                class="flex space-x-6 lg:space-x-0 lg:flex-wrap lg:h-full lg:flex-col lg:space-y-8"
            >
                <!-- 左侧横幅 -->
                <div
                    class="h-56 flex justify-between flex-col flex-shrink-0 bg-skin-primary bg-opacity-20 w-1/3 rounded-lg p-4 lg:w-full cursor-pointer"
                    @click="$router.push('/likesongs')"
                >
                    <!-- 描述内容 -->
                    <div class="text-skin-primary flex-shrink-0" v-text="str"></div>
                    <!-- 喜欢的音乐 -->
                    <div class="flex justify-between">
                        <div class="flex-grow flex-shrink-0 space-y-1">
                            <div class="text-2xl font-bold text-skin-primary">我喜欢的音乐</div>
                            <div class="text-skin-primary text-sm">
                                共{{ MySongs.tracksCount }}首歌
                            </div>
                        </div>
                        <!-- 播放按钮 -->
                        <div
                            class="p-1.5 flex items-center justify-center bg-skin-primary rounded-full"
                            @click="$router.replace('/')"
                        >
                            <SvgIcon name="play" size="44" class="text-white"></SvgIcon>
                        </div>
                    </div>
                </div>
                <!-- 右侧音乐列表 -->
                <div class="w-2/3 h-56 lg:w-full flex flex-wrap items-center">
                    <div
                        v-for="(item, index) in MySongs.showLikeSongs"
                        :key="index"
                        class="w-1/3 h-1/4"
                    >
                        <TrackCover
                            :item="item"
                            :pic-url="item.al.picUrl"
                            :name="item.name"
                            :alia="item.alia"
                            :ar="item.ar"
                        ></TrackCover>
                    </div>
                </div>
            </div>
        </div>
        <div class="space-y-8">
            <!-- 歌单标题 -->
            <div class="flex justify-between items-center h-9 mt-12">
                <!-- 左侧选择区域 -->
                <div
                    class="flex space-x-8 font-bold items-center text-skin-tertiary flex-shrink-0 select-none"
                >
                    <div class="my-tag bg-gray-100">创建的歌单</div>
                    <div class="my-tag">专辑</div>
                    <div class="my-tag">艺人</div>
                    <div class="my-tag">MV</div>
                    <div class="my-tag">云盘</div>
                    <div class="my-tag">听歌排行</div>
                </div>
                <!-- 右侧 新建歌单-->
                <div class="text-sm text-skin-tertiary flex-shrink-0 cursor-pointer select-none">
                    +&nbsp;&nbsp;新建歌单
                </div>
            </div>
            <!-- 歌单内容 -->
            <div class="grid grid-cols-5 gap-8">
                <div v-for="(item, index) in MySongs.playlist(1)" :key="index">
                    <Cover :row-list-item="item" :row-type="'mylist'">
                        <template #subTilte>
                            <div>
                                <span class="text-xs text-skin-tertiary lineClamp1 mt-1">
                                    by {{ item.creator.nickname }}
                                </span>
                            </div>
                        </template>
                    </Cover>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useStorageStore } from '@/store/Storage.js'
import { useMySongs } from '@/store/MySongs.js'
const storageStore = useStorageStore()
const MySongs = useMySongs()
// onActivated(() => {
//     MySongs.getUserPlayList()
//     MySongs.getLikeList()
// })

const str = ref('你成长的经过\n你说你也在美国留学\n住在洛杉矶')
</script>

<style lang="postcss"></style>
