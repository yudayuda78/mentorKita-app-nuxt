import { defineStore } from "pinia"

export const useAdminStore = defineStore("admin", () => {
    const admin = ref(null)
    const error = ref(null)

    const login = async (username, password) => {
        try {
            const { data } = await $fetch("/api/admin/login", {
                method: "POST",
                body: {
                    username,
                    password
                }
            })

            admin.value = data.admin
            return true
        } catch (err) {
            error.value = err.message
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