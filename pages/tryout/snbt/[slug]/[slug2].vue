<script setup>
  definePageMeta({
  middleware: 'auth'
})

const showModal = ref(false)

onMounted(() => {
  const isSmallDevice = window.innerWidth < 768
  if (isSmallDevice) {
    showModal.value = true
  }
})

const closeModal = () => {
  showModal.value = false
}
</script>
    
<template>
    <Navbar/>
    <!-- MODAL -->
  <div
    v-if="showModal"
    class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
  >
    <div class="bg-white p-6 rounded-xl shadow-lg max-w-md w-full text-center">
      <h2 class="text-xl font-semibold mb-4">Peringatan</h2>
      <p class="text-gray-700 mb-6">
        Disarankan untuk menggunakan device seperti <strong>laptop</strong> atau <strong>tablet</strong> untuk pengalaman yang lebih optimal.
      </p>
      <button
        class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        @click="closeModal"
      >
        Oke, Mengerti
      </button>
    </div>
  </div>

   <main class="flex-grow min-h-[90vh] pb-16">
    <Snbt/>
  </main>
    <Footer/>
</template>