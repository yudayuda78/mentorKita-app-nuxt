export const useProductStore = defineStore('product', () => {
  const products = ref([])
  const loading = ref(false)
  const error = ref(null)

  const fetchProducts = async () => {
    loading.value = true
    error.value = null
    try {
      const response = await $fetch('/api/product')
      if (response.success) {
        products.value = response.data
      } else {
        error.value = response.message || 'Gagal memuat produk'
      }
    } catch (err) {
      error.value = 'Terjadi kesalahan saat mengambil data'
      console.error(err)
    } finally {
      loading.value = false
    }
  }


  const payment = async (userId, productId, productName) => {
      try{
            await $fetch("/api/product/payment", {
                method: "POST",
                body: { userId, productId, productName},
            })
        }catch (error) {
            console.error("Error in analyticSnbt:", error)
        }
    }

  return {
    products,
    loading,
    error,
    fetchProducts,
    payment
  }
})