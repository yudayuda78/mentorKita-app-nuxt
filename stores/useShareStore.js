import { defineStore } from "pinia"

export const useShareStore = defineStore("share", () => {
    const isShared = ref()

    const shareSnbt = async (UserIdGet, snbtTryoutId, snbtTryoutName) => {
        try{
            const res = await $fetch("/api/snbt/share", {
                method: "POST",
                body: {userId, snbtTryoutId, snbtTryoutName}
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

    return {
        isShared,
        shareSnbt
    }
}) 