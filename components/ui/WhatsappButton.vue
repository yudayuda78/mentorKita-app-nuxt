<!-- components/WhatsappButton.vue -->
<script setup>
const phoneNumber = "628123456789" // ganti dengan nomor WA kamu (format internasional)
const message = "Halo, saya ingin tahu lebih lanjut tentang MentorKita"
</script>

<template>
  <NuxtLink
    to="/link"
    target="_blank"
    external
    class="fixed z-[9999] bottom-6 right-6 bg-green-500 hover:bg-green-600 text-white rounded-full p-4 shadow-lg flex items-center justify-center transition-colors duration-300"
  >
    <svg
      class="w-6 h-6"
      fill="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        d="M20.52 3.48A11.87 11.87 0 0012 0C5.37 0 0 5.37 0 12c0 2.12.55 4.19 1.6 6.02L0 24l6.2-1.63A11.94 11.94 0 0012 24c6.63 0 12-5.37 12-12 0-3.2-1.25-6.21-3.48-8.52zM12 22c-1.86 0-3.67-.5-5.24-1.45l-.38-.23-3.68.97.98-3.59-.25-.37A9.95 9.95 0 012 12c0-5.52 4.48-10 10-10 2.67 0 5.18 1.04 7.07 2.93A9.95 9.95 0 0122 12c0 5.52-4.48 10-10 10zm5.26-7.49c-.29-.14-1.7-.84-1.96-.93-.26-.1-.45-.14-.64.14-.19.29-.73.93-.9 1.12-.17.19-.33.21-.62.07-.29-.14-1.24-.46-2.36-1.47-.87-.78-1.45-1.74-1.62-2.03-.17-.29-.02-.45.12-.59.12-.12.29-.33.43-.5.14-.17.19-.29.29-.48.1-.19.05-.36-.02-.5-.07-.14-.64-1.54-.88-2.11-.23-.55-.47-.48-.64-.49-.17-.01-.36-.01-.55-.01-.19 0-.5.07-.76.36-.26.29-1 1-1 2.45s1.02 2.84 1.16 3.03c.14.19 2 3.05 4.85 4.28.68.29 1.21.46 1.62.59.68.22 1.29.19 1.78.12.54-.08 1.7-.7 1.94-1.37.24-.67.24-1.24.17-1.37-.07-.13-.26-.21-.55-.36z"
      />
    </svg>
  </NuxtLink>
</template>
