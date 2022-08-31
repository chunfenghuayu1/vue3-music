<div
v-for="(item, index) in MySongs.showLikeSongs"
:key="index"
class="w-1/3 h-1/4 flex items-center space-x-3 py-2 px-2 hover:bg-gray-300 hover:bg-opacity-30 rounded-lg"
>
<!-- 歌曲图片 -->
<div class="flex-shrink-0 flex items-center justify-center">
    <img
        :src="`${item.al.picUrl}?param=36y36`"
        class="rounded-lg h-9 w-9"
    />
</div>
<!-- 歌曲描述 -->
<div class="flex flex-col justify-center">
    <!-- 歌名 -->
    <div class="font-bold lineClamp1 select-none">
        <span>{{ item.name }}</span>
        <span v-if="item.alia.length > 0" class="text-skin-tertiary">
            {{ item.alia[0].name }}
        </span>
    </div>
    <!-- 歌手 -->
    <div class="text-xs lineClamp1 text-skin-tertiary">
        <div
            v-for="(ar, index1) in item.ar"
            :key="index1"
            class="inline"
        >
            <span v-if="index1 !== 0"> / </span>
            <span class="cursor-pointer hover:underline">
                {{ ar.name }}
            </span>
        </div>
    </div>
</div>
</div>