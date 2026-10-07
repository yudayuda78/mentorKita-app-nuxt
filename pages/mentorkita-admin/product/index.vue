<script setup>
definePageMeta({
  layout: 'admin',
  middleware: 'admin',
})

const store = useProductAdminStore()

onMounted(() => store.getProducts())

const isModalOpen = ref(false)
const isModalEditOpen = ref(false)
const isModalDeleteOpen = ref(false)
const currentEditId = ref(null)
const itemToDelete = ref(null)
const saving = ref(false)
const uploading = ref(false)
const errorMessage = ref('')

const emptyForm = () => ({ name: '', slug: '', price: '', image: '', description: '' })
const form = ref(emptyForm())
const formEdit = ref(emptyForm())

const formatRupiah = (v) => Number(v || 0).toLocaleString('id-ID')

const uploadImage = async (event, formRef) => {
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
      body: { folder: 'uploads', files: [{ name: file.name, content }] },
    })
    formRef.value.image = res.files?.[0] || ''
  } catch (e) {
    errorMessage.value = 'Gagal mengunggah gambar: ' + (e?.data?.statusMessage || e.message)
  } finally {
    uploading.value = false
    event.target.value = ''
  }
}

const handleAdd = async () => {
  if (!form.value.name || form.value.price === '') return
  errorMessage.value = ''
  saving.value = true
  try {
    await store.addProduct(form.value)
    form.value = emptyForm()
    isModalOpen.value = false
  } catch (e) {
    errorMessage.value = e?.data?.statusMessage || e.message || 'Gagal menyimpan.'
  } finally {
    saving.value = false
  }
}

const openEditModal = (item) => {
  currentEditId.value = item.id
  formEdit.value = {
    name: item.name || '',
    slug: item.slug || '',
    price: item.price ?? '',
    image: item.image || '',
    description: item.description || '',
  }
  errorMessage.value = ''
  isModalEditOpen.value = true
}

const handleEdit = async () => {
  if (!formEdit.value.name || !currentEditId.value) return
  errorMessage.value = ''
  saving.value = true
  try {
    await store.updateProduct(currentEditId.value, formEdit.value)
    isModalEditOpen.value = false
  } catch (e) {
    errorMessage.value = e?.data?.statusMessage || e.message || 'Gagal memperbarui.'
  } finally {
    saving.value = false
  }
}

const openDeleteModal = (item) => {
  itemToDelete.value = item
  isModalDeleteOpen.value = true
}

const handleConfirmDelete = async () => {
  if (!itemToDelete.value) return
  try {
    await store.deleteProduct(itemToDelete.value.id)
    isModalDeleteOpen.value = false
    itemToDelete.value = null
  } catch (e) {
    errorMessage.value = e?.data?.statusMessage || e.message || 'Gagal menghapus.'
  }
}
</script>

<template>
  <div class="p-6">
    <div class="flex justify-between items-center mb-6">
      <div>
        <h1 class="text-2xl font-bold text-gray-800">Kelola Produk</h1>
        <p class="text-gray-500 text-sm">Kelola produk digital yang dijual.</p>
      </div>
      <button @click="isModalOpen = true; errorMessage = ''" class="bg-[#2966F3] text-white px-4 py-2 rounded-xl text-sm font-semibold hover:bg-blue-700 transition-all shadow-sm flex items-center space-x-2">
        <Icon name="lucide:plus" size="18" />
        <span>Tambah Produk</span>
      </button>
    </div>

    <div class="overflow-x-auto bg-white rounded-2xl border border-gray-100 shadow-sm">
      <table class="min-w-full text-sm">
        <thead class="bg-gray-50 text-gray-500 text-left">
          <tr>
            <th class="px-4 py-3 font-semibold">#</th>
            <th class="px-4 py-3 font-semibold">Nama</th>
            <th class="px-4 py-3 font-semibold">Slug</th>
            <th class="px-4 py-3 font-semibold">Harga</th>
            <th class="px-4 py-3 font-semibold text-right">Aksi</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in store.products" :key="item.id" class="border-t border-gray-50 hover:bg-gray-50/60">
            <td class="px-4 py-3 text-gray-400 font-mono">{{ item.id }}</td>
            <td class="px-4 py-3 font-medium text-gray-700">{{ item.name }}</td>
            <td class="px-4 py-3 text-gray-500">{{ item.slug }}</td>
            <td class="px-4 py-3 text-gray-700">Rp {{ formatRupiah(item.price) }}</td>
            <td class="px-4 py-3 text-right space-x-2 whitespace-nowrap">
              <button @click="openEditModal(item)" class="text-amber-600 bg-amber-50 px-3 py-1.5 rounded-lg text-xs font-semibold hover:bg-amber-100 transition-all">Edit</button>
              <button @click="openDeleteModal(item)" class="text-red-600 bg-red-50 px-3 py-1.5 rounded-lg text-xs font-semibold hover:bg-red-100 transition-all">Hapus</button>
            </td>
          </tr>
        </tbody>
      </table>
      <div v-if="!store.products.length" class="text-center py-10 text-gray-400 italic">Belum ada produk.</div>
    </div>

    <!-- Modal Tambah/Edit -->
    <Transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0 scale-95"
      enter-to-class="opacity-100 scale-100"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="opacity-100 scale-100"
      leave-to-class="opacity-0 scale-95"
    >
      <div v-if="isModalOpen || isModalEditOpen" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm overflow-y-auto py-10" @click="isModalOpen = false; isModalEditOpen = false">
        <div class="bg-white w-full max-w-lg rounded-3xl shadow-2xl border-2 my-auto" :class="isModalEditOpen ? 'border-amber-400' : 'border-[#2966F3]'" @click.stop>
          <div class="p-6 border-b border-gray-50 flex justify-between items-center">
            <h3 class="text-xl font-bold text-gray-800">{{ isModalEditOpen ? 'Edit Produk' : 'Tambah Produk' }}</h3>
            <button @click="isModalOpen = false; isModalEditOpen = false" class="text-gray-400 hover:text-gray-600"><Icon name="lucide:x" size="24" /></button>
          </div>
          <form @submit.prevent="isModalEditOpen ? handleEdit() : handleAdd()" class="p-6 space-y-4">
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-2">Nama Produk</label>
              <input v-model="(isModalEditOpen ? formEdit : form).name" type="text" required class="w-full px-4 py-3 rounded-2xl border border-gray-200 outline-none text-gray-700" />
            </div>
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-semibold text-gray-700 mb-2">Slug (opsional)</label>
                <input v-model="(isModalEditOpen ? formEdit : form).slug" type="text" placeholder="auto" class="w-full px-4 py-3 rounded-2xl border border-gray-200 outline-none text-gray-700" />
              </div>
              <div>
                <label class="block text-sm font-semibold text-gray-700 mb-2">Harga (Rp)</label>
                <input v-model="(isModalEditOpen ? formEdit : form).price" type="number" min="0" required class="w-full px-4 py-3 rounded-2xl border border-gray-200 outline-none text-gray-700" />
              </div>
            </div>
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-2">Gambar</label>
              <input type="file" accept="image/*" @change="(e) => uploadImage(e, isModalEditOpen ? formEdit : form)" class="text-sm" />
              <img v-if="(isModalEditOpen ? formEdit : form).image" :src="(isModalEditOpen ? formEdit : form).image" class="mt-2 max-w-[180px] rounded-lg border" alt="preview" />
            </div>
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-2">Deskripsi</label>
              <textarea v-model="(isModalEditOpen ? formEdit : form).description" rows="3" class="w-full px-4 py-3 rounded-2xl border border-gray-200 outline-none text-gray-700 resize-none"></textarea>
            </div>
            <p v-if="errorMessage" class="text-sm text-red-500">{{ errorMessage }}</p>
            <div class="flex space-x-3 pt-2">
              <button type="button" @click="isModalOpen = false; isModalEditOpen = false" class="flex-1 px-4 py-3 rounded-2xl border border-gray-100 font-semibold text-gray-500 hover:bg-gray-50 transition-all">Batal</button>
              <button type="submit" :disabled="saving || uploading" class="flex-1 px-4 py-3 rounded-2xl font-semibold text-white transition-all shadow-md disabled:opacity-50" :class="isModalEditOpen ? 'bg-amber-500 hover:bg-amber-600' : 'bg-[#2966F3] hover:bg-blue-700'">{{ saving ? 'Menyimpan...' : 'Simpan' }}</button>
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
      <div v-if="isModalDeleteOpen" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" @click="isModalDeleteOpen = false">
        <div class="bg-white w-full max-w-sm rounded-3xl shadow-2xl p-8 text-center border-2 border-red-100" @click.stop>
          <div class="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center text-red-500 mx-auto mb-6">
            <Icon name="lucide:alert-triangle" size="40" />
          </div>
          <h3 class="text-xl font-bold text-gray-800 mb-2">Hapus Produk?</h3>
          <p class="text-gray-500 text-sm mb-8">Menghapus <span class="font-bold text-gray-700">"{{ itemToDelete?.name }}"</span> akan menghapus riwayat pembayaran terkait.</p>
          <div class="flex space-x-3">
            <button @click="isModalDeleteOpen = false" class="flex-1 px-4 py-3 rounded-2xl border border-gray-100 font-semibold text-gray-500 hover:bg-gray-50 transition-all">Batal</button>
            <button @click="handleConfirmDelete" class="flex-1 px-4 py-3 rounded-2xl bg-red-600 font-semibold text-white hover:bg-red-700 transition-all shadow-md">Ya, Hapus</button>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>
