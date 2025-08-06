import { defineStore } from "pinia";

export const useMiniquizStore = defineStore("miniquiz", () => {
    const miniquiz = ref([])

    const fetchMiniquiz = async () => {
        if (process.server) {
            const { data } = await useAsyncData('miniquizzes', () => $fetch('/api/miniquiz'))
            miniquiz.value = data.value
        } else {
            const response = await $fetch('/api/miniquiz')
            miniquiz.value = response.data
        }
    }

    return {
        miniquiz,
        fetchMiniquiz
    }
})