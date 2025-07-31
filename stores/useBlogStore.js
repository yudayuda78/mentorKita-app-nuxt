import { defineStore } from 'pinia'


export const useBlogStore = defineStore('blog', () => {
    const blog = ref([])

    const fetchBlog = async () => {
        const response = await $fetch('/api/blog')
        blog.value = response.data
    }

    return {
        blog,
        fetchBlog
    }
})