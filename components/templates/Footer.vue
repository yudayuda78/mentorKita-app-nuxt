<script setup></script>

<template>
  <footer class="bg-gray-900 text-white py-10">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
        <!-- Logo & Deskripsi -->
        <div>
          <h2 class="text-2xl font-bold mb-2">MentorKita</h2>
          <p class="text-sm text-gray-400">
            Platform pembelajaran interaktif untuk persiapan SNBT, TKA, dan
            materi pelajaran, dengan soal latihan, pembahasan, dan bimbingan
            dari mentor berpengalaman.
          </p>
        </div>

        <!-- Navigasi -->
        <div>
          <h3 class="text-lg font-semibold mb-4">Menu</h3>
          <ul class="space-y-2 text-sm text-gray-300">
            <li>
              <NuxtLink to="/" class="hover:text-white">Beranda</NuxtLink>
            </li>
            <li>
              <NuxtLink to="/about-us" class="hover:text-white"
                >Tentang Kami</NuxtLink
              >
            </li>
            <li>
              <NuxtLink to="/kebijakan-privasi" class="hover:text-white"
                >Kebijakan Privasi</NuxtLink
              >
            </li>
            <li>
              <NuxtLink to="/syarat-ketentuan" class="hover:text-white"
                >Syarat & Ketentuan</NuxtLink
              >
            </li>
          </ul>
        </div>

        <!-- Sosial Media -->
        <div>
          <h3 class="text-lg font-semibold mb-4">Ikuti Kami</h3>
          <div class="flex space-x-4">
            <!-- Telegram -->
            <NuxtLink
              to="https://t.me/mentorkita"
              target="_blank"
              class="text-gray-400 hover:text-white"
            >
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path
                  d="M9.04 15.47l-.39 5.48c.56 0 .81-.24 1.11-.52l2.66-2.54 5.51 4.03c1.01.56 1.73.27 1.99-.94l3.62-16.98h.01c.33-1.56-.57-2.18-1.58-1.8L1.91 9.29C.39 9.9.4 10.77 1.64 11.16l5.12 1.6 11.88-7.49-9.6 10.2z"
                />
              </svg>
            </NuxtLink>

            <!-- Instagram -->
            <NuxtLink
              to="https://instagram.com/mentor.kita"
              target="_blank"
              class="text-gray-400 hover:text-white"
            >
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path
                  d="M7 2C4.243 2 2 4.243 2 7v10c0 2.757 2.243 5 5 5h10c2.757 0 5-2.243 5-5V7c0-2.757-2.243-5-5-5H7zm10 2c1.654 0 3 1.346 3 3v10c0 1.654-1.346 3-3 3H7c-1.654 0-3-1.346-3-3V7c0-1.654 1.346-3 3-3h10zm-5 3a5 5 0 100 10 5 5 0 000-10zm0 2c1.654 0 3 1.346 3 3s-1.346 3-3 3a3 3 0 010-6zm4.5-.5a1.5 1.5 0 11-3.001.001A1.5 1.5 0 0116.5 8.5z"
                />
              </svg>
            </NuxtLink>

            <!-- WhatsApp -->
            <NuxtLink
              to="https://whatsapp.com/channel/0029VbBHIk90bIdiCPDJbx21"
              target="_blank"
              class="text-gray-400 hover:text-white"
            >
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path
                  d="M20.52 3.48A11.87 11.87 0 0012 0C5.37 0 0 5.37 0 12c0 2.12.55 4.19 1.6 6.02L0 24l6.2-1.63A11.94 11.94 0 0012 24c6.63 0 12-5.37 12-12 0-3.2-1.25-6.21-3.48-8.52zM12 22c-1.86 0-3.67-.5-5.24-1.45l-.38-.23-3.68.97.98-3.59-.25-.37A9.95 9.95 0 012 12c0-5.52 4.48-10 10-10 2.67 0 5.18 1.04 7.07 2.93A9.95 9.95 0 0122 12c0 5.52-4.48 10-10 10zm5.26-7.49c-.29-.14-1.7-.84-1.96-.93-.26-.1-.45-.14-.64.14-.19.29-.73.93-.9 1.12-.17.19-.33.21-.62.07-.29-.14-1.24-.46-2.36-1.47-.87-.78-1.45-1.74-1.62-2.03-.17-.29-.02-.45.12-.59.12-.12.29-.33.43-.5.14-.17.19-.29.29-.48.1-.19.05-.36-.02-.5-.07-.14-.64-1.54-.88-2.11-.23-.55-.47-.48-.64-.49-.17-.01-.36-.01-.55-.01-.19 0-.5.07-.76.36-.26.29-1 1-1 2.45s1.02 2.84 1.16 3.03c.14.19 2 3.05 4.85 4.28.68.29 1.21.46 1.62.59.68.22 1.29.19 1.78.12.54-.08 1.7-.7 1.94-1.37.24-.67.24-1.24.17-1.37-.07-.13-.26-.21-.55-.36z"
                />
              </svg>
            </NuxtLink>
          </div>
        </div>

        <!-- Kontak -->
        <div>
          <h3 class="text-lg font-semibold mb-4">Kontak</h3>
          <p class="text-sm text-gray-400">Email: mentorkita20@gmail.com</p>
          <p class="text-sm text-gray-400">Telepon: +62 895-2640-9087</p>
        </div>
      </div>

      <div
        class="mt-10 border-t border-gray-700 pt-6 text-center text-sm text-gray-500"
      >
        &copy; 2025 MentorKita. All rights reserved.
      </div>
    </div>
  </footer>
</template>
