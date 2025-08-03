import {defineStore} from 'pinia'


export const useDownloadsoalStore = defineStore('downloadsoal', () => {
    const downloadsoal = ref()

    const fetchDownloadsoal = async () => {
        if (process.server) {
            const {data} = await useAsyncData('downloadsoals', () => $fetch('/api/downloadsoal'))
            downloadsoal.value = data.value
        } else {
            const response = await $fetch('/api/downloadsoal')
            downloadsoal.value = response.data
        }
    }

    return {
        downloadsoal,
        fetchDownloadsoal
    }
})