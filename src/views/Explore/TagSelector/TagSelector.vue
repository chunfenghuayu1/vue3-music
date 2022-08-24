<template>
    <transition name="tagSelector">
        <div
            v-if="showMore"
            class="space-y-8 p-8 bg-gray-300 bg-opacity-30 rounded-lg text-gray-800 text-opacity-80 origin-top"
        >
            <div v-for="(item, index) in categories" :key="index" class="flex space-x-8">
                <h3 class="text-2xl font-bold flex-shrink-0 h-10 flex items-center">{{ item }}</h3>
                <div class="flex flex-wrap">
                    <div
                        v-for="(tag, index1) in getTags(index)"
                        :key="index1"
                        class="flex min-w-24 items-center justify-center"
                    >
                        <span
                            class="h-10 py-1 px-2.5 flex items-center justify-center rounded-md hover:bg-skin-primary hover:bg-opacity-30 hover:text-skin-primary cursor-pointer"
                            :class="activeTags.includes(tag.name) ? 'text-skin-primary' : ''"
                            @click="storageStore.storeTags(tag)"
                        >
                            {{ tag.name }}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    </transition>
</template>

<script setup>
import localData from '@/utils/localData.js'
import { useStorageStore } from '@/store/Storage.js'
const storageStore = useStorageStore()
defineProps({
    showMore: {
        type: Boolean,
        required: true
    },
    activeTags: {
        type: Array,
        required: true
    }
})

// 类型的种类
const categories = computed(() => {
    return localData.explore.categories
})
// 类型的标签
const getTags = index => {
    return localData.explore.tags.filter(item => item.category === index * 1)
}
</script>

<style lang="postcss"></style>
