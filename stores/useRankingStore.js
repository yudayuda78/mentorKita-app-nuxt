import { defineStore } from "pinia"

export const useRankingStore = defineStore("ranking", () => {
  const entries = ref([])
  const meta = ref({ total: 0, page: 1, pageSize: 20, totalPages: 0 })
  const tryout = ref(null)
  const tryoutOptions = ref([])
  const loading = ref(false)
  const error = ref(null)

  const fetchTryouts = async () => {
    try {
      const res = await $fetch("/api/ranking/tryouts")
      if (res.success) {
        tryoutOptions.value = res.data
      }
    } catch (err) {
      console.error("Gagal memuat daftar tryout:", err)
    }
  }

  const fetchLeaderboard = async ({ slug, page = 1, pageSize = 20, q = "" }) => {
    loading.value = true
    error.value = null
    try {
      const res = await $fetch("/api/ranking/leaderboard", {
        query: { tryoutSlug: slug, page, pageSize, q },
      })
      entries.value = res.data || []
      meta.value = res.meta || { total: 0, page, pageSize, totalPages: 0 }
      tryout.value = res.tryout || null
    } catch (err) {
      error.value = err?.data?.statusMessage || err?.message || "Gagal memuat ranking"
      entries.value = []
      meta.value = { total: 0, page, pageSize, totalPages: 0 }
    } finally {
      loading.value = false
    }
  }

  return {
    entries,
    meta,
    tryout,
    tryoutOptions,
    loading,
    error,
    fetchTryouts,
    fetchLeaderboard,
  }
})
