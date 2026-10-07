import { defineStore } from "pinia"

export const useSubscriptionAdminStore = defineStore("subscriptionAdmin", () => {
  const items = ref([])
  const meta = ref({ total: 0, page: 1, pageSize: 20, totalPages: 0 })
  const loading = ref(false)

  const getItems = async ({ page = 1, pageSize = 20, q = "" } = {}) => {
    const fetch = useRequestFetch()
    loading.value = true
    try {
      const res = await fetch("/api/admin/subscription", { query: { page, pageSize, q } })
      items.value = res.data || []
      meta.value = res.meta || meta.value
    } finally {
      loading.value = false
    }
  }

  const grant = async (userId, days) => {
    const fetch = useRequestFetch()
    const res = await fetch("/api/admin/subscription", { method: "POST", body: { userId, days } })
    return res
  }

  const updateItem = async (id, payload) => {
    const fetch = useRequestFetch()
    const res = await fetch(`/api/admin/subscription/${id}`, { method: "PUT", body: payload })
    if (res.data) items.value = items.value.map((s) => (s.id === id ? { ...s, ...res.data } : s))
    return res
  }

  const deleteItem = async (id) => {
    const fetch = useRequestFetch()
    const res = await fetch(`/api/admin/subscription/${id}`, { method: "DELETE" })
    if (res.statusCode === 200) items.value = items.value.filter((s) => s.id !== id)
    return res
  }

  return { items, meta, loading, getItems, grant, updateItem, deleteItem }
})
