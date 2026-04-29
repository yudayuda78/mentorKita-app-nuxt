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
  { path: '/mentorkita-admin/pengaturan', label: 'Pengaturan', icon: 'lucide:settings' },
]


const route = useRoute()


const isActive = (path) => route.path === path
</script>

<template>
  <div class="flex min-h-screen">
    <!-- Sidebar -->
    <aside class="w-24 bg-[#2966F3] rounded-3xl m-5 shadow-md ">
   
      <nav class="p-2 space-y-4">
        <NuxtLink 
          v-for="item in routes" 
          :key="item.path"
          :to="item.path" 
          class="flex flex-col items-center p-2 rounded-2xl transition-all group"
          :class="isActive(item.path) ? 'bg-white text-[#2966F3] shadow-lg' : 'hover:bg-white/20 text-white'"
        >
          <Icon :name="item.icon" class="w-6 h-6 mb-1 group-hover:scale-110 transition-transform" />
          <span class="text-[10px] font-medium text-center leading-tight">{{ item.label }}</span>
        </NuxtLink>
      </nav>
    </aside>

    <!-- Main content -->
    <div class="flex-1 flex flex-col">
      <!-- Header -->
      <header class="bg-white shadow px-6 py-4 flex justify-between items-center">
        <h1 class="text-xl font-semibold">Admin</h1>
        <div class="flex items-center space-x-4">
          <span class="text-gray-600">{{ name }}</span>
          <button class="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600" @click="handleLogout">Logout</button>
        </div>
      </header>

      <!-- Page content -->
      <main class="p-6 bg-gray-100 flex-1 overflow-y-auto">
        <slot />
      </main>
    </div>
  </div>
</template>
