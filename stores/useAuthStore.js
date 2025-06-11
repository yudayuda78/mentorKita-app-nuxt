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

    const login = async(email, password) => {
        try {
            const response = await $fetch('/api/login', {
            method: 'POST',
                body: {
                    email,
                    password
                }
            })

            return response
        }catch(err){
            error.value = err.data?.message || err.message || 'Gagal login'
            return false
        }
    }

    return {
        user,
        error,
        register,
        login
    }
})