<script setup>
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

        <Input name="email" type="email" placeholder="Masukkan email">
          Email
        </Input>

        <Input name="password" type="password" placeholder="Masukkan password">
          Password
        </Input>

        <Button class="w-full">Login</Button>
        <Button class="w-full  text-white">Daftar Menggunakan Google</Button>
      </div>
    </div>
  </div>
</template>

