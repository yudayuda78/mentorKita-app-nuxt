<script setup>
import { ref } from 'vue'
const isMobileMenuOpen = ref(false)
const toggleMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}
</script>

<template>
  <nav class="bg-white shadow-md px-16 py-4">
    <div class="flex items-center justify-between px-0 md:px-12">
      <!-- Logo -->
      <div class="flex items-center gap-4">
        <NuxtLink to="/">
        <img src="/public/mentorkita23.webp" class="h-10" alt="MentorKita Logo" />
        </NuxtLink>

      </div>

      <!-- Hamburger Button -->
      <button class="md:hidden text-gray-800" @click="toggleMenu">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>

      <!-- Menu Desktop -->
      <ul class="hidden md:flex gap-6 items-center">
        <NuxtLink to="/kelas">
        <li><a href="#" class="text-gray-700 hover:text-blue-600">Kelas</a></li>
        </NuxtLink>
        <NuxtLink to="/tryout">
        <li><a href="#" class="text-gray-700 hover:text-blue-600">Try Out</a></li>
        </NuxtLink>
        <li><a href="#" class="text-gray-700 hover:text-blue-600">Mentoring</a></li>
        <li><a href="#" class="text-gray-700 hover:text-blue-600">Product</a></li>
        <li>
          <Button :colorClass="'bg-[#2966F2] text-white'" class="p-2 px-4 text-sm font-medium">
            Login
          </Button>
        </li>
      </ul>
    </div>

    <!-- Mobile Menu -->
    <div v-if="isMobileMenuOpen" class="md:hidden mt-4 space-y-3">
      <a href="#" class="block text-gray-700 hover:text-blue-600">Kelas</a>
      <a href="#" class="block text-gray-700 hover:text-blue-600">Try Out</a>
      <a href="#" class="block text-gray-700 hover:text-blue-600">Mentoring</a>
      <a href="#" class="block text-gray-700 hover:text-blue-600">Product</a>
      <Button :colorClass="'bg-[#2966F2] text-white'" class="w-full text-center p-2 text-sm font-medium">
        Login
      </Button>
    </div>
  </nav>
</template>
