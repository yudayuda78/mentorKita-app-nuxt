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


const loginWithGoogle = () => {
  window.location.href = '/api/auth/google'
}
</script>

<template>
  <div class="flex h-screen bg-gray-50">
    <!-- Text versi desktop -->
    <!-- <p class="hidden md:block absolute top-4 right-4 text-sm text-gray-600">
      Belum punya akun?
      <RouterLink to="/register" class="text-blue-600 no-underline">Daftar di sini</RouterLink>
    </p> -->

    <!-- Panel kiri untuk desktop -->
    <!-- <div class="bg-amber-200 w-[40%] h-full hidden md:block"></div> -->

    <!-- Form Login -->
    <div class="flex items-center justify-center w-full md:w-[60%] md:mx-auto">
      <form
        @submit.prevent="handleLogin"
        class="w-[90%] max-w-md space-y-5 p-6 bg-white rounded-xl shadow-md"
      >
      <img src="/mentorkitacircle.webp" class="h-10 mx-auto" alt="MentorKita Logo" />
        <h2 class="text-2xl font-bold text-center text-blue-600">Login</h2>
       

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

        <!-- Link Lupa Password -->
        <div class="text-right -mt-2">
          <RouterLink to="/auth/forgot-password" class="text-sm text-blue-600 hover:no-underline">
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
  <span>Login Menggunakan Google</span>
</button>

        <!-- Text versi mobile -->
        <p class="text-sm text-center text-gray-600 ">
          Belum punya akun?
          <RouterLink to="/register" class="text-blue-600 no-underline">Daftar di sini</RouterLink>
        </p>
      </form>
    </div>
  </div>
</template>
