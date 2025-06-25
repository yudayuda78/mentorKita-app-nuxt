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
        <a href="#" class="block px-4 py-2 rounded hover:bg-gray-100 text-gray-700">Dashboard</a>
        <a href="#" class="block px-4 py-2 rounded hover:bg-gray-100 text-gray-700">Pengguna</a>
        <a href="#" class="block px-4 py-2 rounded hover:bg-gray-100 text-gray-700">Konten</a>
        <a href="#" class="block px-4 py-2 rounded hover:bg-gray-100 text-gray-700">Laporan</a>
        <a href="#" class="block px-4 py-2 rounded hover:bg-gray-100 text-gray-700">Pengaturan</a>
      </nav>
    </aside>

    <!-- Main content -->
    <div class="flex-1 flex flex-col">
      
      <!-- Header -->
      <header class="bg-white shadow px-6 py-4 flex justify-between items-center">
        <h1 class="text-xl font-semibold">Dashboard</h1>
        <div class="flex items-center space-x-4">
          <span class="text-gray-600">Admin</span>
          <button class="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600" @click="handleLogout">Logout</button>
        </div>
      </header>

      <!-- Content -->
      <main class="p-6 bg-gray-100 flex-1 overflow-y-auto">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <!-- Card 1 -->
          <div class="bg-white p-4 rounded shadow">
            <h2 class="text-lg font-semibold">Total Pengguna</h2>
            <p class="text-2xl mt-2">1,234</p>
          </div>
          
          <!-- Card 2 -->
          <div class="bg-white p-4 rounded shadow">
            <h2 class="text-lg font-semibold">Laporan Masuk</h2>
            <p class="text-2xl mt-2">56</p>
          </div>

          <!-- Card 3 -->
          <div class="bg-white p-4 rounded shadow">
            <h2 class="text-lg font-semibold">Konten Aktif</h2>
            <p class="text-2xl mt-2">78</p>
          </div>
        </div>
      </main>

    </div>
  </div>
</template>