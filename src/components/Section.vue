<template>
    <div>
        <div class="flex justify-between items-end mb-5 mt-16">
            <h3 class="text-3xl font-bold">{{ title }}</h3>
            <template v-if="isMore">
                <slot name="more"></slot>
            </template>
        </div>
        <div class="grid gap-10 lg:gap-x-5" :class="columns ? 'grid-cols-5' : 'grid-cols-6'">
            <Cover
                v-for="(item, index) in list"
                :key="index"
                :listItem="item"
                :isTextCenter="$attrs.isTextCenter === true"
                :isRounded="$attrs.isRounded === true"
                :listType="($attrs.listType as string)"
            >
                <template #subTilte v-if="item.updateFrequency">
                    <div class="text-xs text-gray-400">{{ item.updateFrequency }}</div>
                </template>
            </Cover>
        </div>
    </div>
</template>

<script setup lang="ts">
import Cover from './Cover.vue'

interface Dprops {
    // 标题
    title: string
    // 网格布局列数 如果是true 则使用5格布局
    columns: boolean
    // 是否显示更多
    isMore: boolean
    // 渲染的item
    list: any[]
}
defineProps<Dprops>()
</script>

<style></style>
