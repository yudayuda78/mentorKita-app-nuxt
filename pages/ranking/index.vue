<script setup>
const ranking = useRankingStore()

const searchQuery = ref('')
const selectedTryout = ref('')
const currentPage = ref(1)
const pageSize = 20

let searchTimer = null

const loadLeaderboard = async () => {
  if (!selectedTryout.value) return
  await ranking.fetchLeaderboard({
    slug: selectedTryout.value,
    page: currentPage.value,
    pageSize,
    q: searchQuery.value.trim(),
  })
}

onMounted(async () => {
  await ranking.fetchTryouts()
  if (ranking.tryoutOptions.length) {
    selectedTryout.value = ranking.tryoutOptions[0].slug
    await loadLeaderboard()
  }
})

watch(selectedTryout, async () => {
  currentPage.value = 1
  await loadLeaderboard()
})

watch(searchQuery, () => {
  clearTimeout(searchTimer)
  searchTimer = setTimeout(() => {
    currentPage.value = 1
    loadLeaderboard()
  }, 300)
})

const goToPage = async (page) => {
  if (page < 1 || page > ranking.meta.totalPages || page === currentPage.value) return
  currentPage.value = page
  await loadLeaderboard()
}

// Paginasi berjendela agar tidak merender ribuan tombol
const pageWindow = computed(() => {
  const total = ranking.meta.totalPages || 0
  const current = currentPage.value
  const span = 2
  const start = Math.max(1, current - span)
  const end = Math.min(total, current + span)
  const pages = []
  for (let i = start; i <= end; i++) pages.push(i)
  return pages
})

const totalParticipants = computed(() => ranking.meta.total || 0)
</script>

<template>
  <Navbar />
  <WhatsappButton />
  <section class="p-6 max-w-5xl mx-auto">
    <h1 class="text-3xl font-bold mb-4 text-blue-700">Ranking & Score</h1>

    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
      <div class="bg-blue-100 text-blue-900 p-4 rounded-xl shadow">
        <p class="text-sm font-semibold">Peserta Tryout</p>
        <p class="text-2xl font-bold">{{ totalParticipants }}</p>
      </div>
      <div class="bg-green-100 text-green-900 p-4 rounded-xl shadow">
        <p class="text-sm font-semibold">Tryout Dipilih</p>
        <p class="text-lg font-bold truncate">{{ ranking.tryout?.name || '-' }}</p>
      </div>
    </div>

    <div class="mb-4">
      <label class="block text-sm font-medium text-gray-700 mb-1">Filter Tryout:</label>
      <select
        v-model="selectedTryout"
        class="w-full border px-4 py-2 rounded-lg shadow"
      >
        <option v-for="option in ranking.tryoutOptions" :key="option.slug" :value="option.slug">
          {{ option.name }} ({{ option.participants }})
        </option>
      </select>
    </div>

    <input
      v-model="searchQuery"
      type="text"
      placeholder="Cari berdasarkan nama atau sekolah..."
      class="border px-4 py-2 rounded-lg w-full mb-4 shadow"
    />

    <div class="overflow-x-auto rounded-xl shadow">
      <table class="w-full text-left border border-gray-200">
        <thead class="bg-gray-100">
          <tr>
            <th class="px-4 py-3 border w-20">Rank</th>
            <th class="px-4 py-3 border">Nama</th>
            <th class="px-4 py-3 border">Asal Sekolah</th>
            <th class="px-4 py-3 border w-24">Score</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="ranking.loading">
            <td colspan="4" class="text-center p-4 text-gray-500">Memuat ranking...</td>
          </tr>
          <tr
            v-else
            v-for="item in ranking.entries"
            :key="`${item.rank}-${item.name}`"
            class="hover:bg-gray-50 transition"
          >
            <td class="px-4 py-2 border font-semibold">{{ item.rank }}</td>
            <td class="px-4 py-2 border">{{ item.name }}</td>
            <td class="px-4 py-2 border">{{ item.school }}</td>
            <td class="px-4 py-2 border">{{ item.score }}</td>
          </tr>
          <tr v-if="!ranking.loading && !ranking.entries.length">
            <td colspan="4" class="text-center p-4 text-gray-500">Tidak ada hasil.</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div v-if="ranking.meta.totalPages > 1" class="flex justify-center mt-6 gap-2 flex-wrap">
      <button
        @click="goToPage(currentPage - 1)"
        :disabled="currentPage === 1"
        class="px-4 py-2 border rounded-full transition disabled:opacity-40"
      >
        &laquo;
      </button>

      <button
        v-for="page in pageWindow"
        :key="page"
        @click="goToPage(page)"
        class="px-4 py-2 border rounded-full transition"
        :class="{
          'bg-blue-600 text-white': page === currentPage,
          'bg-white text-blue-600 hover:bg-blue-100': page !== currentPage
        }"
      >
        {{ page }}
      </button>

      <button
        @click="goToPage(currentPage + 1)"
        :disabled="currentPage === ranking.meta.totalPages"
        class="px-4 py-2 border rounded-full transition disabled:opacity-40"
      >
        &raquo;
      </button>
    </div>
  </section>

  <Footer />
</template>
