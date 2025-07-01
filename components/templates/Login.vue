<script setup>


const auth = useAuthStore()
const router = useRouter()

const email = ref('')
const password = ref('')
const error = ref('')
const showPassword = ref(false)

const handleLogin = async () => {
  error.value = ''

  if (!email.value || !password.value) {
    error.value = 'Email dan password harus diisi.'
    return
  }

  const success = await auth.login(email.value, password.value)

  if (!success) {
    error.value = auth.error || 'Login gagal.'
    return
  }

  await router.push('/')
}
</script>

<template>
  <div class="flex h-screen bg-gray-50">
    <!-- Text versi desktop -->
    <p class="hidden md:block absolute top-4 right-4 text-sm text-gray-600">
      Belum punya akun?
      <RouterLink to="/register" class="text-blue-600 underline">Daftar di sini</RouterLink>
    </p>

    <!-- Panel kiri untuk desktop -->
    <div class="bg-amber-200 w-[40%] h-full hidden md:block"></div>

    <!-- Form Login -->
    <div class="flex items-center justify-center w-full md:w-[60%]">
      <form
        @submit.prevent="handleLogin"
        class="w-[90%] max-w-md space-y-5 p-6 bg-white rounded-xl shadow-md"
      >
        <h2 class="text-2xl font-bold text-center">Masuk ke MentorKita</h2>
        <p class="text-center text-gray-600">Silakan isi form berikut untuk melanjutkan</p>

        <!-- Input Email -->
        <input
          v-model="email"
          type="email"
          placeholder="Masukkan email"
          class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
        />

        <!-- Input Password -->
        <div class="relative">
          <input
            v-model="password"
            :type="showPassword ? 'text' : 'password'"
            placeholder="Masukkan password"
            class="w-full px-4 py-2 border rounded-md pr-10 focus:outline-none focus:ring focus:ring-blue-300"
          />
          <button
            type="button"
            @click="showPassword = !showPassword"
            class="absolute inset-y-0 right-2 text-gray-600"
          >
            {{ showPassword ? '🙈' : '👁️' }}
          </button>
        </div>

        <!-- Link Lupa Password -->
        <div class="text-right -mt-2">
          <RouterLink to="/auth/forgot-password" class="text-sm text-blue-600 hover:underline">
            Lupa password?
          </RouterLink>
        </div>

        <!-- Error -->
        <p v-if="error" class="text-red-600 text-sm text-center">{{ error }}</p>

        <!-- Tombol Login -->
        <button
          type="submit"
          class="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md font-semibold"
        >
          Login
        </button>

        <!-- Tombol Login Google -->
        <button
          type="button"
          class="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-md font-semibold"
        >
          Daftar Menggunakan Google
        </button>

        <!-- Text versi mobile -->
        <p class="text-sm text-center text-gray-600 md:hidden">
          Belum punya akun?
          <RouterLink to="/register" class="text-blue-600 underline">Daftar di sini</RouterLink>
        </p>
      </form>
    </div>
  </div>
</template>
