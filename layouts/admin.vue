<script setup>
const adminStore = useAdminStore()

const handleLogout = async () => {
  await adminStore.logout()
  await navigateTo('/mentorkita-admin/login')
}


onMounted(() => {
  adminStore.me()
})


const name = computed(() => {
  return adminStore.admin?.username || ""
})

console.log(name.value)


const currentYear = new Date().getFullYear()
const routes = [
  { path: '/mentorkita-admin', label: 'Dashboard', icon: 'lucide:layout-dashboard' },
  { path: '/mentorkita-admin/pembayaran-tryout', label: 'Pembayaran TryOut', icon: 'lucide:credit-card' },
  { path: '/mentorkita-admin/pembayaran-product', label: 'Pembayaran Product', icon: 'lucide:shopping-bag' },
  { path: '/mentorkita-admin/statistik-tryout', label: 'Statistik TryOut', icon: 'lucide:bar-chart-3' },
  { path: '/mentorkita-admin/latihan-soal', label: 'Latihan Soal', icon: 'lucide:book-open' },
  { path: '/mentorkita-admin/mini-quiz', label: 'Mini Quiz', icon: 'lucide:book-open' },
  { path: '/mentorkita-admin/pengaturan', label: 'Pengaturan', icon: 'lucide:settings' },
]


const route = useRoute()


const isActive = (path) => {
  if (path === '/mentorkita-admin') return route.path === path
  return route.path.startsWith(path)
}

const isDropdownOpen = ref(false)
</script>

<template>
  <div class="flex min-h-screen">
    <!-- Sidebar -->
    <aside 
      class="w-24 rounded-3xl m-5 transition-all duration-300 border border-transparent"
      :class="route.meta.sidebarColor === 'white' ? 'bg-white shadow-xl border-gray-100' : 'bg-[#2966F3]'"
    >
   
      <nav class="p-2 space-y-4">
        <NuxtLink 
          v-for="item in routes" 
          :key="item.path"
          :to="item.path" 
          class="flex flex-col items-center p-2 rounded-2xl transition-all group"
          :class="[
            isActive(item.path) 
              ? (route.meta.sidebarColor === 'white' ? 'bg-[#2966F3] text-white shadow-lg' : 'bg-white text-[#2966F3] shadow-lg')
              : (route.meta.sidebarColor === 'white' ? 'hover:bg-gray-50 text-[#2966F3]' : 'hover:bg-white/20 text-white')
          ]"
        >
          <Icon :name="item.icon" class="w-6 h-6 mb-1 group-hover:scale-110 transition-transform" />
          <span class="text-[10px] font-medium text-center leading-tight">{{ item.label }}</span>
        </NuxtLink>
      </nav>
    </aside>

    <!-- Main content -->
    <div class="flex-1 flex flex-col">
      <!-- Header -->
      <header class="bg-white px-6 py-4 flex justify-between items-center">
        <img src="public/mentorkitacircle.webp" alt="" width="30" height="30">
        <div class="flex items-center space-x-4">
          <span class="text-gray-600 font-medium">{{ name }}</span>
          
          <!-- Dropdown Container -->
          <div class="relative">
            <div 
              class="w-10 h-10 rounded-full overflow-hidden border-2 border-transparent hover:border-[#2966F3] cursor-pointer transition-all"
              @click.stop="isDropdownOpen = !isDropdownOpen"
            >
              <img src="/admin/default-avatar.webp" alt="Avatar" class="w-full h-full object-cover">
            </div>

            <!-- Dropdown Menu -->
            <transition
              enter-active-class="transition ease-out duration-100"
              enter-from-class="transform opacity-0 scale-95"
              enter-to-class="transform opacity-100 scale-100"
              leave-active-class="transition ease-in duration-75"
              leave-from-class="transform opacity-100 scale-100"
              leave-to-class="transform opacity-0 scale-95"
            >
              <div 
                v-if="isDropdownOpen" 
                class="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-50"
              >
                <div class="px-4 py-2 border-b border-gray-50 mb-1">
                  <p class="text-xs text-gray-400">Signed in as</p>
                  <p class="text-sm font-semibold truncate">{{ name }}</p>
                </div>

                <NuxtLink 
                  to="/mentorkita-admin/profile" 
                  class="flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  <Icon name="lucide:user" size="16" />
                  <span>Profile</span>
                </NuxtLink>

                <NuxtLink 
                  to="/mentorkita-admin/pengaturan" 
                  class="flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  <Icon name="lucide:settings" size="16" />
                  <span>Settings</span>
                </NuxtLink>

                <hr class="my-1 border-gray-50">

                <button 
                  @click="handleLogout" 
                  class="w-full flex items-center space-x-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors text-left"
                >
                  <Icon name="lucide:log-out" size="16" />
                  <span>Logout</span>
                </button>
              </div>
            </transition>
          </div>
        </div>
      </header>

      <!-- Page content -->
      <main class="p-6 bg-gray-100 flex-1 overflow-y-auto">
        <slot />
      </main>
    </div>
  </div>
</template>
