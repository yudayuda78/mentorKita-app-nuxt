<script setup>
  const auth = useAuthStore()
  const email = ref('')
  const password = ref('')
  const errorMessage = ref('')

  const handleLogin = async() => {
    const response = await auth.login(email.value, password.value)
    if (response === false) {
    errorMessage.value = auth.error
  } else {
    if (auth.user) {
      await navigateTo('/')
    }
  }
  }

</script>

<script setup>
</script>

<template>
  <div class="flex h-screen">
    <!-- Panel kiri -->
    <div class="bg-amber-200 w-[40%] h-full">
      <!-- Bisa ditambahkan gambar, logo, atau informasi -->
    </div>

    <!-- Form login -->
    <div class="flex items-center justify-center w-[60%]">
      <div class="w-[400px] space-y-4 p-6 bg-white rounded-xl shadow-md">
        <h2 class="text-2xl font-bold text-center">Masuk ke MentorKita</h2>
        <p class="text-center text-gray-600">Silahkan isi form berikut untuk melanjutkan</p>

        <Input v-model="email" name="email" type="email" placeholder="Masukkan email">
          Email
        </Input>

        <Input v-model="password" name="password" type="password" placeholder="Masukkan password">
          Password
        </Input>

        <p v-if="errorMessage" class="text-red-500 text-center text-sm">{{ errorMessage }}</p>

        <Button @click="handleLogin" class="w-full">Login</Button>
        <Button class="w-full  text-white">Daftar Menggunakan Google</Button>
      </div>
    </div>
  </div>
</template>

