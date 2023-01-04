<template>
    <div v-if="albumList.length > 0">
        <Section
            :title="'推荐歌单'"
            :columns="true"
            :isMore="true"
            :list="albumList"
            :isTextCenter="false"
            :isRounded="false"
            :listType="'歌单'"
        >
            <template #more>
                <router-link to="/explore" class="font-semibold text-sm">查看更多</router-link>
            </template>
        </Section>
        <Section
            :title="'热门歌手'"
            :columns="false"
            :isMore="false"
            :list="topArtists"
            :isTextCenter="true"
            :isRounded="true"
            :listType="'歌手'"
        ></Section>
        <corusal-section :list="albumNewestList"></corusal-section>
        <Section
            :title="'排行榜'"
            :columns="true"
            :isMore="true"
            :list="rankList"
            :isTextCenter="false"
            :isRounded="false"
            :listType="'歌单'"
        >
            <template #more>
                <router-link to="/explore" class="font-semibold text-sm">查看更多</router-link>
            </template>
        </Section>
    </div>
</template>

<script setup lang="ts">
import Section from '@/components/Section.vue'

import { sampleSize } from 'lodash'

import type { ComponentInternalInstance } from 'vue'
import type { DataList } from './index'
const { proxy } = getCurrentInstance() as ComponentInternalInstance

const dataList: DataList = reactive({
    albumList: [],
    topArtists: [],
    albumNewestList: [],
    rankList: []
})

const { albumList, topArtists, albumNewestList, rankList } = toRefs(dataList)
const getData = () => {
    try {
        // 推荐歌单数据获取
        proxy?.$http.reqAlbumListList({ limit: 10 }).then(res => {
            dataList.albumList = res.result
        })
        // 热门歌手数据
        proxy?.$http.reqTopArtists({ limit: 20 }).then(res => {
            dataList.topArtists = sampleSize(res.artists, 6)
        })
        // 最新专辑数据
        proxy?.$http.reqAlbumNewest().then(res => {
            dataList.albumNewestList = res.albums
        })
        // 排行榜单数据获取
        proxy?.$http.reqRankList().then(res => {
            dataList.rankList = res.list.splice(0, 5)
        })
    } catch (error: any) {
        proxy?.$message({
            message: error,
            type: 'warning'
        })
    }
}

getData()
</script>

<style scoped></style>
