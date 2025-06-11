import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth',  () => {
    const user = ref(null)
    const error = ref(null)
    
    const register = async (username, email, password) => {
    error.value = null
    try {
      const { data } = await $fetch('/api/register', {
        method: 'POST',
        body: {
          username,
          email,
          password
        }
      })

      user.value = data.user
      return true
    } catch (err) {
      error.value = err.data?.message || err.message || 'Gagal mendaftar'
      return false
    }
  }

    return {
        user,
        error,
        register
    }
})