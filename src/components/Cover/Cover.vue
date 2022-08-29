<template>
    <div class="relative" @mouseenter="show = true" @mouseleave="show = false">
        <!-- 播放按钮 遮罩层 -->
        <div
            class="flex items-center justify-center absolute top-0 min-w-full min-h-full bg-opacity-0 cursor-pointer"
            @click.self="handleRouter"
        >
            <transition name="cover-playbtn" mode="out-in">
                <div
                    v-show="show"
                    class="flex items-center justify-center backdrop-saturate-180 backdrop-blur-md rounded-full p-3 bg-white bg-opacity-20 hover:bg-opacity-30 active:scale-90 transition-all"
                    @click.stop="handlePlay"
                >
                    <SvgIcon name="play" size="32" class="text-white"></SvgIcon>
                </div>
            </transition>
        </div>
        <!-- 播放数量插槽 -->
        <slot name="playCount" :play-count="playCount"></slot>
        <!-- 图片层 -->
        <img
            :src="picUrl"
            loading="lazy"
            :class="rowType === 'recomArtist' ? 'rounded-full' : 'rounded-lg'"
            class="object-cover w-full h-full"
        />

        <!-- 图片阴影层 -->
        <transition name="cover-shadow" mode="out-in">
            <img
                v-show="show"
                :src="picUrl"
                class="w-full h-full absolute top-3 -z-10 bg-cover blur-md opacity-60 scale-95"
                :class="rowType === 'recomArtist' ? 'rounded-full' : 'rounded-lg'"
                loading="lazy"
            />
        </transition>
    </div>
    <!-- 标题 -->
    <div class="mt-2 flex items-center" :class="rowType === 'recomArtist' ? 'justify-center' : ''">
        <div v-if="rowType === 'mylist' && rowListItem.privacy !== 0" class="mr-1">
            <SvgIcon name="lock" size="18"></SvgIcon>
        </div>
        <div class="lineClamp2">
            <router-link
                :to="{ name: 'playlist', params: { id: rowListItem.id } }"
                class="cursor-pointer hover:underline font-semibold"
            >
                {{ rowListItem.name }}
            </router-link>
        </div>
    </div>
    <!-- 副标题 -->
    <slot name="subTilte" :row-list-item="rowListItem"></slot>
</template>

<script setup>
import { formatPlayCount } from '@/utils/format.js'

const props = defineProps({
    rowListItem: {
        type: Object,
        default: () => {}
    },
    rowType: {
        type: String,
        default: ''
    }
})
// 控制遮罩显示
const show = ref(false)

// 计算图片地址
const picUrl = computed(() => {
    let url = props.rowListItem.picUrl || props.rowListItem.coverImgUrl
    return `${url?.replace('http://', 'https://')}?param=512y512`
})
// 计算播放数量
const playCount = computed(() => {
    let count = props.rowListItem?.playCount
    return formatPlayCount(count)
})

// 处理跳转和播放
const router = useRouter()
const handleRouter = () => {
    // 隐藏动画
    // show.value = false
    if (props.rowType === '') {
        router.push({ name: 'playlist', params: { id: props.rowListItem.id } })
        return
    }
}
const handlePlay = () => {
    console.log(props.rowListItem)
}
onActivated(() => {
    show.value = false
})
</script>

<style lang="postcss">
.cover-shadow-enter-active,
.cover-shadow-leave-active {
    @apply transition-opacity duration-300;
}

.cover-shadow-enter-from,
.cover-shadow-leave-to {
    @apply opacity-0;
}

.cover-playbtn-enter-active,
.cover-playbtn-leave-active {
    @apply transition-all duration-300;
}

.cover-playbtn-enter-from,
.cover-playbtn-leave-to {
    @apply opacity-0 scale-90;
}
</style>
