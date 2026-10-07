<script setup>
const payments = ref([])
const meta = ref({ total: 0, page: 1, pageSize: 10, totalPages: 0 })
const loading = ref(false)
const searchQuery = ref('')
const page = ref(1)
const perPage = 10
const savingId = ref(null)

let searchTimer = null

const formatRupiah = (v) => (v === null || v === undefined ? '-' : 'Rp ' + Number(v).toLocaleString('id-ID'))
const formatDate = (d) => (d ? new Date(d).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' }) : '-')

const load = async () => {
  loading.value = true
  try {
    const res = await $fetch('/api/admin/payment/product', {
      query: { page: page.value, pageSize: perPage, q: searchQuery.value.trim() },
      credentials: 'include',
    })
    payments.value = res.data || []
    meta.value = res.meta || meta.value
  } finally {
    loading.value = false
  }
}

onMounted(load)

watch(searchQuery, () => {
  clearTimeout(searchTimer)
  searchTimer = setTimeout(() => {
    page.value = 1
    load()
  }, 300)
})

const goToPage = (p) => {
  if (p < 1 || p > meta.value.totalPages || p === page.value) return
  page.value = p
  load()
}

const togglePaid = async (item) => {
  const target = !item.isPaid
  if (!confirm(target ? `Tandai lunas untuk ${item.user?.username}?` : `Batalkan status lunas ${item.user?.username}?`)) return
  savingId.value = item.id
  try {
    await $fetch(`/api/product/payment/${item.id}`, {
      method: 'PUT',
      credentials: 'include',
      body: { isPaid: target },
    })
    await load()
  } finally {
    savingId.value = null
  }
}
</script>

<template>
  <div class="p-6">
    <div class="flex justify-between items-center mb-6">
      <div>
        <h1 class="text-2xl font-bold text-gray-800">Pembayaran Produk</h1>
        <p class="text-gray-500 text-sm">Total {{ meta.total }} pembayaran.</p>
      </div>
      <input v-model="searchQuery" type="text" placeholder="Cari user / produk..." class="px-4 py-2 rounded-xl border border-gray-200 text-sm w-64 outline-none focus:border-[#2966F3]" />
    </div>

    <div class="overflow-x-auto bg-white rounded-2xl border border-gray-100 shadow-sm">
      <table class="min-w-full text-sm">
        <thead class="bg-gray-50 text-gray-500 text-left">
          <tr>
            <th class="px-4 py-3 font-semibold">User</th>
            <th class="px-4 py-3 font-semibold">Produk</th>
            <th class="px-4 py-3 font-semibold">Harga</th>
            <th class="px-4 py-3 font-semibold">Status</th>
            <th class="px-4 py-3 font-semibold">Tanggal</th>
            <th class="px-4 py-3 font-semibold text-right">Aksi</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in payments" :key="item.id" class="border-t border-gray-50 hover:bg-gray-50/60">
            <td class="px-4 py-3">
              <div class="font-medium text-gray-700">{{ item.user?.username }}</div>
              <div class="text-xs text-gray-400">{{ item.user?.email }}</div>
            </td>
            <td class="px-4 py-3 text-gray-600">{{ item.product?.name || item.productName }}</td>
            <td class="px-4 py-3 text-gray-700">{{ formatRupiah(item.product?.price) }}</td>
            <td class="px-4 py-3">
              <span class="px-2 py-1 rounded-lg text-xs font-semibold" :class="item.isPaid ? 'bg-green-50 text-green-600' : 'bg-amber-50 text-amber-600'">
                {{ item.isPaid ? 'Terbayar' : 'Belum Bayar' }}
              </span>
            </td>
            <td class="px-4 py-3 text-gray-500">{{ formatDate(item.createdAt) }}</td>
            <td class="px-4 py-3 text-right">
              <button
                @click="togglePaid(item)"
                :disabled="savingId === item.id"
                class="px-3 py-1.5 rounded-lg text-xs font-semibold transition-all disabled:opacity-50"
                :class="item.isPaid ? 'text-red-600 bg-red-50 hover:bg-red-100' : 'text-green-600 bg-green-50 hover:bg-green-100'"
              >
                {{ item.isPaid ? 'Batalkan' : 'Tandai Lunas' }}
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <div v-if="!loading && !payments.length" class="text-center py-10 text-gray-400 italic">Tidak ada data.</div>
      <div v-if="loading" class="text-center py-6 text-gray-400">Memuat...</div>
    </div>

    <div v-if="meta.totalPages > 1" class="flex justify-center mt-6 gap-2">
      <button @click="goToPage(page - 1)" :disabled="page === 1" class="px-4 py-2 border rounded-full transition disabled:opacity-40">&laquo;</button>
      <span class="px-4 py-2 text-sm text-gray-500">Halaman {{ page }} / {{ meta.totalPages }}</span>
      <button @click="goToPage(page + 1)" :disabled="page === meta.totalPages" class="px-4 py-2 border rounded-full transition disabled:opacity-40">&raquo;</button>
    </div>
  </div>
</template>
