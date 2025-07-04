<template>
  <div class="p-4">
    <h2 class="text-xl font-bold mb-4">Daftar Pembayaran Product</h2>

    <!-- 🔍 Search -->
    <input
      v-model="searchQuery"
      type="text"
      placeholder="Cari username, email, atau nama produk..."
      class="mb-4 w-full p-2 border rounded"
    />

    <!-- 📋 Tabel -->
    <table class="min-w-full table-auto border">
      <thead class="bg-gray-100">
        <tr>
          <th class="border px-4 py-2">Username</th>
          <th class="border px-4 py-2">Email</th>
          <th class="border px-4 py-2">Nama Produk</th>
          <th class="border px-4 py-2">Status</th>
          <th class="border px-4 py-2">Aksi</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in paginatedPayments" :key="item.id">
          <td class="border px-4 py-2">{{ item.user.username }}</td>
          <td class="border px-4 py-2">{{ item.user.email }}</td>
          <td class="border px-4 py-2">{{ item.productName }}</td>
          <td class="border px-4 py-2">
            <select v-model="item.status" class="border px-2 py-1 rounded">
              <option value="false">Belum Bayar</option>
              <option value="true">Terbayar</option>
            </select>
          </td>
          <td class="border px-4 py-2">
            <button
              class="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600"
              @click="saveStatus(item)"
            >
              Simpan
            </button>
          </td>
        </tr>
        <tr v-if="paginatedPayments.length === 0">
          <td colspan="5" class="text-center p-4 text-gray-500">
            Tidak ada data ditemukan.
          </td>
        </tr>
      </tbody>
    </table>

    <!-- ⏩ Pagination -->
    <div class="mt-4 flex items-center justify-center space-x-2">
      <button @click="prevPage" :disabled="page === 1" class="px-3 py-1 border rounded">
        &laquo;
      </button>

      <button
        v-for="i in totalPages"
        :key="i"
        @click="setPage(i)"
        :class="['px-3 py-1 border rounded', { 'bg-blue-500 text-white': page === i }]"
      >
        {{ i }}
      </button>

      <button @click="nextPage" :disabled="page === totalPages" class="px-3 py-1 border rounded">
        &raquo;
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

const payments = ref([])
const searchQuery = ref('')
const page = ref(1)
const perPage = 5

// 🚀 Ambil data awal
onMounted(async () => {
  const data = await $fetch('/api/product/payment') // gunakan endpoint kamu
  payments.value = data.map(p => ({
    ...p,
    status: p.isPaid.toString() // ubah ke string supaya bisa dipilih di <select>
  }))
})

// 🔍 Filter
const filteredPayments = computed(() => {
  const query = searchQuery.value.toLowerCase()
  return payments.value.filter(p =>
    p.user.username.toLowerCase().includes(query) ||
    p.user.email.toLowerCase().includes(query) ||
    (p.productName || '').toLowerCase().includes(query)
  )
})

// 📄 Hitung halaman
const totalPages = computed(() => {
  return Math.ceil(filteredPayments.value.length / perPage)
})

// ⛳ Data per halaman
const paginatedPayments = computed(() => {
  const start = (page.value - 1) * perPage
  return filteredPayments.value.slice(start, start + perPage)
})

// 🔁 Navigasi
const setPage = (p) => {
  page.value = p
}
const prevPage = () => {
  if (page.value > 1) page.value--
}
const nextPage = () => {
  if (page.value < totalPages.value) page.value++
}

// 💾 Simpan status
const saveStatus = async (item) => {
  try {
    await $fetch(`/api/product/payment/${item.id}`, {
      method: 'PUT',
      body: {
        isPaid: item.status === 'true'
      }
    })
    alert(`Status untuk ${item.user.username} berhasil disimpan!`)
  } catch (err) {
    alert('Gagal menyimpan status.')
  }
}
</script>
