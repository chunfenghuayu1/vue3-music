<template>
    <div class="flex flex-1 items-center space-x-8">
        <router-link to="/home">
            <SvgIcon icon-name="logo" icon-size="48"></SvgIcon>
        </router-link>

        <div class="flex space-x-4">
            <button class="btn">
                <SvgIcon icon-name="back" icon-size="20"></SvgIcon>
            </button>
            <button class="btn">
                <SvgIcon icon-name="forward" icon-size="20"></SvgIcon>
            </button>
        </div>
    </div>
</template>

<script setup></script>

<style lang="postcss"></style>
