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
   if (!username.value || !email.value || !password.value || !passwordConfirmation.value) {
    error.value = 'Semua field harus diisi'
    return
  }

  if (password.value !== passwordConfirmation.value) {
    error.value = 'Password dan konfirmasi password tidak cocok'
    return
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
    error.value = 'Format email tidak valid'
    return
  }

  if (password.value.length < 6) {
    error.value = 'Password minimal 6 karakter'
    return
  }

  error.value = ''
  await auth.register(username.value, email.value, password.value)
  console.log('auth.error:', auth.error)

  if (!auth.error) {
    await navigateTo('/login')
  } else {
    error.value = auth.error
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
      Sudah punya akun? <a href="/login" class="text-blue-600 no-underline">Login di sini</a>
    </p>
<div class="hidden md:flex w-full md:w-[40%] h-[200px] md:h-full border-r border-gray-300 items-center justify-center">
  <img src="/signup.webp" alt="Belajar" class="max-h-full max-w-full object-contain" />
</div>


    <div class="flex items-center justify-center w-full md:w-[60%] min-h-screen md:min-h-full">
      <div class="w-[90%] max-w-[400px] space-y-4 p-6 bg-white rounded-xl shadow-md">
         <img src="/mentorkitacircle.webp" class="h-10 mx-auto" alt="MentorKita Logo" />
        <h2 class="text-2xl font-bold text-center text-blue-600">Register</h2>
       

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
              <svg v-if="!showPassword" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none"
              viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
              <path stroke-linecap="round" stroke-linejoin="round"
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path stroke-linecap="round" stroke-linejoin="round"
                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none"
              viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
              <path stroke-linecap="round" stroke-linejoin="round"
                d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.27-2.943-9.544-7a10.051 10.051 0 012.122-3.393m3.365-2.479A9.956 9.956 0 0112 5c4.478 0 8.27 2.943 9.544 7a9.993 9.993 0 01-4.108 5.197M15 12a3 3 0 00-3-3m0 0a3 3 0 00-3 3m3-3L3 21" />
            </svg>
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
              <svg v-if="!showConfirmPassword" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none"
              viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
              <path stroke-linecap="round" stroke-linejoin="round"
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path stroke-linecap="round" stroke-linejoin="round"
                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none"
              viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
              <path stroke-linecap="round" stroke-linejoin="round"
                d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.27-2.943-9.544-7a10.051 10.051 0 012.122-3.393m3.365-2.479A9.956 9.956 0 0112 5c4.478 0 8.27 2.943 9.544 7a9.993 9.993 0 01-4.108 5.197M15 12a3 3 0 00-3-3m0 0a3 3 0 00-3 3m3-3L3 21" />
            </svg>
            </button>
          </div>
        </div>

        <!-- Pesan Error -->
        <p v-if="error" class="text-red-600 text-sm text-center">{{ error }}</p>

        <button @click="handleRegister" class="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md">
          Register
        </button>

        <button
  @click="loginWithGoogle"
  class="w-full bg-white border border-gray-300 hover:bg-gray-100 text-gray-700 py-2 rounded-md flex items-center justify-center gap-2"
>
  <svg
    class="w-5 h-5"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 48 48"
  >
    <path
      fill="#FFC107"
      d="M43.6 20.5H42V20H24v8h11.3C33.9 32.4 29.5 35 24 35c-6.1 0-11-4.9-11-11s4.9-11 11-11c2.6 0 5 .9 6.9 2.4l5.7-5.7C33.3 6.6 28.9 5 24 5 13.5 5 5 13.5 5 24s8.5 19 19 19 19-8.5 19-19c0-1.2-.1-2.3-.4-3.5z"
    />
    <path
      fill="#FF3D00"
      d="M6.3 14.7l6.6 4.8C14.4 16.1 18.9 13 24 13c2.6 0 5 .9 6.9 2.4l5.7-5.7C33.3 6.6 28.9 5 24 5c-7.3 0-13.6 4.1-17 10.2z"
    />
    <path
      fill="#4CAF50"
      d="M24 43c5.4 0 10.3-2.1 14-5.6l-6.5-5.3C29.9 33.7 27 35 24 35c-5.5 0-9.9-3.6-11.4-8.5l-6.6 5.1C9.9 38.9 16.4 43 24 43z"
    />
    <path
      fill="#1976D2"
      d="M43.6 20.5H42V20H24v8h11.3c-1.2 3.3-3.6 6-6.8 7.5l6.5 5.3C38.1 37 43 31.3 43.6 20.5z"
    />
  </svg>
  <span>Daftar Menggunakan Google</span>
</button>


        <p class="text-xs text-center text-gray-500">
          Dengan membuat akun, saya setuju dengan
          <NuxtLink to="/syarat-ketentuan" class="text-blue-600 no-underline hover:no-underline">Syarat dan Ketentuan </NuxtLink>, dan
          <NuxtLink to="/kebijakan-privasi" class="text-blue-600 no-underline hover:no-underline">Kebijakan Privasi</NuxtLink>.
        </p>

         <p class="text-sm text-center text-gray-600 md:hidden">
          Sudah punya akun? <a href="/login" class="text-blue-600 no-underline hover:no-underline">Login di sini</a>
        </p>
      </div>
    </div>
  </div>
</template>