<template>
    <Transition name="modal">
        <div
            v-if="modelValue"
            class="fixed top-0 left-0 z-10 w-full h-full transition-all flex items-center justify-center"
            @click.self="$emit('update:modelValue', false)"
        >
            <div
                class="w-1/3 max-h-96 bg-white rounded-lg shadow-xl p-8 flex flex-col modal-container"
            >
                <div class="flex justify-between items-center mb-6">
                    <div class="font-bold text-xl">{{ type }}</div>
                    <div
                        class="flex justify-center items-center text-2xl font-bold cursor-pointer rounded-full hover:bg-gray-100 w-8 h-8 text-center"
                        @click="$emit('update:modelValue', false)"
                    >
                        ×
                    </div>
                </div>
                <slot name="content"></slot>
            </div>
        </div>
    </Transition>
</template>

<script setup>
// const { proxy } = getCurrentInstance()
const props = defineProps({
    modelValue: {
        type: Boolean,
        required: true
    },
    type: {
        type: String,
        default: '歌单介绍'
    }
})
defineEmits(['update:modelValue'])
watch(
    () => props.modelValue,
    value => {
        if (value) {
            document.body.classList.position = 'fixed'
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.position = ''
            document.body.style.overflow = ''
        }
    }
)
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
