import { defineStore } from "pinia"

export const useProductAdminStore = defineStore("productAdmin", () => {
  const products = ref([])

  const getProducts = async () => {
    const fetch = useRequestFetch()
    const res = await fetch("/api/admin/product")
    products.value = res.data || []
  }

  const addProduct = async (payload) => {
    const fetch = useRequestFetch()
    const res = await fetch("/api/admin/product", { method: "POST", body: payload })
    if (res.data) products.value.unshift(res.data)
    return res
  }

  const updateProduct = async (id, payload) => {
    const fetch = useRequestFetch()
    const res = await fetch(`/api/admin/product/${id}`, { method: "PUT", body: payload })
    if (res.data) {
      products.value = products.value.map((item) => (item.id === id ? res.data : item))
    }
    return res
  }

  const deleteProduct = async (id) => {
    const fetch = useRequestFetch()
    const res = await fetch(`/api/admin/product/${id}`, { method: "DELETE" })
    if (res.statusCode === 200) {
      products.value = products.value.filter((item) => item.id !== id)
    }
    return res
  }

  return { products, getProducts, addProduct, updateProduct, deleteProduct }
})
