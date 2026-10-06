<script setup>
  definePageMeta({
  middleware: 'auth'
})

const route = useRoute()
const router = useRouter()

const showModal = ref(false)
const checking = ref(true)

const closeModal = () => {
  showModal.value = false
}

onMounted(async () => {
  const isSmallDevice = window.innerWidth < 768
  if (isSmallDevice) {
    showModal.value = true
  }

  try {
    const res = await $fetch(`/api/snbt/${route.params.slug}`)
    const detail = res?.data
    if (detail && !detail.isfree) {
      const check = await $fetch('/api/tryout/payment/check', {
        query: { snbtTryoutId: detail.id },
        credentials: 'include',
      })
      if (!check?.data?.isPaid) {
        await router.push(`/tryout/snbt/${route.params.slug}`)
        return
      }
    }
  } catch (e) {
    // jika gagal memeriksa, biarkan halaman tampil agar tidak deadlock
  } finally {
    checking.value = false
  }
})
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
    <Snbt v-if="!checking" />
    <div v-else class="text-center py-10 text-gray-500">⏳ Memeriksa akses...</div>
  </main>
    <Footer/>
</template>