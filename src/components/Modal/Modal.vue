<template>
    <Transition name="modal">
        <div
            v-if="show"
            class="fixed top-0 left-0 z-50 w-full h-full transition-all flex items-center justify-center"
            @click.self="$emit('click')"
        >
            <div
                class="w-1/3 h-2/3 bg-white rounded-lg shadow-xl p-8 flex flex-col modal-container"
            >
                <div class="flex justify-between items-center mb-6">
                    <div class="font-bold text-xl">艺术家介绍</div>
                    <div
                        class="text-2xl font-bold cursor-pointer rounded-full hover:bg-gray-100 w-8 h-8 text-center"
                        @click="$emit('click')"
                    >
                        ×
                    </div>
                </div>
                <div class="overflow-auto">
                    周杰伦（Jay
                    Chou），1979年1月18日出生于台湾省新北市，祖籍福建省泉州市永春县，中国台湾流行乐男歌手、原创音乐人、演员、导演、编剧，毕业于淡江中学。
                    2000年发行首张个人专辑《Jay》。2001年发行的专辑《范特西》奠定其融合中西方音乐的风格。2002年举行“The
                    One”世界巡回演唱会。2003年成为美国《时代周刊》封面人物。2004年获得世界音乐大奖中国区最畅销艺人奖。2005年凭借动作片《头文字D》获得台湾电影金马奖、香港电影金像奖最佳新人奖。2006年起连续三年获得世界音乐大奖中国区最畅销艺人奖。2007年自编自导的文艺片《不能说的秘密》获得台湾电影金马奖年度台湾杰出电影奖。
                    2008年凭借歌曲《青花瓷》获得第19届金曲奖最佳作曲人奖。2009年入选美国CNN评出的“25位亚洲最具影响力的人物”，同年获得第20届金曲奖最佳国语男歌手奖。2010年入选美国《Fast
                    Company》评出的“全球百大创意人物”。2011年再度获得金曲奖最佳国语男歌手奖，并且第4次获得金曲奖最佳国语专辑奖；同年主演好莱坞电影《青蜂侠》。2012年登福布斯中国名人榜榜首。2014年发行华语乐坛首张数字音乐专辑《哎呦，不错哦》。2019年起举行“嘉年华”世界巡回演唱会。
                    演艺事业外，他还涉足商业、设计等领域。2007年成立杰威尔有限公司。2011年担任华硕笔电设计师并入股香港文化传信集团。
                    周杰伦热心公益慈善，多次向中国内地灾区捐款捐物。2008年捐款援建希望小学。2014年担任中国禁毒宣传形象大使。
                </div>
            </div>
        </div>
    </Transition>
</template>

<script setup>
defineProps({
    show: {
        type: Boolean,
        required: true
    }
})
defineEmits(['click'])
</script>

<style lang="postcss">
.modal-enter-from {
    opacity: 0;
}

.modal-leave-to {
    opacity: 0;
}

.modal-enter-from .modal-container,
.modal-leave-to .modal-container {
    -webkit-transform: scale(1.1);
    transform: scale(1.1);
}
.modal-container {
    transition: all 0.3s ease;
}
</style>
