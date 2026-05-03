<script setup>
definePageMeta({
    layout: 'admin'
})

const route = useRoute()
const classId = route.params.id
const store = useLatihanSoalAdminStore()



onMounted(async() => {
    await store.getClassesById(classId)
})

const classData = computed(() => store.currentClass)
const courses = computed(() => store.currentClass?.courses || [])

const isModalOpen = ref(false)
const isModalEditOpen = ref(false)
const currentEditId = ref(null)

const form = ref({
    name: '',
    latihan_class_id: classId
})

const formEdit = ref({
    name: ''
})

const handleAddCourse = async () => {
    if (!form.value.name) return
    await store.addCourse(form.value)
    form.value.name = '' 
    isModalOpen.value = false 
}

const openEditModal = (item) => {
    currentEditId.value = item.id
    formEdit.value.name = item.name
    isModalEditOpen.value = true
}

const handleEditCourse = async () => {
    if (!formEdit.value.name || !currentEditId.value) return
    await store.updateCourse(currentEditId.value, formEdit.value)
    isModalEditOpen.value = false
}
</script>

<template>
    <div class="p-6">
        <!-- Header / Breadcrumbs -->
        <div class="flex items-center space-x-2 text-sm text-gray-400 mb-2">
            <NuxtLink to="/mentorkita-admin/latihan-soal" class="hover:text-[#2966F3] transition-colors">Latihan Soal</NuxtLink>
            <Icon name="lucide:chevron-right" size="14" />
            <span class="text-gray-600 font-medium">{{ classData?.name || 'Detail Kelas' }}</span>
        </div>

        <div class="flex justify-between items-center mb-8">
            <div>
                <h1 class="text-3xl font-bold text-gray-800">{{ classData?.name }}</h1>
                <p class="text-gray-500 text-sm mt-1">Daftar mata pelajaran (courses) dalam kelas ini</p>
            </div>
            
            <button 
                @click="isModalOpen = true"
                class="bg-[#2966F3] text-white px-5 py-2.5 rounded-2xl text-sm font-bold hover:bg-blue-700 transition-all shadow-lg flex items-center space-x-2"
            >
                <Icon name="lucide:plus" size="18" />
                <span>Tambah Course</span>
            </button>
        </div>

        <!-- Course List (Same design as Class List) -->
        <ul v-if="courses.length > 0" class="space-y-3">
            <li 
                v-for="course in courses" 
                :key="course.id"
                class="list-item flex justify-between items-center bg-white p-4 rounded-2xl border border-gray-100 shadow-sm transition-all group min-h-[70px]"
            >
                <!-- Info Course (Kiri) -->
                <div class="flex items-center space-x-3">
                    <div class="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-[#2966F3] group-hover:bg-white/20 group-hover:text-white transition-colors">
                        <Icon name="lucide:book-open" size="20" />
                    </div>
                    <div class="flex flex-col">
                        <span class="text-[10px] text-gray-400 font-mono group-hover:text-white/70 uppercase">#{{ course.id }} • {{ course.code || 'NO-CODE' }}</span>
                        <span class="font-bold text-gray-700 group-hover:text-white transition-colors">{{ course.name }}</span>
                    </div>
                </div>

                <!-- Tombol Aksi (Kanan) -->
                <div class="flex items-center space-x-2">
                    <button class="text-blue-600 bg-blue-50 px-4 py-2 rounded-xl text-xs font-bold hover:bg-blue-100 transition-colors">
                        Lihat Soal
                    </button>
                    <button 
                        @click="openEditModal(course)"
                        class="text-amber-600 bg-amber-50 px-4 py-2 rounded-xl text-xs font-bold hover:bg-amber-100 transition-colors"
                    >
                        Edit
                    </button>
                    <button class="text-red-600 bg-red-50 px-4 py-2 rounded-xl text-xs font-bold hover:bg-red-100 transition-colors">
                        Delete
                    </button>
                </div>
            </li>
        </ul>

        <!-- Empty State -->
        <div v-else class="flex flex-col items-center justify-center py-20 bg-white rounded-3xl border border-dashed border-gray-200">
            <div class="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center text-gray-300 mb-4">
                <Icon name="lucide:inbox" size="40" />
            </div>
            <h3 class="text-xl font-bold text-gray-700">Belum Ada Course</h3>
            <p class="text-gray-400 text-sm mt-1">Mulai dengan menambahkan mata pelajaran pertama untuk kelas ini.</p>
        </div>
        <!-- Modal Tambah Course (Desain seragam dengan Tambah Kelas) -->
        <Transition
            enter-active-class="transition duration-200 ease-out"
            enter-from-class="opacity-0 scale-95"
            enter-to-class="opacity-100 scale-100"
            leave-active-class="transition duration-150 ease-in"
            leave-from-class="opacity-100 scale-100"
            leave-to-class="opacity-0 scale-95"
        >
            <div 
                v-if="isModalOpen" 
                class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm cursor-pointer"
                @click="isModalOpen = false"
            >
                <div 
                    class="bg-white w-full max-w-md rounded-3xl shadow-2xl overflow-hidden transform transition-all border-2 border-[#2966F3] cursor-default"
                    @click.stop
                >
                    <div class="p-6 border-b border-gray-50 flex justify-between items-center">
                        <h3 class="text-xl font-bold text-gray-800">Tambah Course Baru</h3>
                        <button @click="isModalOpen = false" class="text-gray-400 hover:text-gray-600">
                            <Icon name="lucide:x" size="24" />
                        </button>
                    </div>
                    
                    <form @submit.prevent="handleAddCourse" class="p-6 space-y-4">
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">Nama Course</label>
                            <input 
                                v-model="form.name"
                                type="text" 
                                placeholder="Masukkan nama mata pelajaran (contoh: SEJARAH INDONESIA)"
                                class="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:border-[#2966F3] focus:ring-2 focus:ring-[#2966F3]/20 outline-none transition-all text-gray-700"
                                required
                                autofocus
                            >
                        </div>

                        <div class="flex space-x-3 pt-2">
                            <button 
                                type="button"
                                @click="isModalOpen = false"
                                class="flex-1 px-4 py-3 rounded-2xl border border-gray-100 font-semibold text-gray-500 hover:bg-gray-50 transition-all"
                            >
                                Batal
                            </button>
                            <button 
                                type="submit"
                                class="flex-1 px-4 py-3 rounded-2xl bg-[#2966F3] font-semibold text-white hover:bg-blue-700 transition-all shadow-md shadow-blue-100"
                            >
                                Simpan Course
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </Transition>
        <!-- Modal Edit Course (Amber Theme) -->
        <Transition
            enter-active-class="transition duration-200 ease-out"
            enter-from-class="opacity-0 scale-95"
            enter-to-class="opacity-100 scale-100"
            leave-active-class="transition duration-150 ease-in"
            leave-from-class="opacity-100 scale-100"
            leave-to-class="opacity-0 scale-95"
        >
            <div 
                v-if="isModalEditOpen" 
                class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm cursor-pointer"
                @click="isModalEditOpen = false"
            >
                <div 
                    class="bg-white w-full max-w-md rounded-3xl shadow-2xl overflow-hidden transform transition-all border-2 border-amber-400 cursor-default"
                    @click.stop
                >
                    <div class="p-6 border-b border-gray-50 flex justify-between items-center">
                        <h3 class="text-xl font-bold text-gray-800">Edit Course</h3>
                        <button @click="isModalEditOpen = false" class="text-gray-400 hover:text-gray-600">
                            <Icon name="lucide:x" size="24" />
                        </button>
                    </div>
                    
                    <form @submit.prevent="handleEditCourse" class="p-6 space-y-4">
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">Nama Course</label>
                            <input 
                                v-model="formEdit.name"
                                type="text" 
                                class="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 outline-none transition-all text-gray-700"
                                required
                                autofocus
                            >
                        </div>

                        <div class="flex space-x-3 pt-2">
                            <button 
                                type="button"
                                @click="isModalEditOpen = false"
                                class="flex-1 px-4 py-3 rounded-2xl border border-gray-100 font-semibold text-gray-500 hover:bg-gray-50 transition-all"
                            >
                                Batal
                            </button>
                            <button 
                                type="submit"
                                class="flex-1 px-4 py-3 rounded-2xl bg-amber-500 font-semibold text-white hover:bg-amber-600 transition-all shadow-md shadow-amber-100"
                            >
                                Perbarui Course
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </Transition>
    </div>
</template>

<style scoped>
.list-item:hover {
    background-color: #2966F3 !important;
}

.list-item:hover span {
    color: white !important;
}
</style>
