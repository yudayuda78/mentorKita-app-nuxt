<script setup>
</script>

<template>
  <div class="flex h-screen">
    <!-- Panel kiri -->
    <div class="bg-amber-200 w-[40%] h-full">
      <!-- Bisa isi dengan gambar, ilustrasi, atau info tambahan -->
    </div>

    <!-- Form Register -->
    <div class="flex items-center justify-center w-[60%]">
      <div class="w-[400px] space-y-4 p-6 bg-white rounded-xl shadow-md">
        <h2 class="text-2xl font-bold text-center">Buat Akun MentorKita</h2>
        <p class="text-center text-gray-600">Silahkan isi form berikut untuk melanjutkan</p>

        <Input name="username" type="text" placeholder="Masukkan username">
          Username
        </Input>

        <Input name="email" type="email" placeholder="Masukkan email">
          Email
        </Input>

        <Input name="password" type="password" placeholder="Masukkan password">
          Password
        </Input>

        <Input name="password-confirmation" type="password" placeholder="Konfirmasi password">
          Konfirmasi Password
        </Input>

        <Button class="w-full">Register</Button>
        <Button class="w-full bg-red-500 hover:bg-red-600 text-white">Daftar Menggunakan Google</Button>

        <p class="text-xs text-center text-gray-500">
          Dengan membuat akun, saya setuju dengan <span class="text-blue-600 underline">Syarat dan Ketentuan</span>, dan <span class="text-blue-600 underline">Kebijakan Privasi</span>.
        </p>
      </div>
    </div>
  </div>
</template>
