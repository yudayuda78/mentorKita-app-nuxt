<script setup>
definePageMeta({
  layout: 'admin',
  middleware: 'admin',
})

const store = useUserAdminStore()

const search = ref('')
const page = ref(1)
const pageSize = 20
let searchTimer = null

const load = () => store.getUsers({ page: page.value, pageSize, q: search.value.trim() })

onMounted(load)

watch(search, () => {
  clearTimeout(searchTimer)
  searchTimer = setTimeout(() => {
    page.value = 1
    load()
  }, 300)
})

const goToPage = (p) => {
  if (p < 1 || p > store.meta.totalPages || p === page.value) return
  page.value = p
  load()
}

// Edit modal
const isEditOpen = ref(false)
const editing = ref(null)
const editForm = ref({ username: '', email: '', role: 'USER', isActive: true })
const saving = ref(false)
const errorMessage = ref('')

const openEdit = (u) => {
  editing.value = u
  editForm.value = {
    username: u.username,
    email: u.email,
    role: u.role,
    isActive: u.isActive,
  }
  errorMessage.value = ''
  isEditOpen.value = true
}

const handleEdit = async () => {
  if (!editing.value) return
  errorMessage.value = ''
  saving.value = true
  try {
    await store.updateUser(editing.value.id, editForm.value)
    isEditOpen.value = false
  } catch (e) {
    errorMessage.value = e?.data?.statusMessage || e.message || 'Gagal menyimpan.'
  } finally {
    saving.value = false
  }
}

// Reset password modal
const isResetOpen = ref(false)
const resetTarget = ref(null)
const newPassword = ref('')
const resetMsg = ref('')

const openReset = (u) => {
  resetTarget.value = u
  newPassword.value = ''
  resetMsg.value = ''
  isResetOpen.value = true
}

const handleReset = async () => {
  if (!resetTarget.value || newPassword.value.length < 6) {
    resetMsg.value = 'Password minimal 6 karakter.'
    return
  }
  try {
    await store.resetPassword(resetTarget.value.id, newPassword.value)
    resetMsg.value = 'Password berhasil direset.'
    newPassword.value = ''
  } catch (e) {
    resetMsg.value = e?.data?.statusMessage || e.message || 'Gagal reset password.'
  }
}

const handleDeactivate = async (u) => {
  if (!confirm(`Nonaktifkan akun "${u.username}"?`)) return
  await store.deactivateUser(u.id)
}
</script>

<template>
  <div class="p-6">
    <div class="flex justify-between items-center mb-6">
      <div>
        <h1 class="text-2xl font-bold text-gray-800">Kelola User</h1>
        <p class="text-gray-500 text-sm">Total {{ store.meta.total }} pengguna.</p>
      </div>
      <input v-model="search" type="text" placeholder="Cari username/email/nama..." class="px-4 py-2 rounded-xl border border-gray-200 text-sm w-72 outline-none focus:border-[#2966F3]" />
    </div>

    <div class="overflow-x-auto bg-white rounded-2xl border border-gray-100 shadow-sm">
      <table class="min-w-full text-sm">
        <thead class="bg-gray-50 text-gray-500 text-left">
          <tr>
            <th class="px-4 py-3 font-semibold">#</th>
            <th class="px-4 py-3 font-semibold">Username</th>
            <th class="px-4 py-3 font-semibold">Email</th>
            <th class="px-4 py-3 font-semibold">Nama</th>
            <th class="px-4 py-3 font-semibold">Role</th>
            <th class="px-4 py-3 font-semibold">Status</th>
            <th class="px-4 py-3 font-semibold text-right">Aksi</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="u in store.users" :key="u.id" class="border-t border-gray-50 hover:bg-gray-50/60">
            <td class="px-4 py-3 text-gray-400 font-mono">{{ u.id }}</td>
            <td class="px-4 py-3 font-medium text-gray-700">{{ u.username }}</td>
            <td class="px-4 py-3 text-gray-500">{{ u.email }}</td>
            <td class="px-4 py-3 text-gray-500">{{ u.userProfile?.fullName || '-' }}</td>
            <td class="px-4 py-3">
              <span class="px-2 py-1 rounded-lg text-xs font-semibold bg-gray-100 text-gray-600">{{ u.role }}</span>
            </td>
            <td class="px-4 py-3">
              <span class="px-2 py-1 rounded-lg text-xs font-semibold" :class="u.isActive ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'">
                {{ u.isActive ? 'Aktif' : 'Nonaktif' }}
              </span>
            </td>
            <td class="px-4 py-3 text-right space-x-2 whitespace-nowrap">
              <button @click="openEdit(u)" class="text-amber-600 bg-amber-50 px-3 py-1.5 rounded-lg text-xs font-semibold hover:bg-amber-100 transition-all">Edit</button>
              <button @click="openReset(u)" class="text-blue-600 bg-blue-50 px-3 py-1.5 rounded-lg text-xs font-semibold hover:bg-blue-100 transition-all">Reset PW</button>
              <button v-if="u.isActive" @click="handleDeactivate(u)" class="text-red-600 bg-red-50 px-3 py-1.5 rounded-lg text-xs font-semibold hover:bg-red-100 transition-all">Nonaktifkan</button>
            </td>
          </tr>
        </tbody>
      </table>
      <div v-if="!store.loading && !store.users.length" class="text-center py-10 text-gray-400 italic">Tidak ada user.</div>
      <div v-if="store.loading" class="text-center py-6 text-gray-400">Memuat...</div>
    </div>

    <div v-if="store.meta.totalPages > 1" class="flex justify-center mt-6 gap-2">
      <button @click="goToPage(page - 1)" :disabled="page === 1" class="px-4 py-2 border rounded-full transition disabled:opacity-40">&laquo;</button>
      <span class="px-4 py-2 text-sm text-gray-500">Halaman {{ page }} / {{ store.meta.totalPages }}</span>
      <button @click="goToPage(page + 1)" :disabled="page === store.meta.totalPages" class="px-4 py-2 border rounded-full transition disabled:opacity-40">&raquo;</button>
    </div>

    <!-- Edit Modal -->
    <Transition
      enter-active-class="transition duration-200 ease-out" enter-from-class="opacity-0 scale-95" enter-to-class="opacity-100 scale-100"
      leave-active-class="transition duration-150 ease-in" leave-from-class="opacity-100 scale-100" leave-to-class="opacity-0 scale-95"
    >
      <div v-if="isEditOpen" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" @click="isEditOpen = false">
        <div class="bg-white w-full max-w-md rounded-3xl shadow-2xl border-2 border-amber-400" @click.stop>
          <div class="p-6 border-b border-gray-50 flex justify-between items-center">
            <h3 class="text-xl font-bold text-gray-800">Edit User</h3>
            <button @click="isEditOpen = false" class="text-gray-400 hover:text-gray-600"><Icon name="lucide:x" size="24" /></button>
          </div>
          <form @submit.prevent="handleEdit" class="p-6 space-y-4">
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-2">Username</label>
              <input v-model="editForm.username" type="text" required class="w-full px-4 py-3 rounded-2xl border border-gray-200 outline-none text-gray-700" />
            </div>
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-2">Email</label>
              <input v-model="editForm.email" type="email" required class="w-full px-4 py-3 rounded-2xl border border-gray-200 outline-none text-gray-700" />
            </div>
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-semibold text-gray-700 mb-2">Role</label>
                <select v-model="editForm.role" class="w-full px-4 py-3 rounded-2xl border border-gray-200 outline-none text-gray-700 bg-white">
                  <option value="USER">USER</option>
                  <option value="ADMIN">ADMIN</option>
                </select>
              </div>
              <div class="flex items-end pb-3">
                <label class="flex items-center gap-2 text-sm font-medium text-gray-700">
                  <input v-model="editForm.isActive" type="checkbox" class="w-4 h-4" /> Aktif
                </label>
              </div>
            </div>
            <p v-if="errorMessage" class="text-sm text-red-500">{{ errorMessage }}</p>
            <div class="flex space-x-3 pt-2">
              <button type="button" @click="isEditOpen = false" class="flex-1 px-4 py-3 rounded-2xl border border-gray-100 font-semibold text-gray-500 hover:bg-gray-50 transition-all">Batal</button>
              <button type="submit" :disabled="saving" class="flex-1 px-4 py-3 rounded-2xl bg-amber-500 font-semibold text-white hover:bg-amber-600 transition-all shadow-md disabled:opacity-50">{{ saving ? 'Menyimpan...' : 'Simpan' }}</button>
            </div>
          </form>
        </div>
      </div>
    </Transition>

    <!-- Reset Password Modal -->
    <Transition
      enter-active-class="transition duration-200 ease-out" enter-from-class="opacity-0 scale-95" enter-to-class="opacity-100 scale-100"
      leave-active-class="transition duration-150 ease-in" leave-from-class="opacity-100 scale-100" leave-to-class="opacity-0 scale-95"
    >
      <div v-if="isResetOpen" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" @click="isResetOpen = false">
        <div class="bg-white w-full max-w-md rounded-3xl shadow-2xl border-2 border-[#2966F3]" @click.stop>
          <div class="p-6 border-b border-gray-50 flex justify-between items-center">
            <h3 class="text-xl font-bold text-gray-800">Reset Password</h3>
            <button @click="isResetOpen = false" class="text-gray-400 hover:text-gray-600"><Icon name="lucide:x" size="24" /></button>
          </div>
          <form @submit.prevent="handleReset" class="p-6 space-y-4">
            <p class="text-sm text-gray-500">Reset password untuk <span class="font-semibold text-gray-700">{{ resetTarget?.username }}</span>.</p>
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-2">Password Baru</label>
              <input v-model="newPassword" type="text" minlength="6" required class="w-full px-4 py-3 rounded-2xl border border-gray-200 outline-none text-gray-700" />
            </div>
            <p v-if="resetMsg" class="text-sm" :class="resetMsg.includes('berhasil') ? 'text-green-600' : 'text-red-500'">{{ resetMsg }}</p>
            <div class="flex space-x-3 pt-2">
              <button type="button" @click="isResetOpen = false" class="flex-1 px-4 py-3 rounded-2xl border border-gray-100 font-semibold text-gray-500 hover:bg-gray-50 transition-all">Tutup</button>
              <button type="submit" class="flex-1 px-4 py-3 rounded-2xl bg-[#2966F3] font-semibold text-white hover:bg-blue-700 transition-all shadow-md">Reset</button>
            </div>
          </form>
        </div>
      </div>
    </Transition>
  </div>
</template>
