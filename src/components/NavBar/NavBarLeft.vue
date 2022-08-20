<template>
    <div class="flex flex-1 items-center lg:space-x-0 space-x-8">
        <router-link to="/">
            <SvgIcon icon-name="logo" icon-size="48" class="lg:hidden"></SvgIcon>
        </router-link>

        <div class="flex space-x-4 lg:space-x-0">
            <button class="btn m-1 p-2">
                <SvgIcon icon-name="back" icon-size="20"></SvgIcon>
            </button>
            <button class="btn m-1 p-2">
                <SvgIcon icon-name="forward" icon-size="20"></SvgIcon>
            </button>
        </div>
    </div>
</template>

<script setup></script>

<style lang="postcss"></style>
