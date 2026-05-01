import { defineStore } from "pinia"

export const useLatihanSoalAdminStore = defineStore('latihanSoalAdmin', () => {
    const classes = ref([])

    const getClasses = async() => {
        const fetch = useRequestFetch()
        const res = await fetch('/api/admin/latihan-soal/class')
        classes.value = res.data
    }

    const addClass = async(payload) => {
        const fetch = useRequestFetch()
        const res = await fetch('/api/admin/latihan-soal/class', {
            method: 'POST',
            body: payload
        })
        if (res.data) {
            classes.value.push(res.data)
        }
    }

    const deleteClass  = async(id) => {
        const fetch = useRequestFetch()
        const res = await fetch(`/api/admin/latihan-soal/class/${id}`, {
            method: 'DELETE',
        })
        if (res.statusCode === 200) {
            classes.value = classes.value.filter(item => item.id !== id)
        }
    }

    const updateClass = async(id, payload) => {
        const fetch = useRequestFetch()
        const res = await fetch(`/api/admin/latihan-soal/class/${id}`, {
            method: 'PUT',
            body: payload
        })
        if (res.data) {
            classes.value = classes.value.map(item => item.id === id ? res.data : item)
        }
    }

   return { getClasses, classes, addClass, deleteClass, updateClass }

})