import { defineStore } from "pinia"

export const useShareStore = defineStore("share", () => {
    const isShared = ref()

    const shareSnbt = async (userId, snbtTryoutId, snbtTryoutName) => {
        try{
            console.log("Sharing SNBT Tryout:", { userId, snbtTryoutId, snbtTryoutName })
            const res = await $fetch("/api/snbt/share", {
                method: "POST",
                body: {userId, snbtTryoutId, snbtTryoutName},
                credentials: 'include'
            })

            isShared.value = res.data
            return {
                status: 'success',
                message: 'SNBT Tryout berhasil dibagikan',
                data: isShared.value,
            }
        } catch (error) {
            console.error("Error sharing SNBT Tryout:", error)
            return {
                status: 'error',
                message: 'Gagal membagikan SNBT Tryout',
                data: null,
            }
        }
    }

    const getShared = async (userId, snbtTryoutId) => {
        try {
            const res = await $fetch(`/api/snbt/share?userId=${userId}&snbtTryoutId=${snbtTryoutId}`, {
                credentials: 'include'
            })
            isShared.value = res?.data ?? null
            return {
                status: 'success',
                message: 'SNBT Tryout berhasil ditemukan',
                data: isShared.value,
            }
        } catch (error) {
            console.error("Error fetching shared SNBT Tryout:", error)
            return {
                status: 'error',
                message: 'Gagal menemukan SNBT Tryout',
                data: null,
            }
        }
    }

    return {
        isShared,
        shareSnbt,
        getShared
    }

}) 