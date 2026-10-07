<script setup>
definePageMeta({
  layout: 'admin',
  middleware: 'admin',
})

const route = useRoute()
const tryoutId = route.params.id
const store = useSnbtAdminStore()

onMounted(async () => {
  await store.getTryoutById(tryoutId)
  await store.getMateri(tryoutId)
})

const tryoutData = computed(() => store.currentTryout)
const materiList = computed(() => store.materi)

const isModalOpen = ref(false)
const isModalEditOpen = ref(false)
const isModalDeleteOpen = ref(false)
const currentEditId = ref(null)
const itemToDelete = ref(null)

const emptyForm = () => ({ name: '', time: '', type: 'TES_PORTENSI_SKOLASTIK' })
const form = ref(emptyForm())
const formEdit = ref(emptyForm())

const typeLabel = (t) => (t === 'TES_LITERASI' ? 'Literasi' : 'Penalaran Skolastik')

const handleAdd = async () => {
  if (!form.value.name || !form.value.time) return
  await store.addMateri({ ...form.value, tryoutId })
  form.value = emptyForm()
  isModalOpen.value = false
}

const openEditModal = (item) => {
  currentEditId.value = item.id
  formEdit.value = {
    name: item.name || '',
    time: item.time || '',
    type: item.type || 'TES_PORTENSI_SKOLASTIK',
  }
  isModalEditOpen.value = true
}

const handleEdit = async () => {
  if (!formEdit.value.name || !currentEditId.value) return
  await store.updateMateri(currentEditId.value, formEdit.value)
  isModalEditOpen.value = false
}

const openDeleteModal = (item) => {
  itemToDelete.value = item
  isModalDeleteOpen.value = true
}

const handleConfirmDelete = async () => {
  if (!itemToDelete.value) return
  await store.deleteMateri(itemToDelete.value.id)
  isModalDeleteOpen.value = false
  itemToDelete.value = null
}
</script>

<template>
  <div class="p-6">
    <div class="flex items-center space-x-2 text-sm text-gray-400 mb-2">
      <NuxtLink to="/mentorkita-admin/tryout" class="hover:text-[#2966F3] transition-colors">Kelola Tryout</NuxtLink>
      <Icon name="lucide:chevron-right" size="14" />
      <span class="text-gray-600 font-medium">{{ tryoutData?.name || 'Detail Tryout' }}</span>
    </div>

    <div class="flex justify-between items-center mb-8">
      <div>
        <h1 class="text-3xl font-bold text-gray-800">{{ tryoutData?.name }}</h1>
        <p class="text-gray-500 text-sm mt-1">Daftar materi (subtes) dalam tryout ini</p>
      </div>
      <button
        @click="isModalOpen = true"
        class="bg-[#2966F3] text-white px-5 py-2.5 rounded-2xl text-sm font-bold hover:bg-blue-700 transition-all shadow-lg flex items-center space-x-2"
      >
        <Icon name="lucide:plus" size="18" />
        <span>Tambah Materi</span>
      </button>
    </div>

    <ul v-if="materiList.length > 0" class="space-y-3">
      <li
        v-for="item in materiList"
        :key="item.id"
        class="list-item flex justify-between items-center bg-white p-4 rounded-2xl border border-gray-100 shadow-sm transition-all group min-h-[70px]"
      >
        <div class="flex items-center space-x-3">
          <div class="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-[#2966F3] group-hover:bg-white/20 group-hover:text-white transition-colors">
            <Icon name="lucide:book-open" size="20" />
          </div>
          <div class="flex flex-col">
            <span class="text-[10px] text-gray-400 font-mono group-hover:text-white/70 uppercase">
              #{{ item.id }} • {{ item.time }} menit • {{ typeLabel(item.type) }}
            </span>
            <span class="font-bold text-gray-700 group-hover:text-white transition-colors">{{ item.name }}</span>
          </div>
        </div>
        <div class="flex items-center space-x-2">
          <NuxtLink
            :to="`/mentorkita-admin/tryout/materi/${item.id}`"
            class="text-blue-600 bg-blue-50 px-4 py-2 rounded-xl text-xs font-bold hover:bg-blue-100 transition-colors"
          >
            Lihat Soal
          </NuxtLink>
          <button
            @click="openEditModal(item)"
            class="text-amber-600 bg-amber-50 px-4 py-2 rounded-xl text-xs font-bold hover:bg-amber-100 transition-colors"
          >
            Edit
          </button>
          <button
            @click="openDeleteModal(item)"
            class="text-red-600 bg-red-50 px-4 py-2 rounded-xl text-xs font-bold hover:bg-red-100 transition-colors"
          >
            Delete
          </button>
        </div>
      </li>
    </ul>

    <div v-else class="flex flex-col items-center justify-center py-20 bg-white rounded-3xl border border-dashed border-gray-200">
      <div class="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center text-gray-300 mb-4">
        <Icon name="lucide:inbox" size="40" />
      </div>
      <h3 class="text-xl font-bold text-gray-700">Belum Ada Materi</h3>
      <p class="text-gray-400 text-sm mt-1">Tambahkan subtes pertama untuk tryout ini.</p>
    </div>

    <!-- Modal Tambah -->
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
        class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
        @click="isModalOpen = false"
      >
        <div class="bg-white w-full max-w-md rounded-3xl shadow-2xl border-2 border-[#2966F3]" @click.stop>
          <div class="p-6 border-b border-gray-50 flex justify-between items-center">
            <h3 class="text-xl font-bold text-gray-800">Tambah Materi</h3>
            <button @click="isModalOpen = false" class="text-gray-400 hover:text-gray-600">
              <Icon name="lucide:x" size="24" />
            </button>
          </div>
          <form @submit.prevent="handleAdd" class="p-6 space-y-4">
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-2">Nama Materi</label>
              <input v-model="form.name" type="text" required placeholder="Contoh: Penalaran Umum" class="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:border-[#2966F3] focus:ring-2 focus:ring-[#2966F3]/20 outline-none text-gray-700" />
            </div>
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-semibold text-gray-700 mb-2">Durasi (menit)</label>
                <input v-model="form.time" type="number" min="1" required class="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:border-[#2966F3] outline-none text-gray-700" />
              </div>
              <div>
                <label class="block text-sm font-semibold text-gray-700 mb-2">Tipe</label>
                <select v-model="form.type" class="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:border-[#2966F3] outline-none text-gray-700 bg-white">
                  <option value="TES_PORTENSI_SKOLASTIK">Penalaran Skolastik</option>
                  <option value="TES_LITERASI">Literasi</option>
                </select>
              </div>
            </div>
            <div class="flex space-x-3 pt-2">
              <button type="button" @click="isModalOpen = false" class="flex-1 px-4 py-3 rounded-2xl border border-gray-100 font-semibold text-gray-500 hover:bg-gray-50 transition-all">Batal</button>
              <button type="submit" class="flex-1 px-4 py-3 rounded-2xl bg-[#2966F3] font-semibold text-white hover:bg-blue-700 transition-all shadow-md">Simpan</button>
            </div>
          </form>
        </div>
      </div>
    </Transition>

    <!-- Modal Edit -->
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
        class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
        @click="isModalEditOpen = false"
      >
        <div class="bg-white w-full max-w-md rounded-3xl shadow-2xl border-2 border-amber-400" @click.stop>
          <div class="p-6 border-b border-gray-50 flex justify-between items-center">
            <h3 class="text-xl font-bold text-gray-800">Edit Materi</h3>
            <button @click="isModalEditOpen = false" class="text-gray-400 hover:text-gray-600">
              <Icon name="lucide:x" size="24" />
            </button>
          </div>
          <form @submit.prevent="handleEdit" class="p-6 space-y-4">
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-2">Nama Materi</label>
              <input v-model="formEdit.name" type="text" required class="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:border-amber-400 outline-none text-gray-700" />
            </div>
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-semibold text-gray-700 mb-2">Durasi (menit)</label>
                <input v-model="formEdit.time" type="number" min="1" required class="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:border-amber-400 outline-none text-gray-700" />
              </div>
              <div>
                <label class="block text-sm font-semibold text-gray-700 mb-2">Tipe</label>
                <select v-model="formEdit.type" class="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:border-amber-400 outline-none text-gray-700 bg-white">
                  <option value="TES_PORTENSI_SKOLASTIK">Penalaran Skolastik</option>
                  <option value="TES_LITERASI">Literasi</option>
                </select>
              </div>
            </div>
            <div class="flex space-x-3 pt-2">
              <button type="button" @click="isModalEditOpen = false" class="flex-1 px-4 py-3 rounded-2xl border border-gray-100 font-semibold text-gray-500 hover:bg-gray-50 transition-all">Batal</button>
              <button type="submit" class="flex-1 px-4 py-3 rounded-2xl bg-amber-500 font-semibold text-white hover:bg-amber-600 transition-all shadow-md">Perbarui</button>
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
      <div
        v-if="isModalDeleteOpen"
        class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
        @click="isModalDeleteOpen = false"
      >
        <div class="bg-white w-full max-w-sm rounded-3xl shadow-2xl p-8 text-center border-2 border-red-100" @click.stop>
          <div class="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center text-red-500 mx-auto mb-6">
            <Icon name="lucide:alert-triangle" size="40" />
          </div>
          <h3 class="text-xl font-bold text-gray-800 mb-2">Hapus Materi?</h3>
          <p class="text-gray-500 text-sm mb-8">
            Menghapus <span class="font-bold text-gray-700">"{{ itemToDelete?.name }}"</span> akan menghapus semua soal & jawaban terkait.
          </p>
          <div class="flex space-x-3">
            <button @click="isModalDeleteOpen = false" class="flex-1 px-4 py-3 rounded-2xl border border-gray-100 font-semibold text-gray-500 hover:bg-gray-50 transition-all">Batal</button>
            <button @click="handleConfirmDelete" class="flex-1 px-4 py-3 rounded-2xl bg-red-600 font-semibold text-white hover:bg-red-700 transition-all shadow-md">Ya, Hapus</button>
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
