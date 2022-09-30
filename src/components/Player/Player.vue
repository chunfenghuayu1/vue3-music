<template>
    <div class="player">
        <div class="progress-bar"></div>
        <div class="player-nav"></div>
    </div>
</template>

<script setup></script>

<style lang="postcss">
.player {
    @apply w-full h-16;
    .progress-bar {
        @apply w-full bg-gray-400;
    }
    .player-nav {
        @apply w-full;
    }
}
</style>
