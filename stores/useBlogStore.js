import { defineStore } from 'pinia'


export const useBlogStore = defineStore('blog', () => {
    const blog = ref([])

    const fetchBlog = async () => {
  if (process.server) {
    const { data } = await useAsyncData('blogs', () => $fetch('/api/blog'))
    blog.value = data.value
  } else {
    const response = await $fetch('/api/blog')
    blog.value = response.data
  }
}

    return {
        blog,
        fetchBlog
    }
})