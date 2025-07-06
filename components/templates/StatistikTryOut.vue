<template>
  <div class="p-4">
    <h2 class="text-2xl font-bold mb-4">📊 Statistik TryOut</h2>

    <!-- 🔍 Filter isfree -->
    <div class="mb-4">
      <label for="filter" class="mr-2 font-semibold">Filter Jenis TryOut:</label>
      <select id="filter" v-model="selectedFilter" class="p-2 border rounded">
        <option value="all">Semua</option>
        <option value="free">Gratis</option>
        <option value="paid">Berbayar</option>
      </select>
    </div>

    <!-- 📋 Tabel Statistik -->
    <div v-if="filteredTryouts.length">
      <table class="min-w-full bg-white border rounded">
        <thead>
          <tr class="bg-gray-100 text-left">
            <th class="py-2 px-4 border-b">Nama Tryout</th>
            <th class="py-2 px-4 border-b text-center">Jenis</th>
            <th class="py-2 px-4 border-b text-center">Total</th>
            <th class="py-2 px-4 border-b text-center text-green-600">✔️ Sudah Bayar</th>
            <th class="py-2 px-4 border-b text-center text-red-600">❌ Belum Bayar</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="t in filteredTryouts" :key="t.id" class="hover:bg-gray-50">
            <td class="py-2 px-4 border-b">{{ t.name }}</td>
            <td class="py-2 px-4 border-b text-center">
              {{ t.isfree ? 'Gratis' : 'Berbayar' }}
            </td>
            <td class="py-2 px-4 border-b text-center">
              {{ t.paidCount + t.unpaidCount }}
            </td>
            <td class="py-2 px-4 border-b text-center text-green-600">
              {{ t.paidCount }}
            </td>
            <td class="py-2 px-4 border-b text-center text-red-600">
              {{ t.unpaidCount }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div v-else>
      <p class="text-gray-500">Tidak ada data untuk filter tersebut.</p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

const tryouts = ref([])
const selectedFilter = ref('all')

onMounted(async () => {
  const data = await $fetch('/api/snbt/statistic')
  tryouts.value = data
})

// 🔁 Filter berdasarkan isfree
const filteredTryouts = computed(() => {
  if (selectedFilter.value === 'free') {
    return tryouts.value.filter(t => t.isfree === true)
  } else if (selectedFilter.value === 'paid') {
    return tryouts.value.filter(t => t.isfree === false)
  } else {
    return tryouts.value
  }
})
</script>
