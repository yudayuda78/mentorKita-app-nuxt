<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from "vue";

const auth = useAuthStore();
const showDropdown = ref(false);
const dropdownRef = ref(null);
const username = computed(() => auth.user?.username || "");


const handleLogout = async () => {
  await auth.logout();
  navigateTo("/login");
};

const isMobileMenuOpen = ref(false);
const toggleMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value;
};

// Deteksi klik di luar dropdown
const handleClickOutside = (event) => {
  if (dropdownRef.value && !dropdownRef.value.contains(event.target)) {
    showDropdown.value = false;
  }
};

onMounted(() => {
  document.addEventListener("click", handleClickOutside);
});
onBeforeUnmount(() => {
  document.removeEventListener("click", handleClickOutside);
});
</script>

<template>
  <nav class="bg-white shadow-md px-6 md:px-16 py-4">
    <div class="flex items-center justify-between px-4 md:px-12">
      <NuxtLink to="/">
        <img src="/mentorkita23.webp" class="h-10" alt="MentorKita Logo" />
      </NuxtLink>

      <!-- Hamburger (Mobile) -->
      <button class="md:hidden text-gray-800" @click="toggleMenu">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none"
             viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16"/>
        </svg>
      </button>

      <!-- Desktop Menu -->
      <ClientOnly>
        <ul class="hidden md:flex gap-6 items-center">
          <!-- <li><NuxtLink to="/kelas" class="text-gray-700 hover:text-blue-600">Kelas</NuxtLink></li> -->
            <li><NuxtLink to="/ranking" class="text-gray-700 hover:text-blue-600">Ranking</NuxtLink></li>
          <li><NuxtLink to="/tryout" class="text-gray-700 hover:text-blue-600">Try Out</NuxtLink></li>
          <!-- <li><NuxtLink to="/mentoring" class="text-gray-700 hover:text-blue-600">Mentoring</NuxtLink></li> -->
          <li><NuxtLink to="/product" class="text-gray-700 hover:text-blue-600">Product</NuxtLink></li>
            <li><NuxtLink to="/blog" class="text-gray-700 hover:text-blue-600">Blog</NuxtLink></li>

          <li v-if="!auth.user">
            <NuxtLink to="/login">
              <Button :colorClass="'bg-[#2966F2] text-white'" class="p-2 px-4 text-sm font-medium">Login</Button>
            </NuxtLink>
          </li>

          <li v-else class="relative" ref="dropdownRef">
            <button @click.stop="showDropdown = !showDropdown" class="text-gray-700 hover:text-blue-600 font-medium">
              Halo, {{ username }}
            </button>
            <div
              v-show="showDropdown"
              class="absolute mt-2 bg-white shadow-lg rounded p-2 right-0 z-10"
            >
              <NuxtLink to="/profile" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Profil</NuxtLink>
              <button @click="handleLogout" class="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100">Logout</button>
            </div>
          </li>
        </ul>
      </ClientOnly>
    </div>

    <!-- Mobile Menu -->
    <div v-if="isMobileMenuOpen" class="md:hidden mt-4 space-y-3">
      <!-- <NuxtLink to="/kelas" class="block text-gray-700 hover:text-blue-600">Kelas</NuxtLink> -->
      <NuxtLink to="/ranking" class="block text-gray-700 hover:text-blue-600">Ranking</NuxtLink>
      <NuxtLink to="/tryout" class="block text-gray-700 hover:text-blue-600">Try Out</NuxtLink>
      <!-- <NuxtLink to="/mentoring" class="block text-gray-700 hover:text-blue-600">Mentoring</NuxtLink> -->
      <NuxtLink to="/product" class="block text-gray-700 hover:text-blue-600">Product</NuxtLink>
      <NuxtLink to="/blog" class="block text-gray-700 hover:text-blue-600">Blog</NuxtLink>

      <div v-if="!auth.user">
        <NuxtLink to="/login">
          <Button :colorClass="'bg-[#2966F2] text-white'" class="w-full text-center p-2 text-sm font-medium">Login</Button>
        </NuxtLink>
      </div>

      <div v-else class="relative" ref="dropdownRef">
        <button @click.stop="showDropdown = !showDropdown" class="text-gray-700 hover:text-blue-600 font-medium w-full text-left">
          Halo, {{ username }}
        </button>
        <div
          v-show="showDropdown"
          class="bg-white shadow-lg rounded mt-2 p-2"
        >
          <NuxtLink to="/profil" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Profil</NuxtLink>
          <button @click="handleLogout" class="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100">Logout</button>
        </div>
      </div>
    </div>
  </nav>
</template>
