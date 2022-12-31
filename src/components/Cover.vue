<template>
    <div class="flex flex-col">
        <div
            class="mb-2 overflow-hidden text-center"
            :class="isRounded ? 'rounded-full' : 'rounded-lg'"
        >
            <router-link to="/" class="">
                <img
                    v-lazy="$imgUrl(imgUrl)"
                    :alt="listItem?.name"
                    lazy="loaded"
                    class="object-cover w-full h-full align-middle"
                />
            </router-link>
        </div>
        <div :class="isTextCenter ? 'text-center' : 'text-left'" class="line-clamp-2">
            <router-link
                to="/"
                class="cursor-pointer hover:underline font-semibold"
                :title="listItem?.name"
            >
                {{ listItem?.name }}
            </router-link>
        </div>
        <!-- 副标题插槽 -->
        <slot name="subTilte"></slot>
    </div>
</template>

<script setup lang="ts">
const props = defineProps({
    listItem: Object,
    isTextCenter: {
        type: Boolean,
        default: false
    },
    isRounded: {
        type: Boolean,
        default: false
    }
})
const imgUrl = computed(() => props.listItem?.picUrl || props.listItem?.coverImgUrl)
</script>

<style scoped></style>
