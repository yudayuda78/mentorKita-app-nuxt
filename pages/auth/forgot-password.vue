<script setup>
import { ref } from 'vue'

const email = ref('')
const message = ref('')
const error = ref('')

const submit = async () => {
  error.value = ''
  message.value = ''
  try {
    await $fetch('/api/auth/forgot-password', {
      method: 'POST',
      body: { email: email.value }
    })
    message.value = '📩 Link reset password telah dikirim ke email kamu.'
  } catch (err) {
    error.value = err?.data?.message || 'Terjadi kesalahan atau email tidak ditemukan.'
  }
}
</script>

<template>
  <Navbar />

  <Section>
    <div class="max-w-md mx-auto bg-white p-8 rounded-xl shadow-md mt-10">
      <h2 class="text-2xl font-semibold text-center mb-6 text-gray-700">🔐 Lupa Password</h2>

      <div class="space-y-4">
        <input
          v-model="email"
          type="email"
          placeholder="Masukkan email"
          class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
        />

        <button
          @click="submit"
          class="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition duration-300"
        >
          Kirim Link Reset
        </button>

        <p v-if="message" class="text-green-600 text-sm text-center">{{ message }}</p>
        <p v-if="error" class="text-red-600 text-sm text-center">{{ error }}</p>
      </div>
    </div>
  </Section>

  <Footer />
</template>
