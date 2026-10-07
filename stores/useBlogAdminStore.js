import { defineStore } from "pinia"

export const useBlogAdminStore = defineStore("blogAdmin", () => {
  const articles = ref([])

  const getArticles = async () => {
    const fetch = useRequestFetch()
    const res = await fetch("/api/admin/blog")
    articles.value = res.data || []
  }

  const getArticleById = async (id) => {
    const fetch = useRequestFetch()
    const res = await fetch(`/api/admin/blog/${id}`)
    return res.data
  }

  const addArticle = async (payload) => {
    const fetch = useRequestFetch()
    const res = await fetch("/api/admin/blog", { method: "POST", body: payload })
    if (res.data) articles.value.unshift(res.data)
    return res
  }

  const updateArticle = async (id, payload) => {
    const fetch = useRequestFetch()
    const res = await fetch(`/api/admin/blog/${id}`, { method: "PUT", body: payload })
    if (res.data) {
      articles.value = articles.value.map((item) => (item.id === id ? res.data : item))
    }
    return res
  }

  const deleteArticle = async (id) => {
    const fetch = useRequestFetch()
    const res = await fetch(`/api/admin/blog/${id}`, { method: "DELETE" })
    if (res.statusCode === 200) {
      articles.value = articles.value.filter((item) => item.id !== id)
    }
    return res
  }

  return { articles, getArticles, getArticleById, addArticle, updateArticle, deleteArticle }
})
