<script setup>
definePageMeta({
    layout: 'admin',
    middleware: 'admin',
})

const route = useRoute()
const quizId = route.params.id
const store = useMiniquizAdminStore()

onMounted(async () => {
    await store.getMiniquizById(quizId)
})

const quizData = computed(() => store.currentMiniquiz)
const questions = computed(() => store.currentMiniquiz?.soalMiniQuiz || [])

const isModalSoalOpen = ref(false)
const isModalEditOpen = ref(false)
const isModalDeleteOpen = ref(false)
const itemToDelete = ref(null)
const currentEditId = ref(null)
const uploading = ref(false)

const initialForm = () => ({
    nomorSoal: '',
    question: '',
    questionImage: '',
    optionA: '',
    optionB: '',
    optionC: '',
    optionD: '',
    optionE: '',
    optionAImage: '',
    optionBImage: '',
    optionCImage: '',
    optionDImage: '',
    optionEImage: '',
    correctOption: 'A',
    correctEssay: '',
    pembahasan: '',
    miniQuizId: parseInt(quizId),
})

const formSoal = ref(initialForm())
const formEdit = ref(initialForm())

const uploadImage = async (event, target, formRef) => {
    const file = event.target.files?.[0]
    if (!file) return
    uploading.value = true
    try {
        const content = await new Promise((resolve, reject) => {
            const reader = new FileReader()
            reader.onload = () => resolve(reader.result)
            reader.onerror = reject
            reader.readAsDataURL(file)
        })
        const res = await $fetch('/api/file', {
            method: 'POST',
            credentials: 'include',
            body: { folder: 'miniQuizImage', files: [{ name: file.name, content }] },
        })
        const path = res.files?.[0] || ''
        formRef.value[target] = path.split('/').pop()
    } catch (e) {
        alert('Gagal mengunggah gambar: ' + (e?.data?.statusMessage || e.message))
    } finally {
        uploading.value = false
        event.target.value = ''
    }
}

const handleAddSoal = async () => {
    if (!formSoal.value.question || !formSoal.value.correctOption) return
    await store.addQuestion({ ...formSoal.value, miniQuizId: parseInt(quizId) })
    formSoal.value = initialForm()
    isModalSoalOpen.value = false
}

const openEditModal = (item) => {
    currentEditId.value = item.id
    formEdit.value = {
        ...initialForm(),
        nomorSoal: item.nomorSoal ?? '',
        question: item.question || '',
        questionImage: item.questionImage || '',
        optionA: item.optionA || '',
        optionB: item.optionB || '',
        optionC: item.optionC || '',
        optionD: item.optionD || '',
        optionE: item.optionE || '',
        optionAImage: item.optionAImage || '',
        optionBImage: item.optionBImage || '',
        optionCImage: item.optionCImage || '',
        optionDImage: item.optionDImage || '',
        optionEImage: item.optionEImage || '',
        correctOption: item.correctOption || 'A',
        correctEssay: item.correctEssay || '',
        pembahasan: item.pembahasan || '',
    }
    isModalEditOpen.value = true
}

const handleEditSoal = async () => {
    if (!formEdit.value.question || !currentEditId.value) return
    await store.updateQuestion(currentEditId.value, formEdit.value)
    isModalEditOpen.value = false
}

const openDeleteModal = (item) => {
    itemToDelete.value = item
    isModalDeleteOpen.value = true
}

const handleConfirmDelete = async () => {
    if (!itemToDelete.value) return
    await store.deleteQuestion(itemToDelete.value.id)
    isModalDeleteOpen.value = false
    itemToDelete.value = null
}
</script>

<template>
    <div class="p-6">
        <!-- Header / Breadcrumbs -->
        <div class="flex items-center space-x-2 text-sm text-gray-400 mb-2">
            <NuxtLink to="/mentorkita-admin/mini-quiz" class="hover:text-[#2966F3] transition-colors">Mini Quiz</NuxtLink>
            <Icon name="lucide:chevron-right" size="14" />
            <span class="text-gray-600 font-medium">{{ quizData?.title || 'Detail Quiz' }}</span>
        </div>

        <div class="flex justify-between items-center mb-8">
            <div>
                <h1 class="text-3xl font-bold text-gray-800">{{ quizData?.title }}</h1>
                <p class="text-gray-500 text-sm mt-1">Manajemen butir soal untuk quiz ini</p>
            </div>

            <button
                @click="isModalSoalOpen = true"
                class="bg-[#2966F3] text-white px-5 py-2.5 rounded-2xl text-sm font-bold hover:bg-blue-700 transition-all shadow-lg flex items-center space-x-2"
            >
                <Icon name="lucide:plus" size="18" />
                <span>Tambah Soal</span>
            </button>
        </div>

        <!-- Questions List -->
        <div v-if="questions.length > 0" class="space-y-4">
            <div
                v-for="(soal, index) in questions"
                :key="soal.id"
                class="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-all"
            >
                <div class="flex justify-between items-start mb-4">
                    <div class="flex items-center space-x-3">
                        <span class="w-8 h-8 rounded-full bg-blue-50 text-[#2966F3] flex items-center justify-center font-bold text-sm">
                            {{ soal.nomorSoal || index + 1 }}
                        </span>
                        <h3 class="font-bold text-gray-800 line-clamp-1">{{ soal.question }}</h3>
                    </div>
                    <div class="flex space-x-2">
                        <button @click="openEditModal(soal)" class="text-amber-500 hover:bg-amber-50 p-2 rounded-xl transition-colors" title="Edit Soal">
                            <Icon name="lucide:edit-3" size="18" />
                        </button>
                        <button @click="openDeleteModal(soal)" class="text-red-500 hover:bg-red-50 p-2 rounded-xl transition-colors" title="Hapus Soal">
                            <Icon name="lucide:trash-2" size="18" />
                        </button>
                    </div>
                </div>

                <img v-if="soal.questionImage" :src="`/miniQuizImage/${soal.questionImage}`" class="mb-4 max-w-xs rounded-xl border" alt="gambar soal" />

                <div class="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4 text-sm">
                    <div v-for="opt in ['A', 'B', 'C', 'D', 'E']" :key="opt"
                        class="p-3 rounded-xl border"
                        :class="soal.correctOption === opt ? 'bg-green-50 border-green-200 text-green-700' : 'bg-gray-50 border-gray-100 text-gray-600'"
                    >
                        <span class="font-bold mr-2">{{ opt }}.</span>
                        {{ soal[`option${opt}`] }}
                        <img v-if="soal[`option${opt}Image`]" :src="`/miniQuizImage/${soal[`option${opt}Image`]}`" class="mt-2 max-w-[140px] rounded-lg border" alt="opsi" />
                    </div>
                </div>

                <div v-if="soal.pembahasan" class="mt-4 p-4 bg-blue-50 rounded-2xl text-sm text-blue-700">
                    <p class="font-bold mb-1 flex items-center">
                        <Icon name="lucide:info" size="14" class="mr-1" />
                        Pembahasan:
                    </p>
                    <div class="whitespace-pre-line">{{ soal.pembahasan }}</div>
                </div>
            </div>
        </div>

        <!-- Empty State -->
        <div v-else class="flex flex-col items-center justify-center py-20 bg-white rounded-3xl border border-dashed border-gray-200">
            <div class="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center text-gray-300 mb-4">
                <Icon name="lucide:file-question" size="40" />
            </div>
            <h3 class="text-xl font-bold text-gray-700">Belum Ada Soal</h3>
            <p class="text-gray-400 text-sm mt-1">Klik tombol "Tambah Soal" untuk mulai membuat pertanyaan.</p>
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
            <div v-if="isModalSoalOpen" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" @click="isModalSoalOpen = false">
                <div class="bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-y-auto max-h-[90vh] border-2 border-[#2966F3]" @click.stop>
                    <div class="p-6 border-b border-gray-50 flex justify-between items-center sticky top-0 bg-white z-10">
                        <h3 class="text-xl font-bold text-gray-800">Tambah Soal Baru</h3>
                        <button @click="isModalSoalOpen = false" class="text-gray-400 hover:text-gray-600">
                            <Icon name="lucide:x" size="24" />
                        </button>
                    </div>

                    <form @submit.prevent="handleAddSoal" class="p-6 space-y-4">
                        <div class="grid grid-cols-2 gap-4">
                            <div>
                                <label class="block text-sm font-semibold text-gray-700 mb-2">Nomor Soal (Opsional)</label>
                                <input v-model="formSoal.nomorSoal" type="number" class="w-full px-4 py-2 rounded-xl border border-gray-200 focus:border-[#2966F3] outline-none" />
                            </div>
                            <div>
                                <label class="block text-sm font-semibold text-gray-700 mb-2">Gambar Soal (Opsional)</label>
                                <input type="file" accept="image/*" @change="(e) => uploadImage(e, 'questionImage', formSoal)" class="text-xs" />
                            </div>
                        </div>

                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">Pertanyaan</label>
                            <textarea v-model="formSoal.question" class="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:border-[#2966F3] outline-none" rows="3" required></textarea>
                            <img v-if="formSoal.questionImage" :src="`/miniQuizImage/${formSoal.questionImage}`" class="mt-2 max-w-[160px] rounded-lg border" alt="preview" />
                        </div>

                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div v-for="opt in ['A', 'B', 'C', 'D', 'E']" :key="opt">
                                <label class="block text-sm font-semibold text-gray-700 mb-1">Opsi {{ opt }}</label>
                                <input v-model="formSoal[`option${opt}`]" type="text" class="w-full px-4 py-2 rounded-xl border border-gray-200 focus:border-[#2966F3] outline-none" />
                                <input type="file" accept="image/*" @change="(e) => uploadImage(e, 'option' + opt + 'Image', formSoal)" class="mt-1 text-xs" />
                            </div>
                        </div>

                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">Jawaban Benar</label>
                            <select v-model="formSoal.correctOption" class="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:border-[#2966F3] outline-none">
                                <option v-for="opt in ['A', 'B', 'C', 'D', 'E']" :key="opt" :value="opt">Opsi {{ opt }}</option>
                            </select>
                        </div>

                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">Pembahasan (Opsional)</label>
                            <textarea v-model="formSoal.pembahasan" class="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:border-[#2966F3] outline-none" rows="3"></textarea>
                        </div>

                        <div class="flex space-x-3 pt-4 sticky bottom-0 bg-white border-t border-gray-50 py-4">
                            <button type="button" @click="isModalSoalOpen = false" class="flex-1 px-4 py-3 rounded-2xl border border-gray-100 font-semibold text-gray-500">Batal</button>
                            <button type="submit" :disabled="uploading" class="flex-1 px-4 py-3 rounded-2xl bg-[#2966F3] font-semibold text-white shadow-md disabled:opacity-50">{{ uploading ? 'Mengunggah...' : 'Simpan Soal' }}</button>
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
            <div v-if="isModalEditOpen" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" @click="isModalEditOpen = false">
                <div class="bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-y-auto max-h-[90vh] border-2 border-amber-400" @click.stop>
                    <div class="p-6 border-b border-gray-50 flex justify-between items-center sticky top-0 bg-white z-10">
                        <h3 class="text-xl font-bold text-gray-800">Edit Soal</h3>
                        <button @click="isModalEditOpen = false" class="text-gray-400 hover:text-gray-600">
                            <Icon name="lucide:x" size="24" />
                        </button>
                    </div>

                    <form @submit.prevent="handleEditSoal" class="p-6 space-y-4">
                        <div class="grid grid-cols-2 gap-4">
                            <div>
                                <label class="block text-sm font-semibold text-gray-700 mb-2">Nomor Soal (Opsional)</label>
                                <input v-model="formEdit.nomorSoal" type="number" class="w-full px-4 py-2 rounded-xl border border-gray-200 focus:border-amber-400 outline-none" />
                            </div>
                            <div>
                                <label class="block text-sm font-semibold text-gray-700 mb-2">Gambar Soal (Opsional)</label>
                                <input type="file" accept="image/*" @change="(e) => uploadImage(e, 'questionImage', formEdit)" class="text-xs" />
                            </div>
                        </div>

                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">Pertanyaan</label>
                            <textarea v-model="formEdit.question" class="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:border-amber-400 outline-none" rows="3" required></textarea>
                            <img v-if="formEdit.questionImage" :src="`/miniQuizImage/${formEdit.questionImage}`" class="mt-2 max-w-[160px] rounded-lg border" alt="preview" />
                        </div>

                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div v-for="opt in ['A', 'B', 'C', 'D', 'E']" :key="opt">
                                <label class="block text-sm font-semibold text-gray-700 mb-1">Opsi {{ opt }}</label>
                                <input v-model="formEdit[`option${opt}`]" type="text" class="w-full px-4 py-2 rounded-xl border border-gray-200 focus:border-amber-400 outline-none" />
                                <input type="file" accept="image/*" @change="(e) => uploadImage(e, 'option' + opt + 'Image', formEdit)" class="mt-1 text-xs" />
                            </div>
                        </div>

                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">Jawaban Benar</label>
                            <select v-model="formEdit.correctOption" class="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:border-amber-400 outline-none">
                                <option v-for="opt in ['A', 'B', 'C', 'D', 'E']" :key="opt" :value="opt">Opsi {{ opt }}</option>
                            </select>
                        </div>

                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">Pembahasan (Opsional)</label>
                            <textarea v-model="formEdit.pembahasan" class="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:border-amber-400 outline-none" rows="3"></textarea>
                        </div>

                        <div class="flex space-x-3 pt-4 sticky bottom-0 bg-white border-t border-gray-50 py-4">
                            <button type="button" @click="isModalEditOpen = false" class="flex-1 px-4 py-3 rounded-2xl border border-gray-100 font-semibold text-gray-500">Batal</button>
                            <button type="submit" :disabled="uploading" class="flex-1 px-4 py-3 rounded-2xl bg-amber-500 font-semibold text-white shadow-md disabled:opacity-50">{{ uploading ? 'Mengunggah...' : 'Perbarui Soal' }}</button>
                        </div>
                    </form>
                </div>
            </div>
        </Transition>

        <!-- Modal Delete -->
        <Transition
            enter-active-class="transition duration-200 ease-out"
            enter-from-class="opacity-0 scale-95"
            enter-to-class="opacity-100 scale-100"
            leave-active-class="transition duration-150 ease-in"
            leave-from-class="opacity-100 scale-100"
            leave-to-class="opacity-0 scale-95"
        >
            <div v-if="isModalDeleteOpen" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" @click="isModalDeleteOpen = false">
                <div class="bg-white w-full max-w-sm rounded-3xl shadow-2xl p-8 text-center border-2 border-red-100" @click.stop>
                    <div class="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center text-red-500 mx-auto mb-6">
                        <Icon name="lucide:alert-triangle" size="40" />
                    </div>
                    <h3 class="text-xl font-bold text-gray-800 mb-2">Hapus Soal?</h3>
                    <p class="text-gray-500 text-sm mb-8">Apakah Anda yakin ingin menghapus soal ini? Tindakan ini tidak dapat dibatalkan.</p>
                    <div class="flex space-x-3">
                        <button @click="isModalDeleteOpen = false" class="flex-1 px-4 py-3 rounded-2xl border border-gray-100 font-semibold text-gray-500">Batal</button>
                        <button @click="handleConfirmDelete" class="flex-1 px-4 py-3 rounded-2xl bg-red-600 font-semibold text-white shadow-md">Ya, Hapus</button>
                    </div>
                </div>
            </div>
        </Transition>
    </div>
</template>
