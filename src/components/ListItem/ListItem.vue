<template>
    <div
        class="flex space-x-6 items-center hover:bg-opacity-10 hover:bg-skin-tertiary transition-all rounded-lg p-2 my-2 min-w-max"
        @mouseenter="showBtn = true"
        @mouseleave="showBtn = false"
    >
        <!-- 歌曲图片 -->
        <div class="flex items-center justify-center rounded-md overflow-hidden relative">
            <img
                src="http://p2.music.126.net/VldbGI7kjph0TeIbttQHGQ==/109951167672625652.jpg?param=48y48"
            />
            <!-- 遮罩层 -->
            <div
                v-show="showBtn"
                class="absolute bg-gray-900 bg-opacity-40 w-full h-full flex items-center justify-center cursor-pointer"
            >
                <SvgIcon name="play" size="28"></SvgIcon>
            </div>
        </div>
        <!-- 歌名 作者 -->
        <div class="flex flex-col justify-center flex-grow">
            <p class="font-bold text-lg hover:underline cursor-pointer">错位时空</p>
            <p class="text-sm text-skin-tertiary hover:underline cursor-pointer">艾辰</p>
        </div>
        <!-- 出处 -->
        <div class="flex-grow flex items-center">
            <span class="hover:underline cursor-pointer">错位时空</span>
        </div>
        <!-- 收藏或喜欢 -->
        <div class="flex justify-end items-center w-1/6">
            <div v-show="showBtn" class="cursor-pointer">
                <SvgIcon v-if="true" name="like" size="20"></SvgIcon>
                <SvgIcon v-else name="dislike" size="20"></SvgIcon>
            </div>
        </div>
        <!-- 歌曲时间 -->
        <div>3:23</div>
    </div>
</template>

<script setup>
const showBtn = ref(false)
</script>

<style lang="postcss"></style>
