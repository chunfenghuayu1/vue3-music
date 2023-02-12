<template>
    <div v-show="MySong.tracksCount">
        <div ref="section1">
            <!-- 标题 -->
            <div class="flex items-center space-x-4 my-8">
                <!-- 头像 -->
                <img :src="localStore.avatarUrl" class="rounded-full" />
                <!-- 用户名 -->
                <h3 class="text-5xl font-bold flex-wrap text-theme-base">
                    {{ localStore.nickname }}的音乐库
                </h3>
            </div>
            <!-- 喜欢的音乐 -->
            <div class="flex justify-center space-x-6">
                <!-- 左侧横幅 -->
                <div
                    class="h-56 flex justify-between flex-col flex-shrink-0 bg-theme-baseActive bg-opacity-50 w-1/3 rounded-2xl p-4 cursor-pointer"
                    @click.self="$router.push('/likesongs')"
                >
                    <!-- 描述内容 -->
                    <div class="text-theme-baseActive flex-shrink-0" v-text="str"></div>
                    <!-- 喜欢的音乐 -->
                    <div class="flex justify-between">
                        <div class="flex-grow flex-shrink-0 space-y-1">
                            <div class="text-2xl font-semibold text-theme-baseActive">
                                我喜欢的音乐
                            </div>
                            <div class="text-theme-baseActive text-sm">
                                共{{ MySong.tracksCount }}首歌
                            </div>
                        </div>
                        <!-- 播放按钮 -->
                        <div
                            class="p-1.5 pr-1 w-14 h-14 flex items-center justify-center rounded-full bg-theme-baseActive bg-opacity-20"
                            @click="addPlayList(MySong.like.tracks)"
                        >
                            <SvgIcon
                                name="playfill"
                                size="42"
                                class="text-theme-baseActive fill-current"
                            ></SvgIcon>
                        </div>
                    </div>
                </div>
                <!-- 右侧音乐列表 -->
                <div class="w-2/3 h-56 flex flex-wrap items-center">
                    <div
                        v-for="item in MySong.showLikeSongs"
                        :key="item.id"
                        class="w-1/3 h-1/4 px-0.5"
                    >
                        <MyTrackItem
                            :id="item.id"
                            :pic-url="$imgUrl(item.al.picUrl, 36)"
                            :name="item.name"
                            :alia="item.alia"
                            :ar="item.ar"
                        ></MyTrackItem>
                    </div>
                </div>
            </div>
        </div>
        <div class="mt-16 space-y-8 min-h-screen">
            <!-- 歌单标题 -->
            <div class="flex justify-between items-center h-9">
                <!-- 左侧选择区域 -->
                <div
                    class="flex space-x-8 font-bold items-center text-theme-base flex-shrink-0 select-none"
                >
                    <div
                        v-for="item in typeList"
                        :key="item.name"
                        class="cursor-pointer hover:bg-theme-baseSecond hover:text-theme-baseActive rounded-lg flex justify-center items-center transition-all"
                        :class="
                            btnType === item.type ? 'bg-theme-baseSecond text-theme-baseActive' : ''
                        "
                        @click="hanlderClick(item.type)"
                    >
                        <!-- item.child可能为空 -->
                        <template v-if="item.type === 1 && item.child">
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
            </div>
            <!-- 歌单内容 -->
            <div
                :class="btnType === 5 || btnType === 6 ? '' : 'grid grid-cols-5 gap-10 lg:gap-x-5'"
            >
                <template v-if="btnType === 1">
                    <div v-for="item in MySong.playlist(type)" :key="item.id">
                        <Cover :listItem="item" listType="歌单">
                            <template #subTilte>
                                <div>
                                    <span
                                        class="text-xs font-semibold text-theme-baseSecond line-clamp-1 mt-1"
                                    >
                                        by {{ item.creator.nickname }}
                                    </span>
                                </div>
                            </template>
                        </Cover>
                    </div>
                </template>
                <template v-if="btnType === 2">
                    <div v-for="item in MySong.likeAlbum" :key="item.id">
                        <Cover :listItem="item" listType="专辑"></Cover>
                    </div>
                </template>
                <template v-if="btnType === 3">
                    <div v-for="item in MySong.likeArtist" :key="item.id">
                        <Cover :listItem="item" listType="歌手"></Cover>
                    </div>
                </template>
                <template v-if="btnType === 4">
                    <div v-for="item in MySong.likeMV" :key="item.id">
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
                    <div v-for="item in MySong.likeCloud" :key="item.id">
                        <Track :song="item.simpleSong"></Track>
                    </div>
                </template>
                <template v-if="btnType === 6">
                    <div class="text-sm text-theme-base flex items-center space-x-2 mb-4 ml-2">
                        <div
                            class="cursor-pointer hover:bg-theme-baseSecond rounded-lg flex justify-center items-center p-2 transition-all"
                            :class="toggleDate === 1 ? 'bg-theme-baseSecond' : ''"
                            @click="toggleDate = 1"
                        >
                            最近一周
                        </div>
                        <div
                            class="cursor-pointer hover:bg-theme-baseSecond rounded-lg flex justify-center items-center p-2 transition-all"
                            :class="toggleDate === 0 ? 'bg-theme-baseSecond' : ''"
                            @click="toggleDate = 0"
                        >
                            所有时间
                        </div>
                    </div>
                    <div v-for="item in MySong.likeRecord(toggleDate)" :key="item.id">
                        <Track :song="item.song" :isShowAlbum="false" :isShowOther="false">
                            <template #other>
                                <div class="font-bold text-theme-base">{{ item.playCount }}1</div>
                            </template>
                        </Track>
                    </div>
                </template>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import Track from '@components/Track/Track.vue'
import MvCover from '@components/MvCover.vue'
import Cover from '@components/Cover.vue'
import DropDown from '@components/DropDown.vue'
import MyTrackItem from '@components/Track/MyTrackItem.vue'
import { usePlay } from '@utils/player/usePlayer'
import { useLocalStore } from '@stores/localStore'
import { useMySong } from '@stores/MySong'
const localStore = useLocalStore()
const MySong = useMySong()
const { addPlayList } = usePlay()
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
        name: '歌单',
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
const scroll = inject<any>('scroll')
const hanlderClick = (typeV: number) => {
    // 切换标签
    btnType.value = typeV
    // 滑动效果
    scroll.value.scrollTo({ top: section1.value.offsetHeight + 80, behavior: 'smooth' })

    // 隐藏下拉框
    toggleShow.value = false
}

// 切换听歌排行时间周期
const toggleDate = ref(1)
onActivated(() => {
    MySong.initMySong()
    MySong.getMyData()
})
</script>

<style lang="postcss"></style>
