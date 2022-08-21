<template>
    <section>
        <!-- 标题 -->
        <div class="flex items-center space-x-4 my-8">
            <!-- 头像 -->
            <img
                src="http://p2.music.126.net/rYYhHXZHwCfizE0N46F37Q==/109951166115911716.jpg?param=64y64"
                class="rounded-full"
            />
            <!-- 用户名 -->
            <h3 class="text-5xl font-bold lineClamp1">春风化雨的音乐库</h3>
        </div>
        <!-- 喜欢的音乐 -->
        <div class="flex space-x-8 lg:space-x-0 lg:flex-wrap lg:h-full lg:flex-col lg:space-y-8">
            <!-- 左侧横幅 -->
            <div
                class="h-52 flex justify-between flex-col flex-shrink-0 bg-purple-100 w-1/3 rounded-lg p-4 lg:w-full"
            >
                <!-- 描述内容 -->
                <div class="text-purple-400 flex-shrink-0" v-text="str"></div>
                <!-- 喜欢的音乐 -->
                <div class="flex justify-between">
                    <div class="flex-grow flex-shrink-0">
                        <div class="text-2xl font-bold text-purple-400">我喜欢的音乐</div>
                        <div class="text-purple-400 text-sm">共130首歌</div>
                    </div>
                    <!-- 播放按钮 -->
                    <div class="p-1 rounded-full flex items-center justify-center bg-purple-400">
                        <SvgIcon icon-name="play" icon-size="44"></SvgIcon>
                    </div>
                </div>
            </div>
            <!-- 右侧音乐列表 -->
            <div class="w-2/3 h-52 flex flex-wrap items-center lg:w-full">
                <div
                    v-for="item in 12"
                    :key="item"
                    class="w-1/4 h-1/3 flex items-center space-x-2 px-2"
                >
                    <!-- 歌曲图片 -->
                    <div class="flex-shrink-0">
                        <img
                            src="http://p2.music.126.net/VldbGI7kjph0TeIbttQHGQ==/109951167672625652.jpg?param=36y36"
                            class="rounded-lg h-9 w-9"
                        />
                    </div>
                    <!-- 歌曲描述 -->
                    <div class="flex flex-col justify-center text-sm">
                        <!-- 歌名 -->
                        <div class="font-bold lineClamp1">热汤-《假日暖洋洋2》</div>
                        <!-- 歌手 -->
                        <div class="text-xs lineClamp1 text-gray-500">周杰伦</div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <section class="space-y-8">
        <!-- 歌单标题 -->
        <div class="flex justify-between items-center h-9 mt-12">
            <!-- 左侧选择区域 -->
            <div class="flex space-x-8 font-bold items-center text-gray-500 flex-shrink-0">
                <div class="p-2 bg-gray-100 rounded-lg text-skin-base">创建的歌单</div>
                <div>专辑</div>
                <div>艺人</div>
                <div>MV</div>
                <div>云盘</div>
                <div>听歌排行</div>
            </div>
            <!-- 右侧 新建歌单-->
            <div class="text-sm text-gray-500 flex-shrink-0">+&nbsp;&nbsp;新建歌单</div>
        </div>
        <!-- 歌单内容 -->
        <div class="grid grid-cols-5 gap-6">
            <div v-for="item in 15" :key="item">
                <div class="flex flex-col">
                    <img
                        src="http://p2.music.126.net/VldbGI7kjph0TeIbttQHGQ==/109951167672625652.jpg?param=512y512"
                        class="rounded-lg"
                    />

                    <div class="flex flex-col mt-2">
                        <div class="font-bold lineClamp1">红颜如霜</div>
                        <div class="text-sm text-gray-500 lineClamp1">周杰伦</div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
import { ref } from 'vue'
import SvgIcon from '../../components/SvgIcon/SvgIcon.vue'
const str = ref('你成长的经过\n你说你也在美国留学\n住在洛杉矶')
</script>

<style lang="postcss"></style>
