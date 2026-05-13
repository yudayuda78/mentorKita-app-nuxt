<script setup>
definePageMeta({
    layout: 'admin'
})

const store = useMiniquizAdminStore()

// Ambil data saat halaman dimuat
await store.getMiniquizzes()

const isModalOpen = ref(false)
const isModalEditOpen = ref(false)
const isModalDeleteOpen = ref(false)
const itemToDelete = ref(null)

const form = ref({
    title: '',
    description: '',
    thumbnailUrl: ''
})

const formEdit = ref({
    title: '',
    description: '',
    thumbnailUrl: ''
})

const currentEditId = ref(null)

const handleAddMiniquiz = async () => {
    if (!form.value.title) return
    await store.addMiniquiz(form.value)
    form.value = { title: '', description: '', thumbnailUrl: '' } // Reset form
    isModalOpen.value = false // Tutup modal
}

const openEditModal = (item) => {
    currentEditId.value = item.id
    formEdit.value = {
        title: item.title,
        description: item.description || '',
        thumbnailUrl: item.thumbnail || ''
    }
    isModalEditOpen.value = true
}

const handleEditMiniquiz = async () => {
    if (!formEdit.value.title || !currentEditId.value) return
    await store.updateMiniquiz(currentEditId.value, formEdit.value)
    isModalEditOpen.value = false
}

const openDeleteModal = (item) => {
    itemToDelete.value = item
    isModalDeleteOpen.value = true
}

const handleConfirmDelete = async () => {
    if (!itemToDelete.value) return
    await store.deleteMiniquiz(itemToDelete.value.id)
    isModalDeleteOpen.value = false
    itemToDelete.value = null
}
</script>

<template>
    <div class="p-6">
        <div class="flex justify-between items-center mb-6">
            <h1 class="text-2xl font-bold text-gray-800">Mini Quiz</h1>
            <button 
                @click="isModalOpen = true"
                class="bg-[#2966F3] text-white px-4 py-2 rounded-xl text-sm font-semibold hover:bg-blue-700 transition-all shadow-sm flex items-center space-x-2"
            >
                <Icon name="lucide:plus" size="18" />
                <span>Tambah Mini Quiz</span>
            </button>
        </div>

        <ul class="space-y-3">
            <li 
                v-for="item in store.miniquizzes" 
                :key="item.id" 
                class="list-item flex justify-between items-center bg-white p-4 rounded-2xl border border-gray-100 shadow-sm transition-all group min-h-[72px]"
            >
                <!-- Info Quiz (Kiri) -->
                <div class="flex items-center space-x-3">
                    <span class="text-xs text-gray-400 font-mono group-hover:text-white/80 transition-colors">#{{ item.id }}</span>
                    <div class="flex flex-col">
                        <span class="font-medium text-gray-700 group-hover:text-white transition-colors">{{ item.title }}</span>
                        <span class="text-xs text-gray-400 group-hover:text-white/70 transition-colors line-clamp-1 max-w-md">{{ item.description }}</span>
                    </div>
                </div>

                <!-- Tombol Aksi (Kanan) -->
                <div class="flex items-center space-x-2">
                    <NuxtLink 
                        :to="`/mentorkita-admin/mini-quiz/${item.id}`"
                        class="text-blue-600 bg-blue-50 px-3 py-1.5 rounded-lg text-xs font-semibold hover:bg-blue-100 group-hover:bg-white group-hover:text-[#2966F3] transition-all"
                    >
                        Kelola Soal
                    </NuxtLink>
                    <button 
                        @click="openEditModal(item)"
                        class="text-amber-600 bg-amber-50 px-3 py-1.5 rounded-lg text-xs font-semibold hover:bg-amber-100 group-hover:bg-amber-400 group-hover:text-white transition-all"
                    >
                        Edit
                    </button>
                    <button 
                        @click="openDeleteModal(item)" 
                        class="text-red-600 bg-red-50 px-3 py-1.5 rounded-lg text-xs font-semibold hover:bg-red-100 group-hover:bg-red-500 group-hover:text-white transition-all"
                    >
                        Delete
                    </button>
                </div>
            </li>
        </ul>

        <div v-if="store.miniquizzes.length === 0" class="text-center py-10 text-gray-400 italic">
            Belum ada data mini quiz.
        </div>

        <!-- Modal Add Form -->
        <Transition
            enter-active-class="transition duration-200 ease-out"
            enter-from-class="opacity-0"
            enter-to-class="opacity-100"
            leave-active-class="transition duration-150 ease-in"
            leave-from-class="opacity-100"
            leave-to-class="opacity-0"
        >
            <div v-if="isModalOpen" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" @click="isModalOpen = false">
                <div class="bg-white w-full max-w-md rounded-3xl shadow-2xl overflow-hidden border-2 border-[#2966F3]" @click.stop>
                    <div class="p-6 border-b border-gray-50 flex justify-between items-center">
                        <h3 class="text-xl font-bold text-gray-800">Tambah Mini Quiz Baru</h3>
                        <button @click="isModalOpen = false" class="text-gray-400 hover:text-gray-600">
                            <Icon name="lucide:x" size="24" />
                        </button>
                    </div>
                    
                    <form @submit.prevent="handleAddMiniquiz" class="p-6 space-y-4">
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">Judul</label>
                            <input v-model="form.title" type="text" placeholder="Masukkan judul mini quiz" class="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:border-[#2966F3] outline-none" required>
                        </div>
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">Deskripsi</label>
                            <textarea v-model="form.description" placeholder="Masukkan deskripsi" class="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:border-[#2966F3] outline-none" rows="3"></textarea>
                        </div>
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">Thumbnail URL</label>
                            <input v-model="form.thumbnailUrl" type="text" placeholder="https://example.com/image.jpg" class="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:border-[#2966F3] outline-none">
                        </div>

                        <div class="flex space-x-3 pt-2">
                            <button type="button" @click="isModalOpen = false" class="flex-1 px-4 py-3 rounded-2xl border border-gray-100 font-semibold text-gray-500">Batal</button>
                            <button type="submit" class="flex-1 px-4 py-3 rounded-2xl bg-[#2966F3] font-semibold text-white shadow-md">Simpan</button>
                        </div>
                    </form>
                </div>
            </div>
        </Transition>

        <!-- Modal Edit Form -->
        <Transition
            enter-active-class="transition duration-200 ease-out"
            enter-from-class="opacity-0"
            enter-to-class="opacity-100"
            leave-active-class="transition duration-150 ease-in"
            leave-from-class="opacity-100"
            leave-to-class="opacity-0"
        >
            <div v-if="isModalEditOpen" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" @click="isModalEditOpen = false">
                <div class="bg-white w-full max-w-md rounded-3xl shadow-2xl overflow-hidden border-2 border-amber-400" @click.stop>
                    <div class="p-6 border-b border-gray-50 flex justify-between items-center">
                        <h3 class="text-xl font-bold text-gray-800">Edit Mini Quiz</h3>
                        <button @click="isModalEditOpen = false" class="text-gray-400 hover:text-gray-600">
                            <Icon name="lucide:x" size="24" />
                        </button>
                    </div>
                    
                    <form @submit.prevent="handleEditMiniquiz" class="p-6 space-y-4">
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">Judul</label>
                            <input v-model="formEdit.title" type="text" class="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:border-amber-400 outline-none" required>
                        </div>
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">Deskripsi</label>
                            <textarea v-model="formEdit.description" class="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:border-amber-400 outline-none" rows="3"></textarea>
                        </div>
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">Thumbnail URL</label>
                            <input v-model="formEdit.thumbnailUrl" type="text" class="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:border-amber-400 outline-none">
                        </div>

                        <div class="flex space-x-3 pt-2">
                            <button type="button" @click="isModalEditOpen = false" class="flex-1 px-4 py-3 rounded-2xl border border-gray-100 font-semibold text-gray-500">Batal</button>
                            <button type="submit" class="flex-1 px-4 py-3 rounded-2xl bg-amber-500 font-semibold text-white shadow-md">Perbarui</button>
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
            <div v-if="isModalDeleteOpen" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" @click="isModalDeleteOpen = false">
                <div class="bg-white w-full max-w-sm rounded-3xl shadow-2xl overflow-hidden p-8 text-center" @click.stop>
                    <div class="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center text-red-500 mx-auto mb-6">
                        <Icon name="lucide:alert-triangle" size="40" />
                    </div>
                    <h3 class="text-xl font-bold text-gray-800 mb-2">Hapus Mini Quiz?</h3>
                    <p class="text-gray-500 text-sm mb-8">Apakah Anda yakin ingin menghapus <span class="font-bold text-gray-700">"{{ itemToDelete?.title }}"</span>?</p>
                    <div class="flex space-x-3">
                        <button @click="isModalDeleteOpen = false" class="flex-1 px-4 py-3 rounded-2xl border border-gray-100 font-semibold text-gray-500">Batal</button>
                        <button @click="handleConfirmDelete" class="flex-1 px-4 py-3 rounded-2xl bg-red-600 font-semibold text-white shadow-md">Ya, Hapus</button>
                    </div>
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
