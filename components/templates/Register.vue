<script setup>
</script>

<template>
  <div class="flex h-screen flex-col md:flex-row relative">
    <!-- Text Login di atas kanan (desktop), di bawah form (mobile) -->
    <p
      class="text-sm text-right text-gray-600 md:absolute md:top-4 md:right-4 md:text-base md:block hidden"
    >
      Sudah punya akun? <a href="/login" class="text-blue-600 underline">Login di sini</a>
    </p>

    <!-- Panel kiri -->
    <div class="hidden md:block bg-amber-200 w-full md:w-[40%] h-[200px] md:h-full">
      <!-- Bisa isi dengan gambar, ilustrasi, atau info tambahan -->
    </div>

    <!-- Form Register -->
    <div class="flex items-center justify-center w-full md:w-[60%] min-h-screen md:min-h-full">
      <div class="w-[90%] max-w-[400px] space-y-4 p-6 bg-white rounded-xl shadow-md">
        <!-- Text login versi mobile -->
       

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
