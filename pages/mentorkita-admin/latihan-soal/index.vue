<script setup>


definePageMeta({
    layout: 'admin'
})

const store = useLatihanSoalAdminStore()

// Ambil data saat halaman dimuat
await store.getClasses()

const isModalOpen = ref(false)
const isModalEditOpen = ref(false)

const form = ref({
    name: ''
})

const formEdit = ref({
    name: ''
})

const currentEditId = ref(null)

const handleAddClass = async () => {
    if (!form.value.name) return
    await store.addClass(form.value)
    form.value.name = '' // Reset form
    isModalOpen.value = false // Tutup modal
}

const openEditModal = (item) => {
    currentEditId.value = item.id
    formEdit.value.name = item.name
    isModalEditOpen.value = true
}

const handleEditClass = async () => {
    if (!formEdit.value.name || !currentEditId.value) return
    await store.updateClass(currentEditId.value, formEdit.value)
    isModalEditOpen.value = false
}
</script>

<template>
    <div class="p-6">
        <div class="flex justify-between items-center mb-6">
            <h1 class="text-2xl font-bold text-gray-800">Latihan Soal</h1>
            <button 
                @click="isModalOpen = true"
                class="bg-[#2966F3] text-white px-4 py-2 rounded-xl text-sm font-semibold hover:bg-blue-700 transition-all shadow-sm flex items-center space-x-2"
            >
                <Icon name="lucide:plus" size="18" />
                <span>Tambah Kelas</span>
            </button>
        </div>

        <ul class="space-y-3">
            <li 
                v-for="item in store.classes" 
                :key="item.id" 
                class="list-item flex items-center bg-white p-4 rounded-2xl border border-gray-100 shadow-sm transition-all group"
            >
                <!-- Container Teks dan Tombol Sejajar -->
                <div class="flex items-center space-x-4">
                    <div class="flex items-center space-x-3">
                        <span class="text-xs text-gray-400 font-mono group-hover:text-white/80">#{{ item.id }}</span>
                        <span class="font-medium text-gray-700 group-hover:text-white">{{ item.name }}</span>
                    </div>

                    <!-- Tombol Aksi Langsung di Samping Nama -->
                    <div class="flex space-x-2">
                        <button class="text-blue-600 bg-blue-50 px-3 py-1.5 rounded-lg text-xs font-semibold hover:bg-blue-100 transition-colors">
                            Detail
                        </button>
                        <button 
                        @click="openEditModal(item)"
                        class="text-amber-600 bg-amber-50 px-3 py-1.5 rounded-lg text-xs font-semibold hover:bg-amber-100 transition-colors"
                    >
                        Edit
                    </button>
                        <button @click="store.deleteClass(item.id)" class="text-red-600 bg-red-50 px-3 py-1.5 rounded-lg text-xs font-semibold hover:bg-red-100 transition-colors">
                            Delete
                        </button>
                    </div>
                </div>
            </li>
        </ul>

        <div v-if="store.classes.length === 0" class="text-center py-10 text-gray-400 italic">
            Belum ada data kelas latihan.
        </div>

        <!-- Modal Form -->
        <Transition
            enter-active-class="transition duration-200 ease-out"
            enter-from-class="opacity-0"
            enter-to-class="opacity-100"
            leave-active-class="transition duration-150 ease-in"
            leave-from-class="opacity-100"
            leave-to-class="opacity-0"
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
                        <h3 class="text-xl font-bold text-gray-800">Tambah Kelas Baru</h3>
                        <button @click="isModalOpen = false" class="text-gray-400 hover:text-gray-600">
                            <Icon name="lucide:x" size="24" />
                        </button>
                    </div>
                    
                    <form @submit.prevent="handleAddClass" class="p-6 space-y-4">
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">Nama Kelas</label>
                            <input 
                                v-model="form.name"
                                type="text" 
                                placeholder="Masukkan nama kelas (contoh: SMA KELAS 10)"
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
                                class="flex-1 px-4 py-3 rounded-2xl bg-[#2966F3] font-semibold text-white hover:bg-blue-700 transition-all shadow-md"
                            >
                                Simpan Kelas
                            </button>
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
                        <h3 class="text-xl font-bold text-gray-800">Edit Kelas</h3>
                        <button @click="isModalEditOpen = false" class="text-gray-400 hover:text-gray-600">
                            <Icon name="lucide:x" size="24" />
                        </button>
                    </div>
                    
                    <form @submit.prevent="handleEditClass" class="p-6 space-y-4">
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">Nama Kelas</label>
                            <input 
                                v-model="formEdit.name"
                                type="text" 
                                class="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 outline-none transition-all text-gray-700"
                                required
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
                                class="flex-1 px-4 py-3 rounded-2xl bg-amber-500 font-semibold text-white hover:bg-amber-600 transition-all shadow-md"
                            >
                                Perbarui Kelas
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
    opacity: 0.9;
}
</style>