<template>
    <div>
        <!-- 头部 -->
        <div class="flex space-x-12 mt-8 my-16">
            <div class="flex items-center justify-center flex-shrink-0">
                <img
                    src="https://p2.music.126.net/Ak2mqnmim2sFjxKAYnRb-A==/109951163085080176.jpg?param=512y512"
                    class="rounded-lg h-72 w-72"
                />
            </div>
            <div class="flex flex-col justify-center">
                <!-- 歌单标题 -->
                <h3 class="font-bold text-4xl mb-4 lineClamp2">
                    2022全网最火最好听华语歌推荐（持更）
                </h3>
                <!-- 歌单简介 -->
                <div class="">
                    <div class="lineClamp1 text-lg">
                        <span>播放列表</span>
                        <span> &bull; </span>
                        <span>大肥猫好可爱哟</span>
                    </div>
                    <div class="lineClamp1 text-skin-tertiary text-sm">
                        <span>最后更新于2022年08月03日</span>
                        <span> &bull; </span>
                        <span>100首歌</span>
                    </div>
                </div>
                <!-- 歌单描述 -->
                <div
                    class="my-4 lineClamp3 text-skin-tertiary text-sm cursor-pointer"
                    @click="showModal"
                >
                    备受瞩目的日本新男团PSYCHIC FEVER from EXILE
                    TRIBE最新remix单曲，为7月份首张专辑《P.C.F.》中的主打热门单曲《Choose
                    One》remix版本。融合了HIPHOP和摇滚乐以及来自美国西海岸的清新之风，原曲上线后荣登多个榜单榜首，播放量达450万+。remix版本由饶舌歌手ELIONE（Eli
                    One、Billy Laurent以及EXILE TRIBE成员Leo Sano（Lee）共同完成。PSYCHIC
                    FEVER已在日本进行了多场演出，备受歌迷喜爱，今年2月，担任ØMI 演唱会LIVE TOUR 2022
                    "ANSWER..." 开场。
                </div>
                <!-- 操作区 -->
                <div class="mt-4 flex items-center space-x-8">
                    <button
                        class="py-1 px-4 rounded-lg flex items-center justify-center bg-skin-primary bg-opacity-20 flex-shrink-0"
                    >
                        <span class="font-bold text-lg text-skin-primary">播放</span>
                    </button>
                    <button
                        class="py-1 px-4 rounded-lg flex items-center justify-center bg-gray-400 bg-opacity-20 font-bold text-lg flex-shrink-0"
                    >
                        收藏
                    </button>
                    <button
                        class="py-1 px-2 rounded-lg flex items-center justify-center bg-gray-400 bg-opacity-20 flex-shrink-0"
                    >
                        &bull;&bull;&bull;
                    </button>
                </div>
            </div>
        </div>
        <!-- 列表 -->
        <div v-for="item in 10" :key="item" class="space-y-6">
            <ListItem></ListItem>
        </div>
        <Teleport to="#main">
            <Modal :show="show" @click="show = false"></Modal>
        </Teleport>
    </div>
</template>

<script setup>
// 弹出框逻辑
const show = ref(false)
const showModal = () => {
    show.value = true
}
</script>

<style lang="postcss"></style>
