<script setup>
const props = defineProps({
  error: Object
})

// Fungsi sakti untuk membersihkan error dan balik ke home
const handleError = () => clearError({ redirect: '/' })
</script>

<template>
  <div class="flex flex-col items-center justify-center min-h-screen text-center px-4">
    <template v-if="error.statusCode === 404">
      <h1 class="text-9xl font-bold text-primary">404</h1>
      <p class="text-2xl mt-4 font-semibold">Waduh! Halaman Tidak Ditemukan</p>
      <p class="text-gray-500 mt-2">Sepertinya mentor atau kelas yang Anda cari sudah pindah atau dihapus.</p>
    </template>
    
    <template v-else>
      <h1 class="text-7xl font-bold text-red-500">{{ error.statusCode }}</h1>
      <p class="text-xl mt-4">Ups, terjadi kesalahan pada sistem.</p>
    </template>

    <button 
      @click="handleError"
      class="mt-8 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
    >
      Kembali ke Beranda mentorKita
    </button>
  </div>
</template>