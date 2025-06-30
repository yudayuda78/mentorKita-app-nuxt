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

            const { user: me } = await $fetch('/api/me')
            user.value = me
            

            return true
        }catch(err){
            error.value = err.data?.message || err.message || 'Gagal login'
            return false
        }
    }

    const logout = async () => {
        try {
            await $fetch('/api/logout', { method: 'POST' })
            user.value = null
        } catch (err) {
            error.value = 'Gagal logout'
        }
    }

    const updateProfile = async (profileData) => {
        try {
            console.log('Mengirim ke backend:', profileData)
             const { user, userProfile } = await $fetch('/api/profile/update', {
            method: 'PATCH', 
            body: profileData
        })

        user.value = {
            ...user,
            ...userProfile
        }

        return true
        } catch (err) {
             error.value = err.data?.message || err.message || 'Gagal memperbarui profil'
            return false
        }
    }

    const getProfile = async () => {
        try {
            const profile = await $fetch('/api/profile/me')
            user.value = profile
            return profile
        } catch (err) {
            error.value = err.data?.message || err.message || 'Gagal mengambil profil'
            return null
        }
    }


    return {
        user,
        error,
        register,
        login,
        logout,
        updateProfile,
        getProfile
    }
})