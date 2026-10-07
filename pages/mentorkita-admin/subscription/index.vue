<script setup>
definePageMeta({
  layout: 'admin',
  middleware: 'admin',
})

const store = useSubscriptionAdminStore()

const search = ref('')
const page = ref(1)
const pageSize = 20
let searchTimer = null

const load = () => store.getItems({ page: page.value, pageSize, q: search.value.trim() })

onMounted(load)

watch(search, () => {
  clearTimeout(searchTimer)
  searchTimer = setTimeout(() => {
    page.value = 1
    load()
  }, 300)
})

const goToPage = (p) => {
  if (p < 1 || p > store.meta.totalPages || p === page.value) return
  page.value = p
  load()
}

const formatDate = (d) => d ? new Date(d).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' }) : '-'

const statusClass = (s) =>
  s === 'active' ? 'bg-green-50 text-green-600' : s === 'expired' ? 'bg-amber-50 text-amber-600' : 'bg-red-50 text-red-600'

// Grant modal
const isGrantOpen = ref(false)
const grantForm = ref({ userId: '', days: 90 })
const grantMsg = ref('')

const openGrant = () => {
  grantForm.value = { userId: '', days: 90 }
  grantMsg.value = ''
  isGrantOpen.value = true
}

const handleGrant = async () => {
  if (!grantForm.value.userId) {
    grantMsg.value = 'userId wajib diisi.'
    return
  }
  try {
    const res = await store.grant(Number(grantForm.value.userId), Number(grantForm.value.days) || 90)
    grantMsg.value = res.message || 'Berhasil.'
    await load()
  } catch (e) {
    grantMsg.value = e?.data?.statusMessage || e.message || 'Gagal.'
  }
}

const extend = async (item) => {
  const days = Number(prompt('Perpanjang berapa hari?', '90'))
  if (!days) return
  await store.updateItem(item.id, { days })
  load()
}

const toggleActive = async (item) => {
  await store.updateItem(item.id, { isActive: !item.isActive })
  load()
}

const remove = async (item) => {
  if (!confirm('Hapus subscription ini?')) return
  await store.deleteItem(item.id)
}
</script>

<template>
  <div class="p-6">
    <div class="flex justify-between items-center mb-6">
      <div>
        <h1 class="text-2xl font-bold text-gray-800">Kelola Subscription</h1>
        <p class="text-gray-500 text-sm">Total {{ store.meta.total }} subscription.</p>
      </div>
      <div class="flex items-center gap-3">
        <input v-model="search" type="text" placeholder="Cari username/email..." class="px-4 py-2 rounded-xl border border-gray-200 text-sm w-64 outline-none focus:border-[#2966F3]" />
        <button @click="openGrant" class="bg-[#2966F3] text-white px-4 py-2 rounded-xl text-sm font-semibold hover:bg-blue-700 transition-all shadow-sm flex items-center space-x-2">
          <Icon name="lucide:plus" size="18" />
          <span>Beri Langganan</span>
        </button>
      </div>
    </div>

    <div class="overflow-x-auto bg-white rounded-2xl border border-gray-100 shadow-sm">
      <table class="min-w-full text-sm">
        <thead class="bg-gray-50 text-gray-500 text-left">
          <tr>
            <th class="px-4 py-3 font-semibold">#</th>
            <th class="px-4 py-3 font-semibold">User</th>
            <th class="px-4 py-3 font-semibold">Mulai</th>
            <th class="px-4 py-3 font-semibold">Berakhir</th>
            <th class="px-4 py-3 font-semibold">Status</th>
            <th class="px-4 py-3 font-semibold text-right">Aksi</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in store.items" :key="item.id" class="border-t border-gray-50 hover:bg-gray-50/60">
            <td class="px-4 py-3 text-gray-400 font-mono">{{ item.id }}</td>
            <td class="px-4 py-3">
              <div class="font-medium text-gray-700">{{ item.user?.username }}</div>
              <div class="text-xs text-gray-400">{{ item.user?.email }}</div>
            </td>
            <td class="px-4 py-3 text-gray-500">{{ formatDate(item.startedAt) }}</td>
            <td class="px-4 py-3 text-gray-500">{{ formatDate(item.expiredAt) }}</td>
            <td class="px-4 py-3">
              <span class="px-2 py-1 rounded-lg text-xs font-semibold" :class="statusClass(item.status)">{{ item.status }}</span>
            </td>
            <td class="px-4 py-3 text-right space-x-2 whitespace-nowrap">
              <button @click="extend(item)" class="text-blue-600 bg-blue-50 px-3 py-1.5 rounded-lg text-xs font-semibold hover:bg-blue-100 transition-all">Perpanjang</button>
              <button @click="toggleActive(item)" class="text-amber-600 bg-amber-50 px-3 py-1.5 rounded-lg text-xs font-semibold hover:bg-amber-100 transition-all">{{ item.isActive ? 'Nonaktifkan' : 'Aktifkan' }}</button>
              <button @click="remove(item)" class="text-red-600 bg-red-50 px-3 py-1.5 rounded-lg text-xs font-semibold hover:bg-red-100 transition-all">Hapus</button>
            </td>
          </tr>
        </tbody>
      </table>
      <div v-if="!store.loading && !store.items.length" class="text-center py-10 text-gray-400 italic">Tidak ada data.</div>
      <div v-if="store.loading" class="text-center py-6 text-gray-400">Memuat...</div>
    </div>

    <div v-if="store.meta.totalPages > 1" class="flex justify-center mt-6 gap-2">
      <button @click="goToPage(page - 1)" :disabled="page === 1" class="px-4 py-2 border rounded-full transition disabled:opacity-40">&laquo;</button>
      <span class="px-4 py-2 text-sm text-gray-500">Halaman {{ page }} / {{ store.meta.totalPages }}</span>
      <button @click="goToPage(page + 1)" :disabled="page === store.meta.totalPages" class="px-4 py-2 border rounded-full transition disabled:opacity-40">&raquo;</button>
    </div>

    <Transition
      enter-active-class="transition duration-200 ease-out" enter-from-class="opacity-0 scale-95" enter-to-class="opacity-100 scale-100"
      leave-active-class="transition duration-150 ease-in" leave-from-class="opacity-100 scale-100" leave-to-class="opacity-0 scale-95"
    >
      <div v-if="isGrantOpen" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" @click="isGrantOpen = false">
        <div class="bg-white w-full max-w-md rounded-3xl shadow-2xl border-2 border-[#2966F3]" @click.stop>
          <div class="p-6 border-b border-gray-50 flex justify-between items-center">
            <h3 class="text-xl font-bold text-gray-800">Beri Langganan</h3>
            <button @click="isGrantOpen = false" class="text-gray-400 hover:text-gray-600"><Icon name="lucide:x" size="24" /></button>
          </div>
          <form @submit.prevent="handleGrant" class="p-6 space-y-4">
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-2">User ID</label>
              <input v-model="grantForm.userId" type="number" required class="w-full px-4 py-3 rounded-2xl border border-gray-200 outline-none text-gray-700" />
            </div>
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-2">Durasi (hari)</label>
              <input v-model="grantForm.days" type="number" min="1" required class="w-full px-4 py-3 rounded-2xl border border-gray-200 outline-none text-gray-700" />
            </div>
            <p v-if="grantMsg" class="text-sm text-gray-600">{{ grantMsg }}</p>
            <div class="flex space-x-3 pt-2">
              <button type="button" @click="isGrantOpen = false" class="flex-1 px-4 py-3 rounded-2xl border border-gray-100 font-semibold text-gray-500 hover:bg-gray-50 transition-all">Tutup</button>
              <button type="submit" class="flex-1 px-4 py-3 rounded-2xl bg-[#2966F3] font-semibold text-white hover:bg-blue-700 transition-all shadow-md">Simpan</button>
            </div>
          </form>
        </div>
      </div>
    </Transition>
  </div>
</template>
