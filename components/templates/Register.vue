<script setup>
</script>

<template>
  <div class="w-[400px] mx-auto space-y-4 p-6 bg-white rounded-xl shadow-md">

    <h2>Buat Akun MentorKita</h2>
    <p>Silahkan isi form berikut untuk melanjutkan</p>

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
    <Button class="w-full">Daftar Menggunakan Google</Button>
    <p>Dengan membuat akun, saya setuju dengan Syarat dan Ketentuan, dan Ketentuan Privasi </p>
  </div>
</template>
