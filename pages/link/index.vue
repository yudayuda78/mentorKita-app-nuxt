<template>
  <div class="min-h-screen bg-gray-100 flex items-center justify-center px-4">
    <div class="max-w-md w-full bg-white rounded-2xl shadow-xl p-6 text-center">
      
      <!-- Foto Profil -->
      <img src="https://via.placeholder.com/100" alt="Foto Profil"
           class="w-24 h-24 mx-auto rounded-full border-4 border-blue-500 mb-4" />

      <!-- Nama & Deskripsi -->
      <h1 class="text-2xl font-bold text-gray-800 mb-1">MentorKita</h1>
      <p class="text-sm text-gray-500 mb-6">Belajar bareng SNBT 2026 dan tryout online setiap minggu!</p>

      <!-- Semua Link -->
      <div class="space-y-4 text-left">

        <!-- Instagram -->
        <a href="https://instagram.com/mentorkita" target="_blank"
           class="flex items-center gap-3 px-4 py-3 bg-gradient-to-r from-pink-500 to-yellow-500 text-white rounded-lg font-semibold hover:opacity-90 transition">
          <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M7.75 2C4.298 2 2 4.298 2 7.75v8.5C2 19.702 4.298 22 7.75 22h8.5C19.702 22 22 19.702 22 16.25v-8.5C22 4.298 19.702 2 16.25 2h-8.5zM4 7.75C4 5.679 5.679 4 7.75 4h8.5C18.321 4 20 5.679 20 7.75v8.5c0 2.071-1.679 3.75-3.75 3.75h-8.5C5.679 20 4 18.321 4 16.25v-8.5zM12 7.5a4.5 4.5 0 1 0 0 9 4.5 4.5 0 0 0 0-9zm0 2a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zm4.75-3.25a.75.75 0 1 1 0 1.5.75.75 0 0 1 0-1.5z"/>
          </svg>
          Instagram
        </a>

        <!-- Telegram -->
        <a href="https://t.me/mentorkita" target="_blank"
           class="flex items-center gap-3 px-4 py-3 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 transition">
          <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M9.54 12.52l-.34 4.76c.49 0 .71-.21.97-.46l2.33-2.2 4.83 3.54c.88.48 1.5.22 1.72-.82L22.9 5.68c.31-1.26-.45-1.76-1.25-1.46L1.6 10.2c-1.25.5-1.23 1.23-.22 1.56l5.83 1.82 13.55-8.54L9.54 12.52z" />
          </svg>
          Telegram
        </a>

        <!-- WhatsApp -->
        <a href="https://wa.me/6281234567890" target="_blank"
           class="flex items-center gap-3 px-4 py-3 bg-green-500 text-white rounded-lg font-semibold hover:bg-green-600 transition">
          <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 32 32">
            <path d="M16.043 3c-7.18 0-13 5.82-13 13 0 2.248.59 4.408 1.707 6.297L3 29l6.793-1.725A12.932 12.932 0 0 0 16.043 29c7.18 0 13-5.82 13-13s-5.82-13-13-13zm0 24c-2.18 0-4.32-.59-6.184-1.707l-.44-.26-4.033 1.03 1.072-3.948-.287-.45A10.92 10.92 0 0 1 5.043 16c0-6.038 4.961-11 11-11s11 4.962 11 11-4.961 11-11 11zm6.348-8.45c-.348-.175-2.056-1.016-2.376-1.132-.32-.117-.555-.174-.79.174-.234.348-.91 1.132-1.116 1.366-.206.234-.41.26-.757.087-.348-.175-1.47-.54-2.8-1.72-1.034-.923-1.732-2.06-1.935-2.408-.206-.348-.023-.535.152-.71.155-.154.348-.41.522-.615.174-.206.232-.348.348-.58.117-.234.058-.435-.029-.61-.087-.174-.79-1.91-1.083-2.618-.285-.684-.574-.59-.79-.6-.204-.01-.435-.012-.667-.012s-.61.087-.928.435c-.32.348-1.216 1.19-1.216 2.905s1.246 3.37 1.419 3.6c.174.232 2.452 3.745 5.942 5.253 3.49 1.508 3.49 1.005 4.12.94.63-.065 2.056-.84 2.344-1.65.287-.81.287-1.506.204-1.65-.084-.144-.32-.232-.668-.406z"/>
          </svg>
          WhatsApp
        </a>

        <!-- YouTube -->
        <a href="https://youtube.com/@mentorkita" target="_blank"
           class="flex items-center gap-3 px-4 py-3 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition">
          <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M23.498 6.186a2.99 2.99 0 0 0-2.107-2.11C19.852 3.5 12 3.5 12 3.5s-7.852 0-9.391.576a2.99 2.99 0 0 0-2.107 2.11A31.093 31.093 0 0 0 0 12c0 2.067.14 4.098.502 5.814a2.99 2.99 0 0 0 2.107 2.11c1.539.576 9.391.576 9.391.576s7.852 0 9.391-.576a2.99 2.99 0 0 0 2.107-2.11c.362-1.716.502-3.747.502-5.814a31.093 31.093 0 0 0-.502-5.814zM9.75 15.5v-7l6 3.5-6 3.5z"/>
          </svg>
          YouTube
        </a>

      </div>

      <p class="text-xs text-gray-400 mt-8">&copy; 2025 MentorKita</p>
    </div>
  </div>
</template>



<script setup>
// Tidak perlu script, semua data statis
</script>
