<script setup>
definePageMeta({
  layout: 'admin',
  middleware: 'admin',
})

const store = useSnbtAdminStore()

await store.getTryouts()

const isModalOpen = ref(false)
const isModalEditOpen = ref(false)
const isModalDeleteOpen = ref(false)
const itemToDelete = ref(null)
const currentEditId = ref(null)
const isSaving = ref(false)
const errorMessage = ref('')

const emptyForm = () => ({
  name: '',
  slug: '',
  price: '',
  isfree: false,
  isclosed: false,
  marketing: '',
  image: '',
  startedAt: '',
  endedAt: '',
})

const form = ref(emptyForm())
const formEdit = ref(emptyForm())

const formatRupiah = (value) => Number(value || 0).toLocaleString('id-ID')

const toLocalInput = (value) => {
  if (!value) return ''
  const d = new Date(value)
  const local = new Date(d.getTime() - d.getTimezoneOffset() * 60000)
  return local.toISOString().slice(0, 16)
}

const buildPayload = (source) => ({
  name: source.name,
  slug: source.slug,
  price: source.price === '' ? null : source.price,
  isfree: source.isfree,
  isclosed: source.isclosed,
  marketing: source.marketing,
  image: source.image,
  startedAt: source.startedAt || null,
  endedAt: source.endedAt || null,
})

const handleAdd = async () => {
  if (!form.value.name) return
  errorMessage.value = ''
  isSaving.value = true
  try {
    await store.addTryout(buildPayload(form.value))
    form.value = emptyForm()
    isModalOpen.value = false
  } catch (err) {
    errorMessage.value = err?.data?.statusMessage || err?.statusMessage || 'Gagal menyimpan tryout.'
  } finally {
    isSaving.value = false
  }
}

const openEditModal = (item) => {
  currentEditId.value = item.id
  formEdit.value = {
    name: item.name || '',
    slug: item.slug || '',
    price: item.price ?? '',
    isfree: !!item.isfree,
    isclosed: !!item.isclosed,
    marketing: item.marketing || '',
    image: item.image || '',
    startedAt: toLocalInput(item.startedAt),
    endedAt: toLocalInput(item.endedAt),
  }
  errorMessage.value = ''
  isModalEditOpen.value = true
}

const handleEdit = async () => {
  if (!formEdit.value.name || !currentEditId.value) return
  errorMessage.value = ''
  isSaving.value = true
  try {
    await store.updateTryout(currentEditId.value, buildPayload(formEdit.value))
    isModalEditOpen.value = false
  } catch (err) {
    errorMessage.value = err?.data?.statusMessage || err?.statusMessage || 'Gagal memperbarui tryout.'
  } finally {
    isSaving.value = false
  }
}

const openDeleteModal = (item) => {
  itemToDelete.value = item
  isModalDeleteOpen.value = true
}

const handleConfirmDelete = async () => {
  if (!itemToDelete.value) return
  errorMessage.value = ''
  try {
    await store.deleteTryout(itemToDelete.value.id)
    isModalDeleteOpen.value = false
    itemToDelete.value = null
  } catch (err) {
    errorMessage.value = err?.data?.statusMessage || err?.statusMessage || 'Gagal menghapus tryout.'
  }
}
</script>

<template>
  <div class="p-6">
    <div class="flex justify-between items-center mb-6">
      <div>
        <h1 class="text-2xl font-bold text-gray-800">Kelola Tryout</h1>
        <p class="text-gray-500 text-sm">Atur tryout, harga, dan status buka/tutup.</p>
      </div>
      <button
        @click="isModalOpen = true; errorMessage = ''"
        class="bg-[#2966F3] text-white px-4 py-2 rounded-xl text-sm font-semibold hover:bg-blue-700 transition-all shadow-sm flex items-center space-x-2"
      >
        <Icon name="lucide:plus" size="18" />
        <span>Tambah Tryout</span>
      </button>
    </div>

    <p v-if="errorMessage && !isModalOpen && !isModalEditOpen" class="mb-4 text-sm text-red-500">
      {{ errorMessage }}
    </p>

    <div class="overflow-x-auto bg-white rounded-2xl border border-gray-100 shadow-sm">
      <table class="min-w-full text-sm">
        <thead class="bg-gray-50 text-gray-500 text-left">
          <tr>
            <th class="px-4 py-3 font-semibold">#</th>
            <th class="px-4 py-3 font-semibold">Nama</th>
            <th class="px-4 py-3 font-semibold">Slug</th>
            <th class="px-4 py-3 font-semibold">Harga</th>
            <th class="px-4 py-3 font-semibold">Status</th>
            <th class="px-4 py-3 font-semibold text-right">Aksi</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in store.tryouts" :key="item.id" class="border-t border-gray-50 hover:bg-gray-50/60">
            <td class="px-4 py-3 text-gray-400 font-mono">{{ item.id }}</td>
            <td class="px-4 py-3 font-medium text-gray-700">{{ item.name }}</td>
            <td class="px-4 py-3 text-gray-500">{{ item.slug }}</td>
            <td class="px-4 py-3">
              <span v-if="item.isfree" class="text-green-600 font-semibold">Gratis</span>
              <span v-else-if="item.price" class="text-gray-700">Rp {{ formatRupiah(item.price) }}</span>
              <span v-else class="text-red-500">Belum diatur</span>
            </td>
            <td class="px-4 py-3">
              <span
                class="px-2 py-1 rounded-lg text-xs font-semibold"
                :class="item.isclosed ? 'bg-red-50 text-red-600' : 'bg-green-50 text-green-600'"
              >
                {{ item.isclosed ? 'Ditutup' : 'Buka' }}
              </span>
            </td>
            <td class="px-4 py-3 text-right space-x-2 whitespace-nowrap">
              <button
                @click="openEditModal(item)"
                class="text-amber-600 bg-amber-50 px-3 py-1.5 rounded-lg text-xs font-semibold hover:bg-amber-100 transition-all"
              >
                Edit
              </button>
              <button
                @click="openDeleteModal(item)"
                class="text-red-600 bg-red-50 px-3 py-1.5 rounded-lg text-xs font-semibold hover:bg-red-100 transition-all"
              >
                Hapus
              </button>
            </td>
          </tr>
        </tbody>
      </table>

      <div v-if="store.tryouts.length === 0" class="text-center py-10 text-gray-400 italic">
        Belum ada data tryout.
      </div>
    </div>

    <!-- Modal Tambah -->
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
        class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm overflow-y-auto"
        @click="isModalOpen = false"
      >
        <div class="bg-white w-full max-w-lg rounded-3xl shadow-2xl my-8 border-2 border-[#2966F3]" @click.stop>
          <div class="p-6 border-b border-gray-50 flex justify-between items-center">
            <h3 class="text-xl font-bold text-gray-800">Tambah Tryout</h3>
            <button @click="isModalOpen = false" class="text-gray-400 hover:text-gray-600">
              <Icon name="lucide:x" size="24" />
            </button>
          </div>

          <form @submit.prevent="handleAdd" class="p-6 space-y-4">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-semibold text-gray-700 mb-2">Nama Tryout</label>
                <input v-model="form.name" type="text" required class="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:border-[#2966F3] focus:ring-2 focus:ring-[#2966F3]/20 outline-none" />
              </div>
              <div>
                <label class="block text-sm font-semibold text-gray-700 mb-2">Slug (opsional)</label>
                <input v-model="form.slug" type="text" placeholder="auto dari nama" class="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:border-[#2966F3] focus:ring-2 focus:ring-[#2966F3]/20 outline-none" />
              </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-semibold text-gray-700 mb-2">Harga (Rp)</label>
                <input v-model="form.price" type="number" min="0" :disabled="form.isfree" class="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:border-[#2966F3] focus:ring-2 focus:ring-[#2966F3]/20 outline-none disabled:bg-gray-100" />
              </div>
              <div class="flex items-end gap-4 pb-1">
                <label class="flex items-center gap-2 text-sm font-medium text-gray-700">
                  <input v-model="form.isfree" type="checkbox" class="w-4 h-4" /> Gratis
                </label>
                <label class="flex items-center gap-2 text-sm font-medium text-gray-700">
                  <input v-model="form.isclosed" type="checkbox" class="w-4 h-4" /> Tutup
                </label>
              </div>
            </div>

            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-2">Marketing</label>
              <input v-model="form.marketing" type="text" class="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:border-[#2966F3] focus:ring-2 focus:ring-[#2966F3]/20 outline-none" />
            </div>

            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-2">Gambar (URL)</label>
              <input v-model="form.image" type="text" class="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:border-[#2966F3] focus:ring-2 focus:ring-[#2966F3]/20 outline-none" />
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-semibold text-gray-700 mb-2">Mulai</label>
                <input v-model="form.startedAt" type="datetime-local" class="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:border-[#2966F3] focus:ring-2 focus:ring-[#2966F3]/20 outline-none" />
              </div>
              <div>
                <label class="block text-sm font-semibold text-gray-700 mb-2">Selesai</label>
                <input v-model="form.endedAt" type="datetime-local" class="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:border-[#2966F3] focus:ring-2 focus:ring-[#2966F3]/20 outline-none" />
              </div>
            </div>

            <p v-if="errorMessage" class="text-sm text-red-500">{{ errorMessage }}</p>

            <div class="flex space-x-3 pt-2">
              <button type="button" @click="isModalOpen = false" class="flex-1 px-4 py-3 rounded-2xl border border-gray-100 font-semibold text-gray-500 hover:bg-gray-50 transition-all">
                Batal
              </button>
              <button type="submit" :disabled="isSaving" class="flex-1 px-4 py-3 rounded-2xl bg-[#2966F3] font-semibold text-white hover:bg-blue-700 transition-all shadow-md disabled:opacity-50">
                {{ isSaving ? 'Menyimpan...' : 'Simpan' }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </Transition>

    <!-- Modal Edit -->
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
        class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm overflow-y-auto"
        @click="isModalEditOpen = false"
      >
        <div class="bg-white w-full max-w-lg rounded-3xl shadow-2xl my-8 border-2 border-amber-400" @click.stop>
          <div class="p-6 border-b border-gray-50 flex justify-between items-center">
            <h3 class="text-xl font-bold text-gray-800">Edit Tryout</h3>
            <button @click="isModalEditOpen = false" class="text-gray-400 hover:text-gray-600">
              <Icon name="lucide:x" size="24" />
            </button>
          </div>

          <form @submit.prevent="handleEdit" class="p-6 space-y-4">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-semibold text-gray-700 mb-2">Nama Tryout</label>
                <input v-model="formEdit.name" type="text" required class="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 outline-none" />
              </div>
              <div>
                <label class="block text-sm font-semibold text-gray-700 mb-2">Slug</label>
                <input v-model="formEdit.slug" type="text" class="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 outline-none" />
              </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-semibold text-gray-700 mb-2">Harga (Rp)</label>
                <input v-model="formEdit.price" type="number" min="0" :disabled="formEdit.isfree" class="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 outline-none disabled:bg-gray-100" />
              </div>
              <div class="flex items-end gap-4 pb-1">
                <label class="flex items-center gap-2 text-sm font-medium text-gray-700">
                  <input v-model="formEdit.isfree" type="checkbox" class="w-4 h-4" /> Gratis
                </label>
                <label class="flex items-center gap-2 text-sm font-medium text-gray-700">
                  <input v-model="formEdit.isclosed" type="checkbox" class="w-4 h-4" /> Tutup
                </label>
              </div>
            </div>

            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-2">Marketing</label>
              <input v-model="formEdit.marketing" type="text" class="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 outline-none" />
            </div>

            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-2">Gambar (URL)</label>
              <input v-model="formEdit.image" type="text" class="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 outline-none" />
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-semibold text-gray-700 mb-2">Mulai</label>
                <input v-model="formEdit.startedAt" type="datetime-local" class="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 outline-none" />
              </div>
              <div>
                <label class="block text-sm font-semibold text-gray-700 mb-2">Selesai</label>
                <input v-model="formEdit.endedAt" type="datetime-local" class="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 outline-none" />
              </div>
            </div>

            <p v-if="errorMessage" class="text-sm text-red-500">{{ errorMessage }}</p>

            <div class="flex space-x-3 pt-2">
              <button type="button" @click="isModalEditOpen = false" class="flex-1 px-4 py-3 rounded-2xl border border-gray-100 font-semibold text-gray-500 hover:bg-gray-50 transition-all">
                Batal
              </button>
              <button type="submit" :disabled="isSaving" class="flex-1 px-4 py-3 rounded-2xl bg-amber-500 font-semibold text-white hover:bg-amber-600 transition-all shadow-md disabled:opacity-50">
                {{ isSaving ? 'Menyimpan...' : 'Perbarui' }}
              </button>
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
          <h3 class="text-xl font-bold text-gray-800 mb-2">Hapus Tryout?</h3>
          <p class="text-gray-500 text-sm mb-8">
            Menghapus <span class="font-bold text-gray-700">"{{ itemToDelete?.name }}"</span> akan menghapus semua materi, soal, jawaban, dan pembayaran terkait. Tindakan ini tidak dapat dibatalkan.
          </p>
          <p v-if="errorMessage" class="text-sm text-red-500 mb-4">{{ errorMessage }}</p>
          <div class="flex space-x-3">
            <button @click="isModalDeleteOpen = false" class="flex-1 px-4 py-3 rounded-2xl border border-gray-100 font-semibold text-gray-500 hover:bg-gray-50 transition-all">
              Batal
            </button>
            <button @click="handleConfirmDelete" class="flex-1 px-4 py-3 rounded-2xl bg-red-600 font-semibold text-white hover:bg-red-700 transition-all shadow-md shadow-red-200">
              Ya, Hapus
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>
