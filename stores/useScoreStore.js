export const useScoreStore = defineStore('score', () => {

    const allScore = ref([])         
    const error = ref(null)           
    const loading = ref(false)

    const fetchAllScore = async () => {
    loading.value = true
    try {
      const response = await $fetch('/api/score/average-score')
      // Cek apakah success === true dan ada data
      if (response.success && Array.isArray(response.data)) {
        allScore.value = response.data
      } else {
        throw new Error('Format data tidak sesuai')
      }
    } catch (err) {
      error.value = 'Terjadi kesalahan saat mengambil data'
      console.error(err)
    } finally {
      loading.value = false
    }
  }

    return {
        allScore,
        error,
        loading,
        fetchAllScore
    }
})