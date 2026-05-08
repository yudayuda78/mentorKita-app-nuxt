<script setup>
definePageMeta({
    layout: 'admin'
})

const route = useRoute()
const materiId = route.params.id
const store = useLatihanSoalAdminStore()

onMounted(async () => {
    await store.getMateriById(materiId)
})

const materiData = computed(() => store.currentMateri)
const soalList = computed(() => store.currentMateri?.soal || [])

const isModalSoalOpen = ref(false)
const isModalEditSoalOpen = ref(false)
const isModalDeleteSoalOpen = ref(false)
const itemToDelete = ref(null)
const currentEditSoalId = ref(null)

const initialFormSoal = {
    nomorSoal: '',
    type: 'PILIHAN_GANDA',
    question: '',
    optionA: '',
    optionB: '',
    optionC: '',
    optionD: '',
    optionE: '',
    correctOption: 'A',
    correctEssay: '',
    materiSoal: '',
    materiId: materiId
}

const formSoal = ref({ ...initialFormSoal })
const formEditSoal = ref({ ...initialFormSoal })

const resetForm = () => {
    formSoal.value = { ...initialFormSoal }
}

const handleAddSoal = async () => {
    if (!formSoal.value.question) return
    if (formSoal.value.type === 'PILIHAN_GANDA' && !formSoal.value.correctOption) return
    if (formSoal.value.type === 'ESAI' && !formSoal.value.correctEssay) return
    
    await store.addSoal(formSoal.value)
    resetForm()
    isModalSoalOpen.value = false
}

const openEditSoalModal = (item) => {
    currentEditSoalId.value = item.id
    formEditSoal.value = {
        nomorSoal: item.nomorSoal || '',
        type: item.type || 'PILIHAN_GANDA',
        question: item.question,
        optionA: item.optionA || '',
        optionB: item.optionB || '',
        optionC: item.optionC || '',
        optionD: item.optionD || '',
        optionE: item.optionE || '',
        correctOption: item.correctOption || 'A',
        correctEssay: item.correctEssay || '',
        materiSoal: item.materiSoal || '',
        materiId: materiId
    }
    isModalEditSoalOpen.value = true
}

const handleEditSoal = async () => {
    if (!formEditSoal.value.question || !currentEditSoalId.value) return
    await store.updateSoal(currentEditSoalId.value, formEditSoal.value)
    isModalEditSoalOpen.value = false
}

const openDeleteSoalModal = (item) => {
    itemToDelete.value = item
    isModalDeleteSoalOpen.value = true
}

const handleConfirmDeleteSoal = async () => {
    if (!itemToDelete.value) return
    await store.deleteSoal(itemToDelete.value.id)
    isModalDeleteSoalOpen.value = false
    itemToDelete.value = null
}
</script>

<template>
    <div class="p-6">
        <!-- Breadcrumbs -->
        <div class="flex items-center space-x-2 text-sm text-gray-400 mb-2">
            <NuxtLink to="/mentorkita-admin/latihan-soal" class="hover:text-[#2966F3] transition-colors">Latihan Soal</NuxtLink>
            <Icon name="lucide:chevron-right" size="14" />
            <NuxtLink :to="`/mentorkita-admin/latihan-soal/course/${materiData?.courseId}`" class="hover:text-[#2966F3] transition-colors">Detail Course</NuxtLink>
            <Icon name="lucide:chevron-right" size="14" />
            <span class="text-gray-600 font-medium">{{ materiData?.name || 'Loading...' }}</span>
        </div>

        <!-- Header -->
        <div class="flex justify-between items-center mb-8">
            <div>
                <h1 class="text-3xl font-bold text-gray-800">{{ materiData?.name }}</h1>
                <p class="text-gray-500 text-sm mt-1">Kelola daftar soal untuk materi ini</p>
            </div>
            
            <button 
                @click="isModalSoalOpen = true"
                class="bg-[#2966F3] text-white px-5 py-2.5 rounded-2xl text-sm font-bold hover:bg-blue-700 transition-all shadow-lg flex items-center space-x-2"
            >
                <Icon name="lucide:plus" size="18" />
                <span>Tambah Soal</span>
            </button>
        </div>

        <!-- Soal List -->
        <div class="space-y-4">
            <div 
                v-for="(item, index) in soalList" 
                :key="item.id"
                class="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-all group relative"
            >
                <div class="absolute top-6 right-6 flex space-x-2">
                    <button 
                        @click="openEditSoalModal(item)"
                        class="p-2 text-amber-600 hover:bg-amber-50 rounded-xl transition-colors bg-white shadow-sm border border-gray-100"
                        title="Edit Soal"
                    >
                        <Icon name="lucide:edit-2" size="16" />
                    </button>
                    <button 
                        @click="openDeleteSoalModal(item)"
                        class="p-2 text-red-600 hover:bg-red-50 rounded-xl transition-colors bg-white shadow-sm border border-gray-100"
                        title="Hapus Soal"
                    >
                        <Icon name="lucide:trash-2" size="16" />
                    </button>
                </div>

                <div class="flex items-start mb-4">
                    <div class="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-[#2966F3] font-bold mr-4 shrink-0">
                        {{ item.nomorSoal || index + 1 }}
                    </div>
                    <div class="flex-1 pr-24">
                        <span class="inline-block px-2 py-1 bg-gray-100 text-gray-500 text-xs rounded-lg mb-2 font-semibold">{{ item.type }}</span>
                        <h3 class="text-lg font-semibold text-gray-800 whitespace-pre-line">{{ item.question }}</h3>
                        <p v-if="item.materiSoal" class="text-gray-500 text-sm mt-3 whitespace-pre-line bg-gray-50 p-3 rounded-xl border border-gray-100"><span class="font-bold text-gray-600 block mb-1">Materi/Penjelasan Soal:</span>{{ item.materiSoal }}</p>
                        <p class="text-gray-400 text-xs mt-3 uppercase tracking-wider font-mono">#SOAL-{{ item.id }}</p>
                    </div>
                </div>

                <div v-if="item.type === 'PILIHAN_GANDA'" class="grid grid-cols-1 md:grid-cols-2 gap-3 mt-6 bg-gray-50 p-5 rounded-2xl">
                    <div :class="['p-3 rounded-xl border', item.correctOption === 'A' ? 'bg-green-50 border-green-200' : 'bg-white border-gray-200']">
                        <span class="font-bold mr-2" :class="item.correctOption === 'A' ? 'text-green-600' : 'text-gray-500'">A.</span> 
                        <span class="text-gray-700">{{ item.optionA }}</span>
                    </div>
                    <div :class="['p-3 rounded-xl border', item.correctOption === 'B' ? 'bg-green-50 border-green-200' : 'bg-white border-gray-200']">
                        <span class="font-bold mr-2" :class="item.correctOption === 'B' ? 'text-green-600' : 'text-gray-500'">B.</span> 
                        <span class="text-gray-700">{{ item.optionB }}</span>
                    </div>
                    <div :class="['p-3 rounded-xl border', item.correctOption === 'C' ? 'bg-green-50 border-green-200' : 'bg-white border-gray-200']">
                        <span class="font-bold mr-2" :class="item.correctOption === 'C' ? 'text-green-600' : 'text-gray-500'">C.</span> 
                        <span class="text-gray-700">{{ item.optionC }}</span>
                    </div>
                    <div :class="['p-3 rounded-xl border', item.correctOption === 'D' ? 'bg-green-50 border-green-200' : 'bg-white border-gray-200']">
                        <span class="font-bold mr-2" :class="item.correctOption === 'D' ? 'text-green-600' : 'text-gray-500'">D.</span> 
                        <span class="text-gray-700">{{ item.optionD }}</span>
                    </div>
                    <div :class="['p-3 rounded-xl border md:col-span-2', item.correctOption === 'E' ? 'bg-green-50 border-green-200' : 'bg-white border-gray-200']">
                        <span class="font-bold mr-2" :class="item.correctOption === 'E' ? 'text-green-600' : 'text-gray-500'">E.</span> 
                        <span class="text-gray-700">{{ item.optionE }}</span>
                    </div>
                </div>
                <div v-else-if="item.type === 'ESAI'" class="mt-6 bg-blue-50 p-5 rounded-2xl border border-blue-100">
                    <h4 class="text-xs font-bold text-blue-600 uppercase tracking-wider mb-2">Kunci Jawaban Esai</h4>
                    <p class="text-gray-700 whitespace-pre-line">{{ item.correctEssay }}</p>
                </div>
            </div>
        </div>

        <!-- Empty State -->
        <div v-if="soalList.length === 0" class="flex flex-col items-center justify-center py-20 bg-white rounded-3xl border border-dashed border-gray-200">
            <div class="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center text-gray-300 mb-4">
                <Icon name="lucide:help-circle" size="40" />
            </div>
            <h3 class="text-xl font-bold text-gray-700">Belum Ada Soal</h3>
            <p class="text-gray-400 text-sm mt-1">Mulai dengan menambahkan soal pertama untuk materi ini.</p>
        </div>

        <!-- Modal Tambah Soal -->
        <Transition
            enter-active-class="transition duration-200 ease-out"
            enter-from-class="opacity-0 scale-95"
            enter-to-class="opacity-100 scale-100"
            leave-active-class="transition duration-150 ease-in"
            leave-from-class="opacity-100 scale-100"
            leave-to-class="opacity-0 scale-95"
        >
            <div 
                v-if="isModalSoalOpen" 
                class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm cursor-pointer overflow-y-auto py-10"
                @click="isModalSoalOpen = false"
            >
                <div 
                    class="bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden transform transition-all border-2 border-[#2966F3] cursor-default my-auto"
                    @click.stop
                >
                    <div class="p-6 border-b border-gray-50 flex justify-between items-center sticky top-0 bg-white z-10">
                        <h3 class="text-xl font-bold text-gray-800">Tambah Soal</h3>
                        <button @click="isModalSoalOpen = false" class="text-gray-400 hover:text-gray-600">
                            <Icon name="lucide:x" size="24" />
                        </button>
                    </div>
                    
                    <form @submit.prevent="handleAddSoal" class="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
                        <div class="grid grid-cols-2 gap-4">
                            <div>
                                <label class="block text-sm font-semibold text-gray-700 mb-2">Tipe Soal</label>
                                <select 
                                    v-model="formSoal.type"
                                    class="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:border-[#2966F3] outline-none text-gray-700 bg-white"
                                >
                                    <option value="PILIHAN_GANDA">Pilihan Ganda</option>
                                    <option value="ESAI">Esai</option>
                                </select>
                            </div>
                            <div>
                                <label class="block text-sm font-semibold text-gray-700 mb-2">Nomor Soal (Opsional)</label>
                                <input 
                                    v-model="formSoal.nomorSoal"
                                    type="number"
                                    placeholder="Contoh: 1"
                                    class="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:border-[#2966F3] outline-none text-gray-700"
                                >
                            </div>
                        </div>

                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">Materi / Pengantar Soal (Opsional)</label>
                            <textarea 
                                v-model="formSoal.materiSoal"
                                rows="3"
                                placeholder="Misal: Bacalah teks berikut untuk menjawab soal nomor 1-3..."
                                class="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:border-[#2966F3] outline-none text-gray-700 resize-none"
                            ></textarea>
                        </div>

                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">Pertanyaan</label>
                            <textarea 
                                v-model="formSoal.question"
                                rows="4"
                                placeholder="Tuliskan pertanyaan di sini..."
                                class="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:border-[#2966F3] outline-none text-gray-700 resize-none"
                                required
                            ></textarea>
                        </div>

                        <template v-if="formSoal.type === 'PILIHAN_GANDA'">
                            <div class="space-y-4 bg-gray-50 p-5 rounded-2xl border border-gray-100">
                                <div>
                                    <label class="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Opsi A</label>
                                    <input v-model="formSoal.optionA" type="text" class="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-[#2966F3] outline-none text-gray-700" required>
                                </div>
                                <div>
                                    <label class="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Opsi B</label>
                                    <input v-model="formSoal.optionB" type="text" class="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-[#2966F3] outline-none text-gray-700" required>
                                </div>
                                <div>
                                    <label class="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Opsi C</label>
                                    <input v-model="formSoal.optionC" type="text" class="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-[#2966F3] outline-none text-gray-700" required>
                                </div>
                                <div>
                                    <label class="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Opsi D</label>
                                    <input v-model="formSoal.optionD" type="text" class="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-[#2966F3] outline-none text-gray-700" required>
                                </div>
                                <div>
                                    <label class="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Opsi E</label>
                                    <input v-model="formSoal.optionE" type="text" class="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-[#2966F3] outline-none text-gray-700" required>
                                </div>
                            </div>

                            <div>
                                <label class="block text-sm font-semibold text-gray-700 mb-2">Kunci Jawaban Benar</label>
                                <select 
                                    v-model="formSoal.correctOption"
                                    class="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:border-[#2966F3] outline-none text-gray-700 bg-white"
                                    required
                                >
                                    <option value="A">Opsi A</option>
                                    <option value="B">Opsi B</option>
                                    <option value="C">Opsi C</option>
                                    <option value="D">Opsi D</option>
                                    <option value="E">Opsi E</option>
                                </select>
                            </div>
                        </template>

                        <template v-else-if="formSoal.type === 'ESAI'">
                            <div>
                                <label class="block text-sm font-semibold text-gray-700 mb-2">Kunci Jawaban Esai</label>
                                <textarea 
                                    v-model="formSoal.correctEssay"
                                    rows="4"
                                    placeholder="Tuliskan jawaban yang benar/referensi jawaban di sini..."
                                    class="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:border-[#2966F3] outline-none text-gray-700 resize-none"
                                    required
                                ></textarea>
                            </div>
                        </template>

                        <div class="flex space-x-3 pt-4 sticky bottom-0 bg-white border-t border-gray-50 mt-4 py-4">
                            <button 
                                type="button"
                                @click="isModalSoalOpen = false"
                                class="flex-1 px-4 py-3 rounded-2xl border border-gray-100 font-semibold text-gray-500 hover:bg-gray-50 transition-all"
                            >
                                Batal
                            </button>
                            <button 
                                type="submit"
                                class="flex-1 px-4 py-3 rounded-2xl bg-[#2966F3] font-semibold text-white hover:bg-blue-700 transition-all shadow-md"
                            >
                                Simpan Soal
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </Transition>

        <!-- Modal Edit Soal -->
        <Transition
            enter-active-class="transition duration-200 ease-out"
            enter-from-class="opacity-0 scale-95"
            enter-to-class="opacity-100 scale-100"
            leave-active-class="transition duration-150 ease-in"
            leave-from-class="opacity-100 scale-100"
            leave-to-class="opacity-0 scale-95"
        >
            <div 
                v-if="isModalEditSoalOpen" 
                class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm cursor-pointer overflow-y-auto py-10"
                @click="isModalEditSoalOpen = false"
            >
                <div 
                    class="bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden transform transition-all border-2 border-amber-400 cursor-default my-auto"
                    @click.stop
                >
                    <div class="p-6 border-b border-gray-50 flex justify-between items-center sticky top-0 bg-white z-10">
                        <h3 class="text-xl font-bold text-gray-800">Edit Soal</h3>
                        <button @click="isModalEditSoalOpen = false" class="text-gray-400 hover:text-gray-600">
                            <Icon name="lucide:x" size="24" />
                        </button>
                    </div>
                    
                    <form @submit.prevent="handleEditSoal" class="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
                        <div class="grid grid-cols-2 gap-4">
                            <div>
                                <label class="block text-sm font-semibold text-gray-700 mb-2">Tipe Soal</label>
                                <select 
                                    v-model="formEditSoal.type"
                                    class="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:border-amber-400 outline-none text-gray-700 bg-white"
                                >
                                    <option value="PILIHAN_GANDA">Pilihan Ganda</option>
                                    <option value="ESAI">Esai</option>
                                </select>
                            </div>
                            <div>
                                <label class="block text-sm font-semibold text-gray-700 mb-2">Nomor Soal (Opsional)</label>
                                <input 
                                    v-model="formEditSoal.nomorSoal"
                                    type="number"
                                    placeholder="Contoh: 1"
                                    class="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:border-amber-400 outline-none text-gray-700"
                                >
                            </div>
                        </div>

                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">Materi / Pengantar Soal (Opsional)</label>
                            <textarea 
                                v-model="formEditSoal.materiSoal"
                                rows="3"
                                class="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:border-amber-400 outline-none text-gray-700 resize-none"
                            ></textarea>
                        </div>

                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">Pertanyaan</label>
                            <textarea 
                                v-model="formEditSoal.question"
                                rows="4"
                                class="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:border-amber-400 outline-none text-gray-700 resize-none"
                                required
                            ></textarea>
                        </div>

                        <template v-if="formEditSoal.type === 'PILIHAN_GANDA'">
                            <div class="space-y-4 bg-gray-50 p-5 rounded-2xl border border-gray-100">
                                <div>
                                    <label class="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Opsi A</label>
                                    <input v-model="formEditSoal.optionA" type="text" class="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-amber-400 outline-none text-gray-700" required>
                                </div>
                                <div>
                                    <label class="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Opsi B</label>
                                    <input v-model="formEditSoal.optionB" type="text" class="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-amber-400 outline-none text-gray-700" required>
                                </div>
                                <div>
                                    <label class="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Opsi C</label>
                                    <input v-model="formEditSoal.optionC" type="text" class="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-amber-400 outline-none text-gray-700" required>
                                </div>
                                <div>
                                    <label class="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Opsi D</label>
                                    <input v-model="formEditSoal.optionD" type="text" class="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-amber-400 outline-none text-gray-700" required>
                                </div>
                                <div>
                                    <label class="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Opsi E</label>
                                    <input v-model="formEditSoal.optionE" type="text" class="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-amber-400 outline-none text-gray-700" required>
                                </div>
                            </div>

                            <div>
                                <label class="block text-sm font-semibold text-gray-700 mb-2">Kunci Jawaban Benar</label>
                                <select 
                                    v-model="formEditSoal.correctOption"
                                    class="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:border-amber-400 outline-none text-gray-700 bg-white"
                                    required
                                >
                                    <option value="A">Opsi A</option>
                                    <option value="B">Opsi B</option>
                                    <option value="C">Opsi C</option>
                                    <option value="D">Opsi D</option>
                                    <option value="E">Opsi E</option>
                                </select>
                            </div>
                        </template>

                        <template v-else-if="formEditSoal.type === 'ESAI'">
                            <div>
                                <label class="block text-sm font-semibold text-gray-700 mb-2">Kunci Jawaban Esai</label>
                                <textarea 
                                    v-model="formEditSoal.correctEssay"
                                    rows="4"
                                    class="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:border-amber-400 outline-none text-gray-700 resize-none"
                                    required
                                ></textarea>
                            </div>
                        </template>

                        <div class="flex space-x-3 pt-4 sticky bottom-0 bg-white border-t border-gray-50 mt-4 py-4">
                            <button 
                                type="button"
                                @click="isModalEditSoalOpen = false"
                                class="flex-1 px-4 py-3 rounded-2xl border border-gray-100 font-semibold text-gray-500 hover:bg-gray-50 transition-all"
                            >
                                Batal
                            </button>
                            <button 
                                type="submit"
                                class="flex-1 px-4 py-3 rounded-2xl bg-amber-500 font-semibold text-white hover:bg-amber-600 transition-all shadow-md"
                            >
                                Perbarui Soal
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
                v-if="isModalDeleteSoalOpen" 
                class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm cursor-pointer"
                @click="isModalDeleteSoalOpen = false"
            >
                <div 
                    class="bg-white w-full max-w-sm rounded-3xl shadow-2xl overflow-hidden transform transition-all border-2 border-red-100 cursor-default p-8 text-center"
                    @click.stop
                >
                    <div class="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center text-red-500 mx-auto mb-6">
                        <Icon name="lucide:alert-triangle" size="40" />
                    </div>
                    
                    <h3 class="text-xl font-bold text-gray-800 mb-2">Hapus Soal?</h3>
                    <p class="text-gray-500 text-sm mb-8">
                        Apakah Anda yakin ingin menghapus soal ini? Tindakan ini tidak dapat dibatalkan.
                    </p>
                    
                    <div class="flex space-x-3">
                        <button 
                            @click="isModalDeleteSoalOpen = false"
                            class="flex-1 px-4 py-3 rounded-2xl border border-gray-100 font-semibold text-gray-500 hover:bg-gray-50 transition-all"
                        >
                            Batal
                        </button>
                        <button 
                            @click="handleConfirmDeleteSoal"
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
</style>
