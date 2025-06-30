<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const password = ref('')
const confirmPassword = ref('')
const message = ref('')
const error = ref('')
const route = useRoute()
const router = useRouter()

const token = route.query.token

const reset = async () => {
  if (password.value !== confirmPassword.value) {
    error.value = 'Konfirmasi password tidak cocok.'
    return
  }

  try {
    const res = await $fetch('/api/auth/reset-password', {
      method: 'POST',
      body: {
        token,
        password: password.value,
        password_confirmation: confirmPassword.value
      }
    })
    message.value = 'Password berhasil direset. Silakan login.'
    setTimeout(() => router.push('/auth/login'), 2000)
  } catch (err) {
    error.value = 'Token tidak valid atau sudah kedaluwarsa.'
  }
}
</script>

<template>
  <div>
    <h2>Reset Password</h2>
    <input v-model="password" type="password" placeholder="Password baru" />
    <input v-model="confirmPassword" type="password" placeholder="Konfirmasi password" />
    <button @click="reset">Reset</button>
    <p v-if="message">{{ message }}</p>
    <p v-if="error" style="color: red">{{ error }}</p>
  </div>
</template>
