<script setup>
import { ref, computed } from 'vue'

// Data asli
const rawRankings = [
  { name: 'Alice', score: 95, school: 'SMA 1 Jakarta' },
  { name: 'Bob', score: 90, school: 'SMA 2 Bandung' },
  { name: 'Charlie', score: 88, school: 'SMA 3 Surabaya' },
  { name: 'Diana', score: 85, school: 'SMA 1 Yogyakarta' },
  { name: 'Evan', score: 82, school: 'SMA 5 Medan' },
  { name: 'Fiona', score: 80, school: 'SMA 4 Bali' },
  { name: 'George', score: 78, school: 'SMA 2 Semarang' },
  { name: 'Hannah', score: 76, school: 'SMA 1 Palembang' },
]

// Tambahkan rank global
const rankings = ref(
  rawRankings
    .sort((a, b) => b.score - a.score)
    .map((item, index) => ({ ...item, rank: index + 1 }))
)

const searchQuery = ref('')
const currentPage = ref(1)
const itemsPerPage = 5

// Filter (berdasarkan nama atau sekolah)
const filteredRankings = computed(() =>
  rankings.value.filter(item =>
    item.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
    item.school.toLowerCase().includes(searchQuery.value.toLowerCase())
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
</script>

<template>
  <Navbar />

  <section class="p-4 max-w-5xl mx-auto">
    <h1 class="text-2xl font-bold mb-4">Ranking & Score</h1>

    <!-- Search -->
    <input
      v-model="searchQuery"
      type="text"
      placeholder="Search by name or school..."
      class="border px-4 py-2 rounded w-full mb-4"
    />

    <!-- Table -->
    <table class="w-full table-auto border-collapse border">
      <thead>
        <tr class="bg-gray-100">
          <th class="border px-4 py-2 text-left">Rank</th>
          <th class="border px-4 py-2 text-left">Name</th>
          <th class="border px-4 py-2 text-left">Asal Sekolah</th>
          <th class="border px-4 py-2 text-left">Score</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in paginatedRankings" :key="item.name">
          <td class="border px-4 py-2">{{ item.rank }}</td>
          <td class="border px-4 py-2">{{ item.name }}</td>
          <td class="border px-4 py-2">{{ item.school }}</td>
          <td class="border px-4 py-2">{{ item.score }}</td>
        </tr>
        <tr v-if="!paginatedRankings.length">
          <td colspan="4" class="text-center p-4">No results found.</td>
        </tr>
      </tbody>
    </table>

    <!-- Pagination -->
    <div class="flex justify-center mt-4 gap-2">
      <button
        v-for="page in totalPages"
        :key="page"
        @click="goToPage(page)"
        class="px-3 py-1 border rounded"
        :class="page === currentPage ? 'bg-blue-500 text-white' : 'bg-white'"
      >
        {{ page }}
      </button>
    </div>
  </section>

  <Footer />
</template>
