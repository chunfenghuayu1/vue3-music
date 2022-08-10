<template>
    <div>我是Home组件</div>
    <el-button type="primary" size="default">22222</el-button>
    <p>{{ homeStore.counter }}</p>
</template>

<script setup>
import { useHomeStore } from '@/store/Home.js'

const homeStore = useHomeStore()
</script>

<style lang="less" scoped>
p {
    color: black;
    user-select: auto;
}
</style>
