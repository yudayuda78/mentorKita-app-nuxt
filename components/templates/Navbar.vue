<script setup>
import { ref } from "vue";
const isMobileMenuOpen = ref(false);
const toggleMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value;
};
</script>

<template>
  <nav class="bg-white shadow-md px-6 md:px-16 py-4">
    <div class="flex items-center justify-between px-0 md:px-12">
      <!-- Logo -->
      <div class="flex items-center gap-4">
        <NuxtLink to="/">
          <img
            src="/mentorkita23.webp"
            class="h-10"
            alt="MentorKita Logo"
          />
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

      <!-- Menu Desktop (dijalankan hanya di client) -->
      <ClientOnly>
        <ul class="hidden md:flex gap-6 items-center">
          <li>
            <NuxtLink to="/kelas" class="text-gray-700 hover:text-blue-600">
              Kelas
            </NuxtLink>
          </li>
          <li>
            <NuxtLink to="/tryout" class="text-gray-700 hover:text-blue-600">
              Try Out
            </NuxtLink>
          </li>
          <li>
            <NuxtLink to="/mentoring" class="text-gray-700 hover:text-blue-600">
              Mentoring
            </NuxtLink>
          </li>
          <li>
            <NuxtLink to="/product" class="text-gray-700 hover:text-blue-600">
              Product
            </NuxtLink>
          </li>
          <li>
            <Button
              :colorClass="'bg-[#2966F2] text-white'"
              class="p-2 px-4 text-sm font-medium"
            >
              Login
            </Button>
          </li>
        </ul>
      </ClientOnly>
    </div>

    <!-- Mobile Menu -->
    <div v-if="isMobileMenuOpen" class="md:hidden mt-4 space-y-3">
      <NuxtLink to="/kelas" class="block text-gray-700 hover:text-blue-600">
        Kelas
      </NuxtLink>
      <NuxtLink to="/tryout" class="block text-gray-700 hover:text-blue-600">
        Try Out
      </NuxtLink>
      <NuxtLink to="/mentoring" class="block text-gray-700 hover:text-blue-600">
        Mentoring
      </NuxtLink>
      <NuxtLink to="/product" class="block text-gray-700 hover:text-blue-600">
        Product
      </NuxtLink>
      <Button
        :colorClass="'bg-[#2966F2] text-white'"
        class="w-full text-center p-2 text-sm font-medium"
      >
        Login
      </Button>
    </div>
  </nav>
</template>
