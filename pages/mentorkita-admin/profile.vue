<script setup>
definePageMeta({
  layout: 'admin',
  middleware: 'admin',
})

const adminStore = useAdminStore()

onMounted(() => {
  if (!adminStore.admin) adminStore.me()
})
</script>

<template>
  <div class="p-6 max-w-xl">
    <h1 class="text-2xl font-bold text-gray-800 mb-6">Profil Admin</h1>

    <div class="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex items-center gap-4">
      <div class="w-16 h-16 rounded-full overflow-hidden border-2 border-[#2966F3]">
        <img src="/admin/default-avatar.webp" alt="Avatar" class="w-full h-full object-cover" />
      </div>
      <div>
        <p class="text-lg font-bold text-gray-800">{{ adminStore.admin?.username || '-' }}</p>
        <p class="text-sm text-gray-500">{{ adminStore.admin?.role || '-' }}</p>
      </div>
    </div>

    <NuxtLink to="/mentorkita-admin/pengaturan" class="mt-6 inline-block px-6 py-3 rounded-2xl bg-[#2966F3] font-semibold text-white hover:bg-blue-700 transition-all shadow-md">
      Pengaturan & Ganti Password
    </NuxtLink>
  </div>
</template>
