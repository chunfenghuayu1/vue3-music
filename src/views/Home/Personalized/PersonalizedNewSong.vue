<template>
    <div></div>
</template>

<script setup>
import { getCurrentInstance, onActivated, ref } from 'vue'
const { proxy } = getCurrentInstance()
import { ElNotification } from 'element-plus'
// 推荐新音乐
const newSongList = ref([])
// 数据初始化
const initData = () => {
    try {
        // 获取新音乐
        proxy.$http.reqRecomNewSong({ limit: 10 }).then(res => {
            newSongList.value = res.data.result
        })
    } catch (error) {
        ElNotification({
            title: 'Error',
            message: error,
            type: 'error'
        })
    }
}
onActivated(() => {
    initData()
})
</script>

<style lang="postcss"></style>
