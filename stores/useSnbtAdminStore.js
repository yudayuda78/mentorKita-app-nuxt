import { defineStore } from "pinia"

export const useSnbtAdminStore = defineStore("snbtAdmin", () => {
  const tryouts = ref([])

  const getTryouts = async () => {
    const fetch = useRequestFetch()
    const res = await fetch("/api/admin/snbt")
    tryouts.value = res.data || []
  }

  const addTryout = async (payload) => {
    const fetch = useRequestFetch()
    const res = await fetch("/api/admin/snbt", {
      method: "POST",
      body: payload,
    })
    if (res.data) {
      tryouts.value.unshift(res.data)
    }
    return res
  }

  const updateTryout = async (id, payload) => {
    const fetch = useRequestFetch()
    const res = await fetch(`/api/admin/snbt/${id}`, {
      method: "PUT",
      body: payload,
    })
    if (res.data) {
      tryouts.value = tryouts.value.map((item) => (item.id === id ? res.data : item))
    }
    return res
  }

  const deleteTryout = async (id) => {
    const fetch = useRequestFetch()
    const res = await fetch(`/api/admin/snbt/${id}`, {
      method: "DELETE",
    })
    if (res.statusCode === 200) {
      tryouts.value = tryouts.value.filter((item) => item.id !== id)
    }
    return res
  }

  return {
    tryouts,
    getTryouts,
    addTryout,
    updateTryout,
    deleteTryout,
  }
})
