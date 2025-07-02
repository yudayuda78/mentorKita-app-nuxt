import { defineStore } from "pinia"

export const useAdminStore = defineStore("admin", () => {
  const admin = ref(null)
  const error = ref(null)

  const login = async (username, password) => {
    try {
      const response = await $fetch("/api/admin/login", {
        method: "POST",
        body: { username, password },
        credentials: 'include'
      })

      admin.value = response.admin // ✅ ini aman
      return true
    } catch (err) {
      error.value = err?.data?.message || err.message || 'Login gagal'
      return false
    }
  }

  const logout = async () => {
    try {
      await $fetch("/api/admin/logout", { method: "POST" })
      admin.value = null
    } catch (err) {
      error.value = "Gagal logout"
    }
  }

  return {
    admin,
    error,
    login,
    logout
  }
})
