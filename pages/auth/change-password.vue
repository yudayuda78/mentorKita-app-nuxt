<script setup>
  definePageMeta({
  middleware: 'auth'
})

const oldPassword = ref('')
const newPassword = ref('')
const confirmPassword = ref('')
const showPassword = ref(false)
const message = ref('')
const error = ref('')

const changePassword = async () => {
  message.value = ''
  error.value = ''

  if (!oldPassword.value || !newPassword.value || !confirmPassword.value) {
    error.value = 'Semua field wajib diisi.'
    return
  }

  if (newPassword.value !== confirmPassword.value) {
    error.value = 'Password baru dan konfirmasi tidak cocok.'
    return
  }

  try {
    await $fetch('/api/auth/change-password', {
      method: 'POST',
      body: {
        oldPassword: oldPassword.value,
        newPassword: newPassword.value,
      },
    })
    message.value = '✅ Password berhasil diubah.'
    oldPassword.value = ''
    newPassword.value = ''
    confirmPassword.value = ''
  } catch (err) {
    error.value = err?.data?.message || 'Terjadi kesalahan saat mengganti password.'
  }
}
</script>

<template>
  <Navbar />
  <Section>
    <div class="max-w-md mx-auto bg-white p-6 mt-10 rounded-xl shadow-lg ">
      <h2 class="text-2xl font-bold text-center text-gray-800 mb-6">🔒 Ganti Password</h2>

      <div class="space-y-5">
        <!-- Password lama -->
        <div>
          <label class="block mb-1 text-sm font-medium text-gray-700">Password Lama</label>
          <input
            v-model="oldPassword"
            :type="showPassword ? 'text' : 'password'"
            class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Masukkan password lama"
          />
        </div>

        <!-- Password baru -->
        <div>
          <label class="block mb-1 text-sm font-medium text-gray-700">Password Baru</label>
          <input
            v-model="newPassword"
            :type="showPassword ? 'text' : 'password'"
            class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Masukkan password baru"
          />
        </div>

        <!-- Konfirmasi password baru -->
        <div>
          <label class="block mb-1 text-sm font-medium text-gray-700">Konfirmasi Password Baru</label>
          <input
            v-model="confirmPassword"
            :type="showPassword ? 'text' : 'password'"
            class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Ulangi password baru"
          />
        </div>

        <!-- Toggle tampilkan password -->
        <div class="flex items-center space-x-2">
          <input
            type="checkbox"
            id="togglePassword"
            v-model="showPassword"
            class="rounded border-gray-300"
          />
          <label for="togglePassword" class="text-sm text-gray-700">Tampilkan password</label>
        </div>

        <!-- Pesan -->
        <p v-if="message" class="text-green-600 text-sm text-center">{{ message }}</p>
        <p v-if="error" class="text-red-600 text-sm text-center">{{ error }}</p>

        <!-- Tombol Simpan -->
        <button
          @click="changePassword"
          class="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-md transition duration-300"
        >
          Simpan Perubahan
        </button>
      </div>
    </div>
  </Section>
  <Footer />
</template>
