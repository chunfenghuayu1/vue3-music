<template>
    <div class="nav-items-left">
        <router-link to="/home">
            <SvgIcon icon-name="logo" icon-size="48"></SvgIcon>
        </router-link>

        <div class="nav-btn">
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

<style lang="postcss">
.nav-items-left {
    @apply flex flex-1 items-center space-x-8;
    .nav-btn {
        @apply flex space-x-4;
    }
}
</style>
