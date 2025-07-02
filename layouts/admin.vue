<script setup>
const adminStore = useAdminStore()

const handleLogout = async () => {
  await adminStore.logout()
  await navigateTo('/mentorkita-admin/login')
}
</script>

<template>
  <div class="flex min-h-screen">
    <!-- Sidebar -->
    <aside class="w-64 bg-white shadow-md">
      <div class="p-6 text-xl font-bold border-b border-gray-200">
        Admin Panel
      </div>
      <nav class="p-4 space-y-2">
        <NuxtLink to="/mentorkita-admin" class="block px-4 py-2 rounded hover:bg-gray-100 text-gray-700">Dashboard</NuxtLink>
        <NuxtLink to="/mentorkita-admin/pembayaran-tryout" class="block px-4 py-2 rounded hover:bg-gray-100 text-gray-700">Pembayaran TryOut</NuxtLink>
        <NuxtLink to="/mentorkita-admin/pembayaran-product" class="block px-4 py-2 rounded hover:bg-gray-100 text-gray-700">Pembayaran Product</NuxtLink>
        <NuxtLink to="/mentorkita-admin/statistik-tryout" class="block px-4 py-2 rounded hover:bg-gray-100 text-gray-700">Statistik TryOut</NuxtLink>
        <NuxtLink to="/mentorkita-admin/pengaturan" class="block px-4 py-2 rounded hover:bg-gray-100 text-gray-700">Pengaturan</NuxtLink>
      </nav>
    </aside>

    <!-- Main content -->
    <div class="flex-1 flex flex-col">
      <!-- Header -->
      <header class="bg-white shadow px-6 py-4 flex justify-between items-center">
        <h1 class="text-xl font-semibold">Admin</h1>
        <div class="flex items-center space-x-4">
          <span class="text-gray-600">Admin</span>
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
