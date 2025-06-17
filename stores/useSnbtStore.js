import {defineStore} from 'pinia'

export const useSnbtStore = defineStore('snbt', () =>{
    const snbtData = ref(null)
    const snbtDetail = ref(null)
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

    return{
        snbtData,
    snbtDetail,
    loading,
    error,
    snbtFetch,
    snbtSlug
    }
})