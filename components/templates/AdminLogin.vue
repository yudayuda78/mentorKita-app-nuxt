<script setup>


const auth = useAuthStore()
const admin = useAdminStore()

const username = ref('')
const password = ref('')
const error = ref('')
const showPassword = ref(false)

const handleLogin = async () => {
  error.value = ''
  const success = await auth.login(email.value, password.value)

  if (!success) {
    error.value = auth.error
    return
  }

  await navigateTo('/')
}
</script>

<template>
  <div class="flex h-screen">
    <!-- Text versi desktop -->
    <p
      class="text-sm text-right text-gray-600 md:absolute md:top-4 md:right-4 md:text-base md:block hidden"
    >
      Belum punya akun? <a href="/register" class="text-blue-600 underline">Register di sini</a>
    </p>

    <!-- Panel kiri -->
    <div class="bg-amber-200 w-[40%] h-full hidden md:block"></div>

    <!-- Form login -->
    <div class="flex items-center justify-center w-full md:w-[60%]">
      <div class="w-[90%] max-w-[400px] space-y-4 p-6 bg-white rounded-xl shadow-md">
        <h2 class="text-2xl font-bold text-center">Masuk ke MentorKita</h2>
        <p class="text-center text-gray-600">Silahkan isi form berikut untuk melanjutkan</p>

        <!-- Email -->
        <Input v-model="email" name="email" type="email" placeholder="Masukkan email">
          Email
        </Input>

        <!-- Password -->
        <div class="relative">
          <input
            v-model="password"
            :type="showPassword ? 'text' : 'password'"
            placeholder="Masukkan password"
            class="w-full px-3 py-2 border rounded-md"
          />
          <button
            type="button"
            @click="showPassword = !showPassword"
            class="absolute inset-y-0 right-2 flex items-center text-sm text-gray-600"
          >
            {{ showPassword ? '🙈' : '👁️' }}
          </button>
        </div>

        <!-- Error -->
        <p v-if="error" class="text-red-600 text-sm text-center">{{ error }}</p>

        <!-- Tombol -->
        <Button @click="handleLogin" class="w-full">Login</Button>
        <Button class="w-full text-white">Daftar Menggunakan Google</Button>

        <!-- Text versi mobile -->
        <p class="text-sm text-center text-gray-600 md:hidden">
          Belum punya akun? <a href="/register" class="text-blue-600 underline">Daftar di sini</a>
        </p>
      </div>
    </div>
  </div>
</template>
