import { defineStore } from 'pinia'

export const useHomeStore = defineStore('home', {
    state: () => {
        return {
            counter: 1
        }
    }
})
