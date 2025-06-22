import { defineStore } from "pinia"

export const useAnalyticsStore = defineStore("analytics", () => {
    const analyticSnbt = async (userId, snbtTryoutId, snbtTryoutName) => {
        try{
            await $fetch("/api/analytic/snbt-tryout", {
                method: "POST",
                body: { userId, snbtTryoutId, snbtTryoutName},
            })
        }catch (error) {
            console.error("Error in analyticSnbt:", error)
        }
    }


    return {
        analyticSnbt,
    }
})

