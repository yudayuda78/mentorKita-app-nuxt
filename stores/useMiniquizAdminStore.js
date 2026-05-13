import { defineStore } from "pinia"

export const useMiniquizAdminStore = defineStore('miniquizAdmin', () => {
    const miniquizzes = ref([])
    const currentMiniquiz = ref(null)

    const getMiniquizzes = async () => {
        const fetch = useRequestFetch()
        const res = await fetch('/api/admin/miniquiz')
        miniquizzes.value = res.data
    }

    const getMiniquizById = async (id) => {
        const fetch = useRequestFetch()
        const res = await fetch(`/api/admin/miniquiz/${id}`)
        currentMiniquiz.value = res.data
    }

    const addMiniquiz = async (payload) => {
        const fetch = useRequestFetch()
        const res = await fetch('/api/admin/miniquiz', {
            method: 'POST',
            body: payload
        })
        if (res.data) {
            miniquizzes.value.push(res.data)
        }
        return res
    }

    const updateMiniquiz = async (id, payload) => {
        const fetch = useRequestFetch()
        const res = await fetch(`/api/admin/miniquiz/${id}`, {
            method: 'PUT',
            body: payload
        })
        if (res.data) {
            miniquizzes.value = miniquizzes.value.map(item => item.id === parseInt(id) ? res.data : item)
        }
        return res
    }

    const deleteMiniquiz = async (id) => {
        const fetch = useRequestFetch()
        const res = await fetch(`/api/admin/miniquiz/${id}`, {
            method: 'DELETE',
        })
        if (res.status === 200) {
            miniquizzes.value = miniquizzes.value.filter(item => item.id !== parseInt(id))
        }
        return res
    }

    // Question Actions (Placeholder for now, assuming endpoints will be similar)
    const addQuestion = async (payload) => {
        const fetch = useRequestFetch()
        const res = await fetch('/api/admin/miniquiz/question', {
            method: 'POST',
            body: payload
        })
        if (res.data && currentMiniquiz.value) {
            if (!currentMiniquiz.value.soalMiniQuiz) currentMiniquiz.value.soalMiniQuiz = []
            currentMiniquiz.value.soalMiniQuiz.push(res.data)
        }
        return res
    }

    return {
        miniquizzes,
        currentMiniquiz,
        getMiniquizzes,
        getMiniquizById,
        addMiniquiz,
        updateMiniquiz,
        deleteMiniquiz,
        addQuestion
    }
})
