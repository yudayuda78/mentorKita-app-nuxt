import { defineStore } from "pinia"

export const useSubscriptionStore = defineStore("subscription", () => {
    const subscriptionDetail = ref(null)
   

    const addSubscription = async (userId) => {
        try {
            const res = await $fetch("/api/subscription", {
                method: "POST",
                body: { userId },
            })
            
        } catch (error) {
            console.error("Error adding subscription:", error)
        }
    }

    const getSubscriptionDetails = async (userId) => {
        try {
            const res = await $fetch(`/api/subscription/${userId}`)
            subscriptionDetail.value = res

        } catch (error) {
            console.error("Error fetching subscription details:", error)
        }
    }

    return {
        subscriptionDetail,
        addSubscription,
        getSubscriptionDetails,
    }
})