import {defineStore} from 'pinia'

export const useSnbtStore = defineStore('snbt', () =>{
    const snbtData = ref(null)
    const snbtDetail = ref(null)
    const snbtSoal = ref(null)
     const loading = ref(false)
  const error = ref(null)

    const snbtFetch = async () => {
        try{
            const res = await $fetch('/api/snbt')
            snbtData.value = res.data

        }catch(error){
            error
        }
    }

    const snbtSlug = async (slug) => {
        try {
      loading.value = true
      error.value = null
      const res = await $fetch(`/api/snbt/${slug}`)
      snbtDetail.value = res.data
    } catch (err) {
      error.value = err
    } finally {
      loading.value = false
    }
    }

    const snbtSoalFetch = async (slug, id) => {
        try {
      loading.value = true
      error.value = null
      const res = await $fetch(`/api/snbt/${slug}/${id}`)
      snbtSoal.value = res.data.snbtSoal
    } catch (err) {
      error.value = err
    } finally {
      loading.value = false
    } 
    }

    const payment = async (userId, snbtTryoutId, snbtTryoutName) => {
      try{
            await $fetch("/api/tryout/payment", {
                method: "POST",
                body: { userId, snbtTryoutId, snbtTryoutName},
            })
        }catch (error) {
            console.error("Error in analyticSnbt:", error)
        }
    }

    return{
        snbtData,
    snbtDetail,
    snbtSoal,
    loading,
    error,
    snbtFetch,
    snbtSoalFetch,
    snbtSlug,
    payment
    }
})