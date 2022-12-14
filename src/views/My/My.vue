<template>
    <div v-if="MySongs.tracksCount">
        <div ref="section1">
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
                            :pic-url="item.al.picUrl.replace(/^http:/, 'https://')"
                            :name="item.name"
                            :alia="item.alia"
                            :ar="item.ar"
                        ></TrackCover>
                    </div>
                </div>
            </div>
        </div>
        <div class="mt-16 space-y-8 min-h-screen">
            <!-- 歌单标题 -->
            <div class="flex justify-between items-center h-9">
                <!-- 左侧选择区域 -->
                <div
                    class="flex space-x-8 font-bold items-center text-skin-tertiary flex-shrink-0 select-none"
                >
                    <div
                        v-for="(item, index) in typeList"
                        :key="index"
                        class="my-tag transition-all"
                        :class="btnType === item.type ? 'bg-gray-100 text-skin-primary' : ''"
                        @click="hanlderClick(item.type)"
                    >
                        <template v-if="item.type === 1">
                            <DropDown
                                v-model:toggleShow="toggleShow"
                                v-model:type="type"
                                :row="item.child"
                            >
                                <template #button="{ active }">
                                    <div class="flex items-center justify-center space-x-1 p-2">
                                        <div>{{ active.name }}</div>
                                        <SvgIcon
                                            name="down"
                                            size="20"
                                            @click.stop="toggleShow = !toggleShow"
                                        ></SvgIcon>
                                    </div>
                                </template>
                            </DropDown>
                        </template>
                        <template v-if="item.type !== 1">
                            <div class="p-2">{{ item.name }}</div>
                        </template>
                    </div>
                </div>
                <!-- 右侧 新建歌单-->
                <!-- 功能后续考虑 -->
                <div
                    v-if="false"
                    class="text-sm text-skin-tertiary flex-shrink-0 cursor-pointer select-none"
                >
                    +&nbsp;&nbsp;新建歌单
                </div>
            </div>
            <!-- 歌单内容 -->
            <div
                :class="btnType === 5 || btnType === 6 ? '' : 'grid grid-cols-5 gap-10 lg:gap-x-5'"
            >
                <template v-if="btnType === 1">
                    <div v-for="(item, index) in MySongs.playlist(type)" :key="index">
                        <Cover :row-list-item="item" row-type="mylist">
                            <template #subTilte>
                                <div>
                                    <span class="text-xs text-skin-tertiary lineClamp1 mt-1">
                                        by {{ item.creator.nickname }}
                                    </span>
                                </div>
                            </template>
                        </Cover>
                    </div>
                </template>
                <template v-if="btnType === 2">
                    <div v-for="(item, index) in MySongs.likeAlbum" :key="index">
                        <Cover :row-list-item="item" row-type="newAlbum"></Cover>
                    </div>
                </template>
                <template v-if="btnType === 3">
                    <div v-for="(item, index) in MySongs.likeArtist" :key="index">
                        <Cover :row-list-item="item" row-type="recomArtist"></Cover>
                    </div>
                </template>
                <template v-if="btnType === 4">
                    <div v-for="(item, index) in MySongs.likeMV" :key="index">
                        <MvCover
                            :item="item"
                            :show-title="true"
                            :name="item.title"
                            :sub-text="item.creator[0]?.userName"
                            :img-url="item.coverUrl"
                            :show-artist="true"
                            :artist-id="item.creator[0]?.userId"
                        ></MvCover>
                    </div>
                </template>
                <template v-if="btnType === 5">
                    <div v-for="(item, index) in MySongs.likeCloud" :key="index">
                        <PlayListItem :song="item.simpleSong"></PlayListItem>
                    </div>
                </template>
                <template v-if="btnType === 6">
                    <div class="text-sm text-skin-tertiary flex items-center space-x-2 mb-4 ml-2">
                        <div
                            class="my-tag p-2"
                            :class="toggleDate === 1 ? 'bg-gray-100 text-skin-primary' : ''"
                            @click="toggleDate = 1"
                        >
                            最近一周
                        </div>
                        <div
                            class="my-tag p-2"
                            :class="toggleDate === 0 ? 'bg-gray-100 text-skin-primary' : ''"
                            @click="toggleDate = 0"
                        >
                            所有时间
                        </div>
                    </div>
                    <div v-for="(item, index) in MySongs.likeRecord(toggleDate)" :key="index">
                        <RecordItem :song="item.song" :count="item.playCount"></RecordItem>
                    </div>
                </template>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useStorageStore } from '@/store/Storage.js'
import { useMySongs } from '@/store/MySongs.js'
// import { RecycleScroller } from 'vue-virtual-scroller'
const storageStore = useStorageStore()
const MySongs = useMySongs()
// 切换下拉框
const toggleShow = ref(false)
const str = ref('你成长的经过\n你说你也在美国留学\n住在洛杉矶')

/**
 * 1 创建的歌单
 * 2 所有歌单
 * 3 收藏的歌单
 */
// 下拉框数据
const type = ref(1)
const typeList = reactive([
    {
        type: 1,
        child: [
            { type: 1, name: '创建的歌单' },
            { type: 2, name: '所有歌单' },
            { type: 3, name: '收藏的歌单' }
        ]
    },
    { type: 2, name: '专辑' },
    { type: 3, name: '艺人' },
    { type: 4, name: 'MV' },
    { type: 5, name: '云盘' },
    { type: 6, name: '听歌排行' }
])
// 标签切换数据
const btnType = ref(1)
// 获取需要滚动的元素
const section1 = ref()
const hanlderClick = typeV => {
    // 切换标签
    btnType.value = typeV
    // 滑动效果
    window.scrollTo({ top: section1.value.offsetHeight + 80, behavior: 'smooth' })
    // 隐藏下拉框
    toggleShow.value = false
}

// 切换听歌排行时间周期
const toggleDate = ref(1)
onActivated(() => {
    MySongs.getMyData()
})
</script>

<style lang="postcss"></style>
