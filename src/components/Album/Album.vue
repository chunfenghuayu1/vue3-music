<template>
    <div class="mt-16">
        <div v-if="itemName !== 'explore'" class="flex justify-between items-end mb-5">
            <h3 class="text-3xl font-bold text-skin-base">{{ itemName }}</h3>
            <router-link to="/explore" class="text-skin-secondary font-semibold text-sm">
                {{ $t.home.more }}
            </router-link>
        </div>
        <div class="grid gap-x-10 gap-y-10" :class="colsType">
            <div v-for="(item, index) in itemList" :key="index">
                <Cover :row-list-item="item" :row-type="type">
                    <!-- 推荐歌单、排行榜显示播放数量 -->
                    <template
                        v-if="type === 'recomList' || type === 'rankList' || type === 'explore'"
                        #playCount="{ playCount }"
                    >
                        <div
                            :class="type === 'explore' ? 'right-0 top-2' : 'left-0 bottom-2'"
                            class="absolute flex justify-center items-center rounded-tr-lg rounded-bl-lg pl-1.5 pr-3 py-0.5"
                        >
                            <SvgIcon icon-name="play" icon-size="18" class="opacity-90"></SvgIcon>
                            <span
                                class="italic text-white text-sm lg:text-xs flex-shrink-0 font-semibold text-opacity-90"
                                >{{ playCount }}</span
                            >
                        </div>
                    </template>
                    <!-- 排行榜显示更新频率 -->
                    <template v-if="type === 'rankList'" #subTilte="{ rowListItem }">
                        <div>
                            <span class="text-xs text-skin-tertiary lineClamp1 mt-1">
                                {{ rowListItem.updateFrequency }}
                            </span>
                        </div>
                    </template>
                    <!-- 热门新碟显示歌手名 -->
                    <template v-else-if="type === 'albumNewest'" #subTilte="{ rowListItem }">
                        <div v-for="(item1, index1) in rowListItem.artists" :key="index1">
                            <i v-if="index1 !== 0">/</i>
                            <router-link
                                to="/"
                                class="text-xs text-skin-tertiary cursor-pointer hover:underline"
                            >
                                {{ item1.name }}
                            </router-link>
                        </div>
                    </template>
                </Cover>
            </div>
        </div>
    </div>
</template>

<script setup>
import Cover from '@/components/Cover/Cover.vue'
import { computed } from 'vue'

const props = defineProps({
    itemList: {
        type: Array,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    itemName: {
        type: String,
        required: true
    }
})
const colsType = computed(() => {
    if (props.type === 'recomArtist') {
        return 'grid-cols-6'
    } else {
        return 'grid-cols-5'
    }
})
</script>

<style lang="postcss"></style>
