import { defineStore } from "pinia"

export const useAccountAdminStore = defineStore("accountAdmin", () => {
  const accounts = ref([])
  const loading = ref(false)

  const getAccounts = async () => {
    const fetch = useRequestFetch()
    loading.value = true
    try {
      const res = await fetch("/api/admin/account")
      accounts.value = res.data || []
    } finally {
      loading.value = false
    }
  }

  const addAccount = async (payload) => {
    const fetch = useRequestFetch()
    const res = await fetch("/api/admin/account", { method: "POST", body: payload })
    if (res.data) accounts.value.push(res.data)
    return res
  }

  const updateAccount = async (id, payload) => {
    const fetch = useRequestFetch()
    const res = await fetch(`/api/admin/account/${id}`, { method: "PUT", body: payload })
    if (res.data) accounts.value = accounts.value.map((a) => (a.id === id ? res.data : a))
    return res
  }

  const deleteAccount = async (id) => {
    const fetch = useRequestFetch()
    const res = await fetch(`/api/admin/account/${id}`, { method: "DELETE" })
    if (res.statusCode === 200) accounts.value = accounts.value.filter((a) => a.id !== id)
    return res
  }

  return { accounts, loading, getAccounts, addAccount, updateAccount, deleteAccount }
})
