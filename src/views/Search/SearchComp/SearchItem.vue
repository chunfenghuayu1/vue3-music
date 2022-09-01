<template>
    <div>
        <!-- 标题 -->
        <div class="flex justify-between items-end mb-5">
            <h3 class="text-2xl font-bold">{{ title }}</h3>
            <router-link to="/search" class="text-skin-secondary font-semibold text-sm">{{
                $t.home.more
            }}</router-link>
        </div>
        <slot name="content"></slot>
    </div>
</template>

<script setup>
defineProps({
    title: {
        type: String,
        required: true
    }
})
</script>

<style lang="postcss"></style>
