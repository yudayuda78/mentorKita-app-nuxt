<script setup>
definePageMeta({
  layout: 'admin',
  middleware: 'admin',
})

const adminStore = useAdminStore()

const form = ref({ currentPassword: '', newPassword: '', confirmPassword: '' })
const saving = ref(false)
const message = ref('')
const isError = ref(false)

onMounted(() => {
  if (!adminStore.admin) adminStore.me()
})

const handleChangePassword = async () => {
  message.value = ''
  isError.value = false

  if (form.value.newPassword.length < 6) {
    message.value = 'Password baru minimal 6 karakter.'
    isError.value = true
    return
  }
  if (form.value.newPassword !== form.value.confirmPassword) {
    message.value = 'Konfirmasi password tidak cocok.'
    isError.value = true
    return
  }

  saving.value = true
  try {
    const res = await $fetch('/api/admin/change-password', {
      method: 'POST',
      credentials: 'include',
      body: { currentPassword: form.value.currentPassword, newPassword: form.value.newPassword },
    })
    message.value = res.message || 'Password berhasil diubah.'
    isError.value = false
    form.value = { currentPassword: '', newPassword: '', confirmPassword: '' }
  } catch (e) {
    message.value = e?.data?.statusMessage || e.message || 'Gagal mengubah password.'
    isError.value = true
  } finally {
    saving.value = false
  }
}
</script>

<template>
  <div class="p-6 max-w-3xl">
    <h1 class="text-2xl font-bold text-gray-800 mb-6">Pengaturan</h1>

    <!-- Info akun -->
    <div class="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm mb-6">
      <h2 class="text-lg font-bold text-gray-800 mb-4">Info Akun</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
        <div>
          <p class="text-gray-400">Username</p>
          <p class="font-semibold text-gray-700">{{ adminStore.admin?.username || '-' }}</p>
        </div>
        <div>
          <p class="text-gray-400">Role</p>
          <p class="font-semibold text-gray-700">{{ adminStore.admin?.role || '-' }}</p>
        </div>
      </div>
    </div>

    <!-- Ganti password -->
    <div class="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm mb-6">
      <h2 class="text-lg font-bold text-gray-800 mb-4">Ganti Password</h2>
      <form @submit.prevent="handleChangePassword" class="space-y-4 max-w-md">
        <div>
          <label class="block text-sm font-semibold text-gray-700 mb-2">Password Lama</label>
          <input v-model="form.currentPassword" type="password" required class="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:border-[#2966F3] outline-none text-gray-700" />
        </div>
        <div>
          <label class="block text-sm font-semibold text-gray-700 mb-2">Password Baru</label>
          <input v-model="form.newPassword" type="password" required class="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:border-[#2966F3] outline-none text-gray-700" />
        </div>
        <div>
          <label class="block text-sm font-semibold text-gray-700 mb-2">Konfirmasi Password Baru</label>
          <input v-model="form.confirmPassword" type="password" required class="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:border-[#2966F3] outline-none text-gray-700" />
        </div>
        <p v-if="message" class="text-sm" :class="isError ? 'text-red-500' : 'text-green-600'">{{ message }}</p>
        <button type="submit" :disabled="saving" class="px-6 py-3 rounded-2xl bg-[#2966F3] font-semibold text-white hover:bg-blue-700 transition-all shadow-md disabled:opacity-50">
          {{ saving ? 'Menyimpan...' : 'Simpan Password' }}
        </button>
      </form>
    </div>

    <!-- Info umum -->
    <div class="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
      <h2 class="text-lg font-bold text-gray-800 mb-4">Informasi Umum</h2>
      <ul class="text-sm text-gray-600 space-y-2">
        <li>• Rekening transfer manual dikelola melalui dashboard StarQRIS (mode QRIS Platform).</li>
        <li>• Harga tryout diatur di menu <span class="font-semibold">Kelola Tryout</span>.</li>
        <li>• Akun admin dikelola di menu <span class="font-semibold">Akun Admin</span>.</li>
      </ul>
    </div>
  </div>
</template>
