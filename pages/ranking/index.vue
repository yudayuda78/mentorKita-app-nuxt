<script setup>

const score = useScoreStore()


onMounted(async() => {
  const fetchAllScore = await score.fetchAllScore()

  const response = await $fetch('/api/ranking/filter-dropdown')
  if (response.success) {
    tryoutOptions.value = response.data
  }
  
})



// Ranking global
const rankings = computed(() => {
  return [...score.allScore]
    .sort((a, b) => b.score - a.score)
    .map((item, index) => ({ ...item, rank: index + 1 }))
})

const searchQuery = ref('')
const currentPage = ref(1)
const itemsPerPage = 5

// Jumlah tryout & rata-rata
const totalTryouts = computed(() => rankings.value.length)
const averageScore = computed(() => {
  const total = rankings.value.reduce((sum, item) => sum + item.score, 0)
  return (total / rankings.value.length).toFixed(2)
})

// Filter

const tryoutOptions = ref([]) 
const selectedTryout = ref('')

const filteredRankings = computed(() =>
  rankings.value.filter(item =>
    (item.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
     item.school.toLowerCase().includes(searchQuery.value.toLowerCase())) &&
    (selectedTryout.value === '' || item.slug === selectedTryout.value)
  )
)

const totalPages = computed(() =>
  Math.ceil(filteredRankings.value.length / itemsPerPage)
)

const paginatedRankings = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  return filteredRankings.value.slice(start, start + itemsPerPage)
})

function goToPage(page) {
  currentPage.value = page
}

watch(selectedTryout, async (newVal) => {
  currentPage.value = 1 // reset ke halaman pertama

  if (newVal === '') {
    await score.fetchAllScore()
  } else {
    try {
      const response = await $fetch('/api/ranking/filter-tryout', {
        method: 'POST',
        body: { tryoutSlug: newVal }
      })

      if (response.success && Array.isArray(response.data)) {
        score.setAllScore(response.data)
      } else {
        score.setAllScore([]) // kosongkan jika gagal
      }
    } catch (err) {
      console.error('Gagal memfilter ranking:', err)
    }
  }
})

</script>

<template>
  <Navbar />
  <WhatsappButton />
  <section class="p-6 max-w-5xl mx-auto">
    <h1 class="text-3xl font-bold mb-4 text-blue-700">Ranking & Score</h1>

    <!-- Info Cards -->
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
      <div class="bg-blue-100 text-blue-900 p-4 rounded-xl shadow">
        <p class="text-sm font-semibold">Jumlah Tryout Diikuti</p>
        <p class="text-2xl font-bold">{{ totalTryouts }}</p>
      </div>
      <div class="bg-green-100 text-green-900 p-4 rounded-xl shadow">
        <p class="text-sm font-semibold">Nilai Rata-rata Semua Tryout</p>
        <p class="text-2xl font-bold">{{ averageScore }}</p>
      </div>
    </div>

<div class="mb-4">
  <label class="block text-sm font-medium text-gray-700 mb-1">Filter Tryout:</label>
  <select
    v-model="selectedTryout"
    class="w-full border px-4 py-2 rounded-lg shadow"
  >
    <option value="">Semua Tryout</option>
    <option v-for="option in tryoutOptions" :key="option.slug" :value="option.slug">
      {{ option.name }}
    </option>
  </select>
</div>

    

    <!-- Search -->
    <input
      v-model="searchQuery"
      type="text"
      placeholder="Cari berdasarkan nama atau sekolah..."
      class="border px-4 py-2 rounded-lg w-full mb-4 shadow"
    />

    <!-- Table -->
    <div class="overflow-x-auto rounded-xl shadow">
      <table class="w-full text-left border border-gray-200">
        <thead class="bg-gray-100">
          <tr>
            <th class="px-4 py-3 border">Rank</th>
            <th class="px-4 py-3 border">Nama</th>
            <th class="px-4 py-3 border">Asal Sekolah</th>
            <th class="px-4 py-3 border">Score</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="item in paginatedRankings"
            :key="item.name"
            class="hover:bg-gray-50 transition"
          >
            <td class="px-4 py-2 border">{{ item.rank }}</td>
            <td class="px-4 py-2 border">{{ item.name }}</td>
            <td class="px-4 py-2 border">{{ item.school }}</td>
            <td class="px-4 py-2 border">{{ item.score }}</td>
          </tr>
          <tr v-if="!paginatedRankings.length">
            <td colspan="4" class="text-center p-4">Tidak ada hasil.</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Pagination -->
    <div class="flex justify-center mt-6 gap-2">
      <button
        v-for="page in totalPages"
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
    </div>
  </section>

  <Footer />
</template>
