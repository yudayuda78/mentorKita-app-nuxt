import { defineStore } from "pinia"

export const useLatihanSoalAdminStore = defineStore('latihanSoalAdmin', () => {
    // State
    const classes = ref([])
    const currentClass = ref(null)
    const courses = ref([])
    const currentCourse = ref(null)

    // Class Actions
    const getClasses = async() => {
        const fetch = useRequestFetch()
        const res = await fetch('/api/admin/latihan-soal/class')
        classes.value = res.data
    }

    const getClassesById = async(id) => {
        const fetch = useRequestFetch()
        const res = await fetch(`/api/admin/latihan-soal/class/${id}`)
        currentClass.value = res.data
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

    // Course Actions
    const getCourse = async() => {
        const fetch = useRequestFetch()
        const res = await fetch('/api/admin/latihan-soal/course')
        courses.value = res.data
    }

    const getCourseById = async(id) => {
        const fetch = useRequestFetch()
        const res = await fetch(`/api/admin/latihan-soal/course/${id}`)
        currentCourse.value = res.data
    }

    const addCourse = async(payload) => {
        const fetch = useRequestFetch()
        const res = await fetch('/api/admin/latihan-soal/course', {
            method: 'POST',
            body: payload
        })
        if (res.data) {
            courses.value.push(res.data)
            if (currentClass.value && currentClass.value.id === res.data.latihanClassId) {
                if (!currentClass.value.courses) currentClass.value.courses = []
                currentClass.value.courses.push(res.data)
            }
        }
    }

    const deleteCourse  = async(id) => {
        const fetch = useRequestFetch()
        const res = await fetch(`/api/admin/latihan-soal/course/${id}`, {
            method: 'DELETE',
        })
        if (res.statusCode === 200) {
            courses.value = courses.value.filter(item => item.id !== id)
        }
    }

    const updateCourse = async(id, payload) => {
        const fetch = useRequestFetch()
        const res = await fetch(`/api/admin/latihan-soal/course/${id}`, {
            method: 'PUT',
            body: payload
        })
        if (res.data) {
            courses.value = courses.value.map(item => item.id === id ? res.data : item)
            // Update juga di dalam currentClass agar halaman detail ikut berubah
            if (currentClass.value && currentClass.value.courses) {
                currentClass.value.courses = currentClass.value.courses.map(item => item.id === id ? res.data : item)
            }
        }
    }

    return { 
        classes, 
        currentClass, 
        courses, 
        currentCourse,
        getClasses, 
        getClassesById, 
        addClass, 
        deleteClass, 
        updateClass,
        getCourse, 
        getCourseById, 
        addCourse, 
        deleteCourse, 
        updateCourse
    }
})