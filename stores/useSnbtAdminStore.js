import { defineStore } from "pinia"

export const useSnbtAdminStore = defineStore("snbtAdmin", () => {
  const tryouts = ref([])
  const currentTryout = ref(null)
  const materi = ref([])
  const currentMateri = ref(null)

  const getTryouts = async () => {
    const fetch = useRequestFetch()
    const res = await fetch("/api/admin/snbt")
    tryouts.value = res.data || []
  }

  const getTryoutById = async (id) => {
    const fetch = useRequestFetch()
    const res = await fetch(`/api/admin/snbt/${id}`)
    currentTryout.value = res.data || null
  }

  const addTryout = async (payload) => {
    const fetch = useRequestFetch()
    const res = await fetch("/api/admin/snbt", { method: "POST", body: payload })
    if (res.data) tryouts.value.unshift(res.data)
    return res
  }

  const updateTryout = async (id, payload) => {
    const fetch = useRequestFetch()
    const res = await fetch(`/api/admin/snbt/${id}`, { method: "PUT", body: payload })
    if (res.data) {
      tryouts.value = tryouts.value.map((item) => (item.id === id ? res.data : item))
    }
    return res
  }

  const deleteTryout = async (id) => {
    const fetch = useRequestFetch()
    const res = await fetch(`/api/admin/snbt/${id}`, { method: "DELETE" })
    if (res.statusCode === 200) {
      tryouts.value = tryouts.value.filter((item) => item.id !== id)
    }
    return res
  }

  // ---- Materi ----
  const getMateri = async (tryoutId) => {
    const fetch = useRequestFetch()
    const res = await fetch(`/api/admin/snbt/materi?tryoutId=${tryoutId}`)
    materi.value = res.data || []
  }

  const getMateriById = async (id) => {
    const fetch = useRequestFetch()
    const res = await fetch(`/api/admin/snbt/materi/${id}`)
    currentMateri.value = res.data || null
  }

  const addMateri = async (payload) => {
    const fetch = useRequestFetch()
    const res = await fetch("/api/admin/snbt/materi", { method: "POST", body: payload })
    if (res.data) materi.value.push(res.data)
    return res
  }

  const updateMateri = async (id, payload) => {
    const fetch = useRequestFetch()
    const res = await fetch(`/api/admin/snbt/materi/${id}`, { method: "PUT", body: payload })
    if (res.data) {
      materi.value = materi.value.map((item) => (item.id === id ? res.data : item))
    }
    return res
  }

  const deleteMateri = async (id) => {
    const fetch = useRequestFetch()
    const res = await fetch(`/api/admin/snbt/materi/${id}`, { method: "DELETE" })
    if (res.statusCode === 200) {
      materi.value = materi.value.filter((item) => item.id !== id)
    }
    return res
  }

  // ---- Soal ----
  const addSoal = async (payload) => {
    const fetch = useRequestFetch()
    const res = await fetch("/api/admin/snbt/soal", { method: "POST", body: payload })
    if (res.data && currentMateri.value) {
      if (!currentMateri.value.snbtSoal) currentMateri.value.snbtSoal = []
      currentMateri.value.snbtSoal.push(res.data)
    }
    return res
  }

  const updateSoal = async (id, payload) => {
    const fetch = useRequestFetch()
    const res = await fetch(`/api/admin/snbt/soal/${id}`, { method: "PUT", body: payload })
    if (res.data && currentMateri.value?.snbtSoal) {
      currentMateri.value.snbtSoal = currentMateri.value.snbtSoal.map((item) =>
        item.id === id ? res.data : item,
      )
    }
    return res
  }

  const deleteSoal = async (id) => {
    const fetch = useRequestFetch()
    const res = await fetch(`/api/admin/snbt/soal/${id}`, { method: "DELETE" })
    if (res.statusCode === 200 && currentMateri.value?.snbtSoal) {
      currentMateri.value.snbtSoal = currentMateri.value.snbtSoal.filter((item) => item.id !== id)
    }
    return res
  }

  return {
    tryouts,
    currentTryout,
    materi,
    currentMateri,
    getTryouts,
    getTryoutById,
    addTryout,
    updateTryout,
    deleteTryout,
    getMateri,
    getMateriById,
    addMateri,
    updateMateri,
    deleteMateri,
    addSoal,
    updateSoal,
    deleteSoal,
  }
})
