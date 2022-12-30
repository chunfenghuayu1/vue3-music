<template>
    <el-scrollbar height="100vh">
        <NavBar></NavBar>
        <div class="px-10vw lg:px-10 pb-16">
            <router-view></router-view>
        </div>
    </el-scrollbar>
</template>
<script setup lang="ts"></script>
<style lang="postcss">
.el-scrollbar__bar {
    z-index: 20;
}
</style>
