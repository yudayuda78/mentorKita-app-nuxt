<script setup>
definePageMeta({
  ssr: true,
})

import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

// Pastikan route.params.slug tidak undefined
const slug = computed(() => route.params.slug)

const { data: response, pending, error } = await useAsyncData(
  () => `downloadsoal-${slug.value}`,
  () => {
    if (!slug.value) throw createError({ statusCode: 400, message: 'Slug tidak ditemukan' })
    return $fetch(`/api/downloadsoal/${slug.value}`)
  }
)

const downloadSoal = computed(() => response?.value?.data ?? null)


// Email input dan kontrol UI
const email = ref('')
const emailSubmitted = ref(false)
const emailError = ref('')

const submitEmail = () => {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!email.value || !emailPattern.test(email.value)) {
    emailError.value = 'Masukkan email yang valid.'
    return
  }

  emailError.value = ''
  emailSubmitted.value = true
}
</script>

<template>
  <Navbar />
  <Section height="min-h-[90vh] pb-16 flex items-center justify-center">
    <div class="w-full max-w-xl text-center space-y-6">
      <div v-if="pending" class="text-gray-600 text-lg font-medium">
        Sedang memuat soal...
      </div>

      <div v-else-if="error" class="text-red-600 text-lg font-medium">
        Terjadi kesalahan saat mengambil data.
      </div>

      <div v-else-if="downloadSoal">
        <p class="text-xl font-semibold text-gray-800">
          Download latihan soal: <span class="text-blue-600">{{ downloadSoal.title }}</span>
        </p>

        <div v-if="!emailSubmitted" class="space-y-4 mt-6">
          <p class="text-gray-700">Silakan masukkan email untuk melanjutkan:</p>
          <input
            v-model="email"
            type="email"
            placeholder="Email Anda"
            class="border border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 rounded px-4 py-2 w-full"
          />
          <p v-if="emailError" class="text-red-600 text-sm">{{ emailError }}</p>
          <button
            @click="submitEmail"
            class="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition duration-200"
          >
            Submit
          </button>
        </div>

        <div v-else class="mt-6">
          <Button v-if="downloadSoal.fileUrl">
            <a
              :href="downloadSoal.fileUrl"
              target="_blank"
              class="block w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded text-center transition duration-200"
            >
              Download Soal
            </a>
          </Button>
        </div>
      </div>
    </div>
  </Section>
  <Footer />
</template>

