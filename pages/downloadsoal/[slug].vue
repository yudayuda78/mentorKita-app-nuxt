<script setup>
definePageMeta({
  ssr: true,
})



// Ambil slug dari params langsung
const route = useRoute()
const slug = route.params.slug

// Pastikan slug tidak kosong sebelum dipakai
if (!slug) {
  throw createError({ statusCode: 400, statusMessage: 'Slug tidak tersedia' })
}

// Fetch data dengan useAsyncData
const { data: response, pending, error } = await useAsyncData(
  `downloadsoal-${slug}`,
  () => $fetch(`/api/downloadsoal/${slug}`)
)


const email = ref('')
const isSubmitted = ref(false)
const showError = ref(false)

async function submitEmail() {
  if (!email.value || !email.value.includes('@')) {
    showError.value = true
    return
  }

  // Simpan ke backend jika perlu (opsional)
  // await $fetch('/api/submit-email', { method: 'POST', body: { email: email.value, slug } })
  await $fetch('/api/downloadsoal', { method: 'POST', body: { title: response.value.data.title,  email: email.value } })

  isSubmitted.value = true
  showError.value = false
}
</script>

<template>
    <Navbar />
  <Section height="min-h-[90vh] pb-16">
    <div class="max-w-3xl mx-auto px-4 py-10">
  
    <div v-if="pending">
      <p>Loading...</p>
    </div>

    <div v-else-if="error">
      <p class="text-red-600">Error: {{ error.message }}</p>
    </div>

    <div v-else-if="response?.data">
      <h1 class="text-2xl font-bold mb-4">
        Download Soal: {{ response.data.title }}
      </h1>
      <p class="mb-4">{{ response.data.description }}</p>

      <div v-if="!isSubmitted" class="max-w-md space-y-4">
        <label class="block text-gray-700">Masukkan Email untuk mendownload:</label>
        <input
          v-model="email"
          type="email"
          placeholder="contoh@email.com"
          class="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          @click="submitEmail"
          class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Submit Email
        </button>
        <p v-if="showError" class="text-red-500 text-sm">Email tidak valid.</p>
      </div>

      <div v-else class="mt-6">
        <p class="mb-4 text-green-600">Terima kasih! Silakan klik tombol di bawah untuk download.</p>
        <a
          :href="response.data.fileUrl"
          download
          class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Download File
        </a>
      </div>
    </div>
  </div>
    </Section>
    <Footer />
</template>
