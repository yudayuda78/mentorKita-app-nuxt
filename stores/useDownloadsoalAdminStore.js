import { defineStore } from "pinia"

export const useDownloadsoalAdminStore = defineStore("downloadsoalAdmin", () => {
  const items = ref([])

  const getItems = async () => {
    const fetch = useRequestFetch()
    const res = await fetch("/api/admin/downloadsoal")
    items.value = res.data || []
  }

  const addItem = async (payload) => {
    const fetch = useRequestFetch()
    const res = await fetch("/api/admin/downloadsoal", { method: "POST", body: payload })
    if (res.data) items.value.unshift(res.data)
    return res
  }

  const updateItem = async (id, payload) => {
    const fetch = useRequestFetch()
    const res = await fetch(`/api/admin/downloadsoal/${id}`, { method: "PUT", body: payload })
    if (res.data) {
      items.value = items.value.map((item) => (item.id === id ? res.data : item))
    }
    return res
  }

  const deleteItem = async (id) => {
    const fetch = useRequestFetch()
    const res = await fetch(`/api/admin/downloadsoal/${id}`, { method: "DELETE" })
    if (res.statusCode === 200) {
      items.value = items.value.filter((item) => item.id !== id)
    }
    return res
  }

  return { items, getItems, addItem, updateItem, deleteItem }
})
