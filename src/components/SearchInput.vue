<template>
    <div
        class="w-52 flex items-center justify-center rounded-lg p-1 transition-all"
        :class="
            inputFocus
                ? ' text-theme-baseActive ring-2 ring-current'
                : ' bg-theme-baseSecond text-theme-base text-opacity-40'
        "
    >
        <SvgIcon name="search" size="18" class="mx-1 fill-current"></SvgIcon>
        <input
            v-model.trim="keywords"
            type="search"
            :placeholder="inputFocus ? '' : '请输入搜索内容'"
            class="w-4/5 flex-grow outline-none bg-transparent font-semibold"
            @focus="inputFocus = true"
            @blur="inputFocus = false"
            @keydown.enter="handlerSearch"
        />
    </div>
</template>

<script setup lang="ts">
import { debounce } from 'lodash-es'
const router = useRouter()

const keywords = ref('')
const inputFocus = ref(false)
const handlerSearch = debounce(() => {
    router.push({ path: '/search', query: { kw: keywords.value } })
}, 500)
</script>

<style lang="postcss"></style>
