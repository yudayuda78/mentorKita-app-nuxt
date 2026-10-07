import { defineStore } from "pinia"

export const useUserAdminStore = defineStore("userAdmin", () => {
  const users = ref([])
  const meta = ref({ total: 0, page: 1, pageSize: 20, totalPages: 0 })
  const loading = ref(false)

  const getUsers = async ({ page = 1, pageSize = 20, q = "" } = {}) => {
    const fetch = useRequestFetch()
    loading.value = true
    try {
      const res = await fetch("/api/admin/user", { query: { page, pageSize, q } })
      users.value = res.data || []
      meta.value = res.meta || meta.value
    } finally {
      loading.value = false
    }
  }

  const updateUser = async (id, payload) => {
    const fetch = useRequestFetch()
    const res = await fetch(`/api/admin/user/${id}`, { method: "PUT", body: payload })
    if (res.data) users.value = users.value.map((u) => (u.id === id ? { ...u, ...res.data } : u))
    return res
  }

  const deactivateUser = async (id) => {
    const fetch = useRequestFetch()
    const res = await fetch(`/api/admin/user/${id}`, { method: "DELETE" })
    if (res.data) users.value = users.value.map((u) => (u.id === id ? { ...u, isActive: false } : u))
    return res
  }

  const resetPassword = async (id, password) => {
    const fetch = useRequestFetch()
    return await fetch(`/api/admin/user/${id}/reset-password`, { method: "POST", body: { password } })
  }

  return { users, meta, loading, getUsers, updateUser, deactivateUser, resetPassword }
})
