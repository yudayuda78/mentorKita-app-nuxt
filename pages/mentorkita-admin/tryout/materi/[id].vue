<script setup>
definePageMeta({
  layout: 'admin',
  middleware: 'admin',
})

const route = useRoute()
const materiId = route.params.id
const store = useSnbtAdminStore()

onMounted(async () => {
  await store.getMateriById(materiId)
})

const materiData = computed(() => store.currentMateri)
const soalList = computed(() => store.currentMateri?.snbtSoal || [])

const isModalSoalOpen = ref(false)
const isModalEditSoalOpen = ref(false)
const isModalDeleteSoalOpen = ref(false)
const itemToDelete = ref(null)
const currentEditSoalId = ref(null)
const uploading = ref(false)

const initialFormSoal = () => ({
  nomorSoal: '',
  type: 'PILIHAN_GANDA',
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
  materiSoal: '',
  difficulty: '',
  discrimination: '',
  guessing: 0.2,
  snbtMateriId: materiId,
})

const formSoal = ref(initialFormSoal())
const formEditSoal = ref(initialFormSoal())

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
      body: { folder: 'questionImage', files: [{ name: file.name, content }] },
    })
    const path = res.files?.[0] || ''
    // Simpan nama file saja agar cocok dengan render publik /questionImage/<file>
    formRef.value[target] = path.split('/').pop()
  } catch (e) {
    alert('Gagal mengunggah gambar: ' + (e?.data?.statusMessage || e.message))
  } finally {
    uploading.value = false
    event.target.value = ''
  }
}

const handleAddSoal = async () => {
  if (!formSoal.value.question) return
  if (formSoal.value.type === 'PILIHAN_GANDA' && !formSoal.value.correctOption) return
  if (formSoal.value.type === 'ESAI' && !formSoal.value.correctEssay) return
  await store.addSoal({ ...formSoal.value, snbtMateriId: materiId })
  formSoal.value = initialFormSoal()
  isModalSoalOpen.value = false
}

const openEditSoalModal = (item) => {
  currentEditSoalId.value = item.id
  formEditSoal.value = {
    ...initialFormSoal(),
    nomorSoal: item.nomorSoal ?? '',
    type: item.type || 'PILIHAN_GANDA',
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
    materiSoal: item.materiSoal || '',
    difficulty: item.difficulty ?? '',
    discrimination: item.discrimination ?? '',
    guessing: item.guessing ?? 0.2,
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
    <div class="flex items-center space-x-2 text-sm text-gray-400 mb-2">
      <NuxtLink to="/mentorkita-admin/tryout" class="hover:text-[#2966F3] transition-colors">Kelola Tryout</NuxtLink>
      <Icon name="lucide:chevron-right" size="14" />
      <NuxtLink :to="`/mentorkita-admin/tryout/${materiData?.tryoutId}`" class="hover:text-[#2966F3] transition-colors">Materi</NuxtLink>
      <Icon name="lucide:chevron-right" size="14" />
      <span class="text-gray-600 font-medium">{{ materiData?.name || 'Loading...' }}</span>
    </div>

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

    <div class="space-y-4">
      <div
        v-for="(item, index) in soalList"
        :key="item.id"
        class="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-all relative"
      >
        <div class="absolute top-6 right-6 flex space-x-2">
          <button @click="openEditSoalModal(item)" class="p-2 text-amber-600 hover:bg-amber-50 rounded-xl bg-white shadow-sm border border-gray-100" title="Edit Soal">
            <Icon name="lucide:edit-2" size="16" />
          </button>
          <button @click="openDeleteSoalModal(item)" class="p-2 text-red-600 hover:bg-red-50 rounded-xl bg-white shadow-sm border border-gray-100" title="Hapus Soal">
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
            <img v-if="item.questionImage" :src="`/questionImage/${item.questionImage}`" class="mt-3 max-w-xs rounded-xl border" alt="gambar soal" />
            <p v-if="item.materiSoal" class="text-gray-500 text-sm mt-3 whitespace-pre-line bg-gray-50 p-3 rounded-xl border border-gray-100">{{ item.materiSoal }}</p>
            <p class="text-gray-400 text-xs mt-3 uppercase tracking-wider font-mono">#SOAL-{{ item.id }}</p>
          </div>
        </div>

        <div v-if="item.type === 'PILIHAN_GANDA'" class="grid grid-cols-1 md:grid-cols-2 gap-3 mt-6 bg-gray-50 p-5 rounded-2xl">
          <div v-for="opt in ['A','B','C','D','E']" :key="opt" :class="['p-3 rounded-xl border', item.correctOption === opt ? 'bg-green-50 border-green-200' : 'bg-white border-gray-200']">
            <span class="font-bold mr-2" :class="item.correctOption === opt ? 'text-green-600' : 'text-gray-500'">{{ opt }}.</span>
            <span class="text-gray-700">{{ item['option' + opt] }}</span>
            <img v-if="item['option' + opt + 'Image']" :src="`/questionImage/${item['option' + opt + 'Image']}`" class="mt-2 max-w-[160px] rounded-lg border" alt="opsi" />
          </div>
        </div>
        <div v-else-if="item.type === 'ESAI'" class="mt-6 bg-blue-50 p-5 rounded-2xl border border-blue-100">
          <h4 class="text-xs font-bold text-blue-600 uppercase tracking-wider mb-2">Kunci Jawaban Esai</h4>
          <p class="text-gray-700 whitespace-pre-line">{{ item.correctEssay }}</p>
        </div>
      </div>
    </div>

    <div v-if="soalList.length === 0" class="flex flex-col items-center justify-center py-20 bg-white rounded-3xl border border-dashed border-gray-200">
      <div class="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center text-gray-300 mb-4">
        <Icon name="lucide:help-circle" size="40" />
      </div>
      <h3 class="text-xl font-bold text-gray-700">Belum Ada Soal</h3>
      <p class="text-gray-400 text-sm mt-1">Tambahkan soal pertama untuk materi ini.</p>
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
      <div v-if="isModalSoalOpen" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm overflow-y-auto py-10" @click="isModalSoalOpen = false">
        <div class="bg-white w-full max-w-2xl rounded-3xl shadow-2xl border-2 border-[#2966F3] my-auto" @click.stop>
          <div class="p-6 border-b border-gray-50 flex justify-between items-center sticky top-0 bg-white z-10">
            <h3 class="text-xl font-bold text-gray-800">Tambah Soal</h3>
            <button @click="isModalSoalOpen = false" class="text-gray-400 hover:text-gray-600"><Icon name="lucide:x" size="24" /></button>
          </div>
          <form @submit.prevent="handleAddSoal" class="p-6 space-y-5 max-h-[70vh] overflow-y-auto">
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-semibold text-gray-700 mb-2">Tipe Soal</label>
                <select v-model="formSoal.type" class="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:border-[#2966F3] outline-none text-gray-700 bg-white">
                  <option value="PILIHAN_GANDA">Pilihan Ganda</option>
                  <option value="ESAI">Esai</option>
                </select>
              </div>
              <div>
                <label class="block text-sm font-semibold text-gray-700 mb-2">Nomor Soal (Opsional)</label>
                <input v-model="formSoal.nomorSoal" type="number" class="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:border-[#2966F3] outline-none text-gray-700" />
              </div>
            </div>

            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-2">Materi / Pengantar Soal (Opsional)</label>
              <textarea v-model="formSoal.materiSoal" rows="2" class="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:border-[#2966F3] outline-none text-gray-700 resize-none"></textarea>
            </div>

            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-2">Pertanyaan</label>
              <textarea v-model="formSoal.question" rows="3" required class="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:border-[#2966F3] outline-none text-gray-700 resize-none"></textarea>
            </div>

            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-2">Gambar Soal (Opsional)</label>
              <input type="file" accept="image/*" @change="(e) => uploadImage(e, 'questionImage', formSoal)" class="text-sm" />
              <img v-if="formSoal.questionImage" :src="`/questionImage/${formSoal.questionImage}`" class="mt-2 max-w-[180px] rounded-lg border" alt="preview" />
            </div>

            <template v-if="formSoal.type === 'PILIHAN_GANDA'">
              <div v-for="opt in ['A','B','C','D','E']" :key="opt" class="bg-gray-50 p-4 rounded-2xl border border-gray-100">
                <label class="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Opsi {{ opt }}</label>
                <input v-model="formSoal['option' + opt]" type="text" class="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-[#2966F3] outline-none text-gray-700" />
                <input type="file" accept="image/*" @change="(e) => uploadImage(e, 'option' + opt + 'Image', formSoal)" class="mt-2 text-xs" />
                <img v-if="formSoal['option' + opt + 'Image']" :src="`/questionImage/${formSoal['option' + opt + 'Image']}`" class="mt-2 max-w-[140px] rounded-lg border" alt="opsi" />
              </div>
              <div>
                <label class="block text-sm font-semibold text-gray-700 mb-2">Kunci Jawaban</label>
                <select v-model="formSoal.correctOption" class="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:border-[#2966F3] outline-none text-gray-700 bg-white" required>
                  <option v-for="opt in ['A','B','C','D','E']" :key="opt" :value="opt">Opsi {{ opt }}</option>
                </select>
              </div>
            </template>

            <template v-else-if="formSoal.type === 'ESAI'">
              <div>
                <label class="block text-sm font-semibold text-gray-700 mb-2">Kunci Jawaban Esai</label>
                <textarea v-model="formSoal.correctEssay" rows="3" required class="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:border-[#2966F3] outline-none text-gray-700 resize-none"></textarea>
              </div>
            </template>

            <details class="bg-gray-50 rounded-2xl border border-gray-100 p-4">
              <summary class="text-sm font-semibold text-gray-600 cursor-pointer">Parameter IRT (opsional)</summary>
              <div class="grid grid-cols-3 gap-3 mt-3">
                <div>
                  <label class="block text-xs text-gray-500 mb-1">Difficulty</label>
                  <input v-model="formSoal.difficulty" type="number" step="0.01" min="0" max="1" class="w-full px-3 py-2 rounded-xl border border-gray-200 text-sm" />
                </div>
                <div>
                  <label class="block text-xs text-gray-500 mb-1">Discrimination</label>
                  <input v-model="formSoal.discrimination" type="number" step="0.01" class="w-full px-3 py-2 rounded-xl border border-gray-200 text-sm" />
                </div>
                <div>
                  <label class="block text-xs text-gray-500 mb-1">Guessing</label>
                  <input v-model="formSoal.guessing" type="number" step="0.01" min="0" max="1" class="w-full px-3 py-2 rounded-xl border border-gray-200 text-sm" />
                </div>
              </div>
            </details>

            <div class="flex space-x-3 pt-2 sticky bottom-0 bg-white border-t border-gray-50 py-4">
              <button type="button" @click="isModalSoalOpen = false" class="flex-1 px-4 py-3 rounded-2xl border border-gray-100 font-semibold text-gray-500 hover:bg-gray-50 transition-all">Batal</button>
              <button type="submit" :disabled="uploading" class="flex-1 px-4 py-3 rounded-2xl bg-[#2966F3] font-semibold text-white hover:bg-blue-700 transition-all shadow-md disabled:opacity-50">{{ uploading ? 'Mengunggah...' : 'Simpan Soal' }}</button>
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
      <div v-if="isModalEditSoalOpen" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm overflow-y-auto py-10" @click="isModalEditSoalOpen = false">
        <div class="bg-white w-full max-w-2xl rounded-3xl shadow-2xl border-2 border-amber-400 my-auto" @click.stop>
          <div class="p-6 border-b border-gray-50 flex justify-between items-center sticky top-0 bg-white z-10">
            <h3 class="text-xl font-bold text-gray-800">Edit Soal</h3>
            <button @click="isModalEditSoalOpen = false" class="text-gray-400 hover:text-gray-600"><Icon name="lucide:x" size="24" /></button>
          </div>
          <form @submit.prevent="handleEditSoal" class="p-6 space-y-5 max-h-[70vh] overflow-y-auto">
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-semibold text-gray-700 mb-2">Tipe Soal</label>
                <select v-model="formEditSoal.type" class="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:border-amber-400 outline-none text-gray-700 bg-white">
                  <option value="PILIHAN_GANDA">Pilihan Ganda</option>
                  <option value="ESAI">Esai</option>
                </select>
              </div>
              <div>
                <label class="block text-sm font-semibold text-gray-700 mb-2">Nomor Soal (Opsional)</label>
                <input v-model="formEditSoal.nomorSoal" type="number" class="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:border-amber-400 outline-none text-gray-700" />
              </div>
            </div>

            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-2">Materi / Pengantar Soal (Opsional)</label>
              <textarea v-model="formEditSoal.materiSoal" rows="2" class="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:border-amber-400 outline-none text-gray-700 resize-none"></textarea>
            </div>

            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-2">Pertanyaan</label>
              <textarea v-model="formEditSoal.question" rows="3" required class="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:border-amber-400 outline-none text-gray-700 resize-none"></textarea>
            </div>

            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-2">Gambar Soal (Opsional)</label>
              <input type="file" accept="image/*" @change="(e) => uploadImage(e, 'questionImage', formEditSoal)" class="text-sm" />
              <img v-if="formEditSoal.questionImage" :src="`/questionImage/${formEditSoal.questionImage}`" class="mt-2 max-w-[180px] rounded-lg border" alt="preview" />
            </div>

            <template v-if="formEditSoal.type === 'PILIHAN_GANDA'">
              <div v-for="opt in ['A','B','C','D','E']" :key="opt" class="bg-gray-50 p-4 rounded-2xl border border-gray-100">
                <label class="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Opsi {{ opt }}</label>
                <input v-model="formEditSoal['option' + opt]" type="text" class="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-amber-400 outline-none text-gray-700" />
                <input type="file" accept="image/*" @change="(e) => uploadImage(e, 'option' + opt + 'Image', formEditSoal)" class="mt-2 text-xs" />
                <img v-if="formEditSoal['option' + opt + 'Image']" :src="`/questionImage/${formEditSoal['option' + opt + 'Image']}`" class="mt-2 max-w-[140px] rounded-lg border" alt="opsi" />
              </div>
              <div>
                <label class="block text-sm font-semibold text-gray-700 mb-2">Kunci Jawaban</label>
                <select v-model="formEditSoal.correctOption" class="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:border-amber-400 outline-none text-gray-700 bg-white" required>
                  <option v-for="opt in ['A','B','C','D','E']" :key="opt" :value="opt">Opsi {{ opt }}</option>
                </select>
              </div>
            </template>

            <template v-else-if="formEditSoal.type === 'ESAI'">
              <div>
                <label class="block text-sm font-semibold text-gray-700 mb-2">Kunci Jawaban Esai</label>
                <textarea v-model="formEditSoal.correctEssay" rows="3" required class="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:border-amber-400 outline-none text-gray-700 resize-none"></textarea>
              </div>
            </template>

            <details class="bg-gray-50 rounded-2xl border border-gray-100 p-4">
              <summary class="text-sm font-semibold text-gray-600 cursor-pointer">Parameter IRT (opsional)</summary>
              <div class="grid grid-cols-3 gap-3 mt-3">
                <div>
                  <label class="block text-xs text-gray-500 mb-1">Difficulty</label>
                  <input v-model="formEditSoal.difficulty" type="number" step="0.01" min="0" max="1" class="w-full px-3 py-2 rounded-xl border border-gray-200 text-sm" />
                </div>
                <div>
                  <label class="block text-xs text-gray-500 mb-1">Discrimination</label>
                  <input v-model="formEditSoal.discrimination" type="number" step="0.01" class="w-full px-3 py-2 rounded-xl border border-gray-200 text-sm" />
                </div>
                <div>
                  <label class="block text-xs text-gray-500 mb-1">Guessing</label>
                  <input v-model="formEditSoal.guessing" type="number" step="0.01" min="0" max="1" class="w-full px-3 py-2 rounded-xl border border-gray-200 text-sm" />
                </div>
              </div>
            </details>

            <div class="flex space-x-3 pt-2 sticky bottom-0 bg-white border-t border-gray-50 py-4">
              <button type="button" @click="isModalEditSoalOpen = false" class="flex-1 px-4 py-3 rounded-2xl border border-gray-100 font-semibold text-gray-500 hover:bg-gray-50 transition-all">Batal</button>
              <button type="submit" :disabled="uploading" class="flex-1 px-4 py-3 rounded-2xl bg-amber-500 font-semibold text-white hover:bg-amber-600 transition-all shadow-md disabled:opacity-50">{{ uploading ? 'Mengunggah...' : 'Perbarui Soal' }}</button>
            </div>
          </form>
        </div>
      </div>
    </Transition>

    <!-- Modal Hapus -->
    <Transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0 scale-95"
      enter-to-class="opacity-100 scale-100"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="opacity-100 scale-100"
      leave-to-class="opacity-0 scale-95"
    >
      <div v-if="isModalDeleteSoalOpen" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" @click="isModalDeleteSoalOpen = false">
        <div class="bg-white w-full max-w-sm rounded-3xl shadow-2xl p-8 text-center border-2 border-red-100" @click.stop>
          <div class="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center text-red-500 mx-auto mb-6">
            <Icon name="lucide:alert-triangle" size="40" />
          </div>
          <h3 class="text-xl font-bold text-gray-800 mb-2">Hapus Soal?</h3>
          <p class="text-gray-500 text-sm mb-8">Apakah Anda yakin ingin menghapus soal ini? Tindakan ini tidak dapat dibatalkan.</p>
          <div class="flex space-x-3">
            <button @click="isModalDeleteSoalOpen = false" class="flex-1 px-4 py-3 rounded-2xl border border-gray-100 font-semibold text-gray-500 hover:bg-gray-50 transition-all">Batal</button>
            <button @click="handleConfirmDeleteSoal" class="flex-1 px-4 py-3 rounded-2xl bg-red-600 font-semibold text-white hover:bg-red-700 transition-all shadow-md">Ya, Hapus</button>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>
