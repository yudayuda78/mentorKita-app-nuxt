<script setup>
definePageMeta({
    layout: 'admin'
})

const route = useRoute()
const courseId = route.params.id
const store = useLatihanSoalAdminStore()

onMounted(async () => {
    await store.getCourseById(courseId)
})

const courseData = computed(() => store.currentCourse)
const materiList = computed(() => store.currentCourse?.materi || [])

const isModalMateriOpen = ref(false)
const isModalEditMateriOpen = ref(false)
const isModalEditCourseOpen = ref(false)
const isModalDeleteMateriOpen = ref(false)
const currentEditMateriId = ref(null)
const itemToDelete = ref(null)

const formCourse = ref({
    name: '',
    latihan_class_id: null
})

const formMateri = ref({
    name: '',
    courseId: courseId
})

const formEditMateri = ref({
    name: ''
})

watch(courseData, (newVal) => {
    if (newVal) {
        formCourse.value.name = newVal.name
        formCourse.value.latihan_class_id = newVal.latihanClassId
    }
}, { immediate: true })

const handleUpdateCourse = async () => {
    if (!formCourse.value.name) return
    await store.updateCourse(courseId, formCourse.value)
    isModalEditCourseOpen.value = false
}

const handleAddMateri = async () => {
    if (!formMateri.value.name) return
    await store.addMateri(formMateri.value)
    formMateri.value.name = ''
    isModalMateriOpen.value = false
}

const openEditMateriModal = (item) => {
    currentEditMateriId.value = item.id
    formEditMateri.value.name = item.name
    isModalEditMateriOpen.value = true
}

const handleEditMateri = async () => {
    if (!formEditMateri.value.name || !currentEditMateriId.value) return
    await store.updateMateri(currentEditMateriId.value, formEditMateri.value)
    isModalEditMateriOpen.value = false
}

const openDeleteMateriModal = (item) => {
    itemToDelete.value = item
    isModalDeleteMateriOpen.value = true
}

const handleConfirmDeleteMateri = async () => {
    if (!itemToDelete.value) return
    await store.deleteMateri(itemToDelete.value.id)
    isModalDeleteMateriOpen.value = false
    itemToDelete.value = null
}
</script>

<template>
    <div class="p-6">
        <!-- Breadcrumbs -->
        <div class="flex items-center space-x-2 text-sm text-gray-400 mb-2">
            <NuxtLink to="/mentorkita-admin/latihan-soal" class="hover:text-[#2966F3] transition-colors">Latihan Soal</NuxtLink>
            <Icon name="lucide:chevron-right" size="14" />
            <NuxtLink :to="`/mentorkita-admin/latihan-soal/${courseData?.latihanClassId}`" class="hover:text-[#2966F3] transition-colors">Detail Kelas</NuxtLink>
            <Icon name="lucide:chevron-right" size="14" />
            <span class="text-gray-600 font-medium">{{ courseData?.name || 'Loading...' }}</span>
        </div>

        <!-- Header -->
        <div class="flex justify-between items-center mb-8">
            <div class="flex items-center space-x-4">
                <div>
                    <h1 class="text-3xl font-bold text-gray-800">{{ courseData?.name }}</h1>
                    <p class="text-gray-500 text-sm mt-1">Kelola materi dan soal untuk mata pelajaran ini</p>
                </div>
                <button 
                    @click="isModalEditCourseOpen = true"
                    class="w-10 h-10 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center hover:bg-amber-100 transition-colors shadow-sm"
                >
                    <Icon name="lucide:edit-3" size="18" />
                </button>
            </div>
            
            <button 
                @click="isModalMateriOpen = true"
                class="bg-[#2966F3] text-white px-5 py-2.5 rounded-2xl text-sm font-bold hover:bg-blue-700 transition-all shadow-lg flex items-center space-x-2"
            >
                <Icon name="lucide:plus" size="18" />
                <span>Tambah Materi</span>
            </button>
        </div>

        <!-- Materi List -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div 
                v-for="item in materiList" 
                :key="item.id"
                class="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-all group"
            >
                <div class="flex justify-between items-start mb-4">
                    <div class="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center text-[#2966F3] group-hover:bg-[#2966F3] group-hover:text-white transition-colors">
                        <Icon name="lucide:file-text" size="24" />
                    </div>
                    <div class="flex space-x-1">
                        <button 
                            @click="openEditMateriModal(item)"
                            class="p-2 text-amber-600 hover:bg-amber-50 rounded-xl transition-colors"
                        >
                            <Icon name="lucide:edit-2" size="18" />
                        </button>
                        <button 
                            @click="openDeleteMateriModal(item)"
                            class="p-2 text-red-600 hover:bg-red-50 rounded-xl transition-colors"
                        >
                            <Icon name="lucide:trash-2" size="18" />
                        </button>
                    </div>
                </div>

                <h3 class="text-lg font-bold text-gray-800 mb-1">{{ item.name }}</h3>
                <p class="text-gray-400 text-xs mb-6 uppercase tracking-wider font-mono">#ID-{{ item.id }}</p>

                <NuxtLink :to="`/mentorkita-admin/latihan-soal/materi/${item.id}`" class="w-full py-3 rounded-2xl bg-gray-50 text-gray-700 font-bold text-sm hover:bg-[#2966F3] hover:text-white transition-all flex items-center justify-center space-x-2">
                    <Icon name="lucide:layout-list" size="18" />
                    <span>Kelola Soal</span>
                </NuxtLink>
            </div>
        </div>

        <!-- Empty State -->
        <div v-if="materiList.length === 0" class="flex flex-col items-center justify-center py-20 bg-white rounded-3xl border border-dashed border-gray-200">
            <div class="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center text-gray-300 mb-4">
                <Icon name="lucide:layers" size="40" />
            </div>
            <h3 class="text-xl font-bold text-gray-700">Belum Ada Materi</h3>
            <p class="text-gray-400 text-sm mt-1">Mulai dengan menambahkan materi pertama untuk mata pelajaran ini.</p>
        </div>

        <!-- Modal Edit Course -->
        <Transition
            enter-active-class="transition duration-200 ease-out"
            enter-from-class="opacity-0 scale-95"
            enter-to-class="opacity-100 scale-100"
            leave-active-class="transition duration-150 ease-in"
            leave-from-class="opacity-100 scale-100"
            leave-to-class="opacity-0 scale-95"
        >
            <div 
                v-if="isModalEditCourseOpen" 
                class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm cursor-pointer"
                @click="isModalEditCourseOpen = false"
            >
                <div 
                    class="bg-white w-full max-w-md rounded-3xl shadow-2xl overflow-hidden transform transition-all border-2 border-amber-400 cursor-default"
                    @click.stop
                >
                    <div class="p-6 border-b border-gray-50 flex justify-between items-center">
                        <h3 class="text-xl font-bold text-gray-800">Edit Mata Pelajaran</h3>
                        <button @click="isModalEditCourseOpen = false" class="text-gray-400 hover:text-gray-600">
                            <Icon name="lucide:x" size="24" />
                        </button>
                    </div>
                    
                    <form @submit.prevent="handleUpdateCourse" class="p-6 space-y-4">
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">Nama Mata Pelajaran</label>
                            <input 
                                v-model="formCourse.name"
                                type="text" 
                                class="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 outline-none transition-all text-gray-700"
                                required
                            >
                        </div>

                        <div class="flex space-x-3 pt-2">
                            <button 
                                type="button"
                                @click="isModalEditCourseOpen = false"
                                class="flex-1 px-4 py-3 rounded-2xl border border-gray-100 font-semibold text-gray-500 hover:bg-gray-50 transition-all"
                            >
                                Batal
                            </button>
                            <button 
                                type="submit"
                                class="flex-1 px-4 py-3 rounded-2xl bg-amber-500 font-semibold text-white hover:bg-amber-600 transition-all shadow-md"
                            >
                                Perbarui
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </Transition>

        <!-- Modal Tambah Materi -->
        <Transition
            enter-active-class="transition duration-200 ease-out"
            enter-from-class="opacity-0 scale-95"
            enter-to-class="opacity-100 scale-100"
            leave-active-class="transition duration-150 ease-in"
            leave-from-class="opacity-100 scale-100"
            leave-to-class="opacity-0 scale-95"
        >
            <div 
                v-if="isModalMateriOpen" 
                class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm cursor-pointer"
                @click="isModalMateriOpen = false"
            >
                <div 
                    class="bg-white w-full max-w-md rounded-3xl shadow-2xl overflow-hidden transform transition-all border-2 border-[#2966F3] cursor-default"
                    @click.stop
                >
                    <div class="p-6 border-b border-gray-50 flex justify-between items-center">
                        <h3 class="text-xl font-bold text-gray-800">Tambah Materi Baru</h3>
                        <button @click="isModalMateriOpen = false" class="text-gray-400 hover:text-gray-600">
                            <Icon name="lucide:x" size="24" />
                        </button>
                    </div>
                    
                    <form @submit.prevent="handleAddMateri" class="p-6 space-y-4">
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">Nama Materi</label>
                            <input 
                                v-model="formMateri.name"
                                type="text" 
                                placeholder="Masukkan nama materi"
                                class="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:border-[#2966F3] focus:ring-2 focus:ring-[#2966F3]/20 outline-none transition-all text-gray-700"
                                required
                                autofocus
                            >
                        </div>

                        <div class="flex space-x-3 pt-2">
                            <button 
                                type="button"
                                @click="isModalMateriOpen = false"
                                class="flex-1 px-4 py-3 rounded-2xl border border-gray-100 font-semibold text-gray-500 hover:bg-gray-50 transition-all"
                            >
                                Batal
                            </button>
                            <button 
                                type="submit"
                                class="flex-1 px-4 py-3 rounded-2xl bg-[#2966F3] font-semibold text-white hover:bg-blue-700 transition-all shadow-md"
                            >
                                Simpan Materi
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </Transition>

        <!-- Modal Edit Materi -->
        <Transition
            enter-active-class="transition duration-200 ease-out"
            enter-from-class="opacity-0 scale-95"
            enter-to-class="opacity-100 scale-100"
            leave-active-class="transition duration-150 ease-in"
            leave-from-class="opacity-100 scale-100"
            leave-to-class="opacity-0 scale-95"
        >
            <div 
                v-if="isModalEditMateriOpen" 
                class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm cursor-pointer"
                @click="isModalEditMateriOpen = false"
            >
                <div 
                    class="bg-white w-full max-w-md rounded-3xl shadow-2xl overflow-hidden transform transition-all border-2 border-amber-400 cursor-default"
                    @click.stop
                >
                    <div class="p-6 border-b border-gray-50 flex justify-between items-center">
                        <h3 class="text-xl font-bold text-gray-800">Edit Materi</h3>
                        <button @click="isModalEditMateriOpen = false" class="text-gray-400 hover:text-gray-600">
                            <Icon name="lucide:x" size="24" />
                        </button>
                    </div>
                    
                    <form @submit.prevent="handleEditMateri" class="p-6 space-y-4">
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">Nama Materi</label>
                            <input 
                                v-model="formEditMateri.name"
                                type="text" 
                                class="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 outline-none transition-all text-gray-700"
                                required
                                autofocus
                            >
                        </div>

                        <div class="flex space-x-3 pt-2">
                            <button 
                                type="button"
                                @click="isModalEditMateriOpen = false"
                                class="flex-1 px-4 py-3 rounded-2xl border border-gray-100 font-semibold text-gray-500 hover:bg-gray-50 transition-all"
                            >
                                Batal
                            </button>
                            <button 
                                type="submit"
                                class="flex-1 px-4 py-3 rounded-2xl bg-amber-500 font-semibold text-white hover:bg-amber-600 transition-all shadow-md"
                            >
                                Perbarui Materi
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </Transition>

        <!-- Modal Delete Confirmation -->
        <Transition
            enter-active-class="transition duration-200 ease-out"
            enter-from-class="opacity-0 scale-95"
            enter-to-class="opacity-100 scale-100"
            leave-active-class="transition duration-150 ease-in"
            leave-from-class="opacity-100 scale-100"
            leave-to-class="opacity-0 scale-95"
        >
            <div 
                v-if="isModalDeleteMateriOpen" 
                class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm cursor-pointer"
                @click="isModalDeleteMateriOpen = false"
            >
                <div 
                    class="bg-white w-full max-w-sm rounded-3xl shadow-2xl overflow-hidden transform transition-all border-2 border-red-100 cursor-default p-8 text-center"
                    @click.stop
                >
                    <div class="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center text-red-500 mx-auto mb-6">
                        <Icon name="lucide:alert-triangle" size="40" />
                    </div>
                    
                    <h3 class="text-xl font-bold text-gray-800 mb-2">Hapus Materi?</h3>
                    <p class="text-gray-500 text-sm mb-8">
                        Apakah Anda yakin ingin menghapus materi <span class="font-bold text-gray-700">"{{ itemToDelete?.name }}"</span>? Semua soal di dalamnya juga akan terhapus.
                    </p>
                    
                    <div class="flex space-x-3">
                        <button 
                            @click="isModalDeleteMateriOpen = false"
                            class="flex-1 px-4 py-3 rounded-2xl border border-gray-100 font-semibold text-gray-500 hover:bg-gray-50 transition-all"
                        >
                            Batal
                        </button>
                        <button 
                            @click="handleConfirmDeleteMateri"
                            class="flex-1 px-4 py-3 rounded-2xl bg-red-600 font-semibold text-white hover:bg-red-700 transition-all shadow-md shadow-red-200"
                        >
                            Ya, Hapus
                        </button>
                    </div>
                </div>
            </div>
        </Transition>
    </div>
</template>

<style scoped>
/* Optional: add some styles if needed */
</style>
