<script setup>

const showPassword = ref(false)
const showConfirmPassword = ref(false)

const auth = useAuthStore()

const username = ref('')
const email = ref('')
const password = ref('')
const passwordConfirmation = ref('')

const error = ref('')



const handleRegister = async() => {
  if (password.value !== passwordConfirmation.value) {
    error.value = 'Password dan konfirmasi password tidak cocok'
    return
  }

  error.value = ''
  await auth.register(username.value, email.value, password.value)
  console.log('auth.error:', auth.error)
  if (!auth.error) {
    await navigateTo('/login')
  }
}

const loginWithGoogle = () => {
  window.location.href = '/api/auth/google'
}
</script>

<template>
  <div class="flex h-screen flex-col md:flex-row relative">
     <p
      class="text-sm text-right text-gray-600 md:absolute md:top-4 md:right-4 md:text-base md:block hidden"
    >
      Sudah punya akun? <a href="/login" class="text-blue-600 underline">Login di sini</a>
    </p>
<div class="hidden md:flex w-full md:w-[40%] h-[200px] md:h-full border-r border-gray-300 items-center justify-center">
  <img src="/signup.webp" alt="Belajar" class="max-h-full max-w-full object-contain" />
</div>


    <div class="flex items-center justify-center w-full md:w-[60%] min-h-screen md:min-h-full">
      <div class="w-[90%] max-w-[400px] space-y-4 p-6 bg-white rounded-xl shadow-md">
        <h2 class="text-2xl font-bold text-center">Buat Akun MentorKita</h2>
        <p class="text-center text-gray-600">Silahkan isi form berikut untuk melanjutkan</p>

        <input
          v-model="username"
          type="text"
          placeholder="Masukkan username"
          class="w-full px-3 py-2 border rounded-md"
        />

        <input
          v-model="email"
          type="email"
          placeholder="Masukkan email"
          class="w-full px-3 py-2 border rounded-md"
        />

        <!-- Password -->
        <div>
          <div class="relative">
            <input
              v-model="password"
              :type="showPassword ? 'text' : 'password'"
              name="password"
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
        </div>

        <!-- Konfirmasi Password -->
        <div>
          <div class="relative">
            <input
              v-model="passwordConfirmation"
              :type="showConfirmPassword ? 'text' : 'password'"
              name="password-confirmation"
              placeholder="Konfirmasi password"
              class="w-full px-3 py-2 border rounded-md"
            />
            <button
              type="button"
              @click="showConfirmPassword = !showConfirmPassword"
              class="absolute inset-y-0 right-2 flex items-center text-sm text-gray-600"
            >
              {{ showConfirmPassword ? '🙈' : '👁️' }}
            </button>
          </div>
        </div>

        <!-- Pesan Error -->
        <p v-if="error" class="text-red-600 text-sm text-center">{{ error }}</p>

        <button @click="handleRegister" class="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md">
          Register
        </button>

        <button  @click="loginWithGoogle" class="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-md">
          Daftar Menggunakan Google
        </button>

        <p class="text-xs text-center text-gray-500">
          Dengan membuat akun, saya setuju dengan
          <span class="text-blue-600 underline">Syarat dan Ketentuan</span>, dan
          <span class="text-blue-600 underline">Kebijakan Privasi</span>.
        </p>

         <p class="text-sm text-center text-gray-600 md:hidden">
          Sudah punya akun? <a href="/login" class="text-blue-600 underline">Login di sini</a>
        </p>
      </div>
    </div>
  </div>
</template>
