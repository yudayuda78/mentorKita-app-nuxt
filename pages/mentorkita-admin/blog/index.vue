<script setup>
definePageMeta({
  layout: 'admin',
  middleware: 'admin',
})

const store = useBlogAdminStore()

onMounted(() => store.getArticles())

const isModalDeleteOpen = ref(false)
const itemToDelete = ref(null)
const errorMessage = ref('')

const openDeleteModal = (item) => {
  itemToDelete.value = item
  isModalDeleteOpen.value = true
}

const handleConfirmDelete = async () => {
  if (!itemToDelete.value) return
  errorMessage.value = ''
  try {
    await store.deleteArticle(itemToDelete.value.id)
    isModalDeleteOpen.value = false
    itemToDelete.value = null
  } catch (e) {
    errorMessage.value = e?.data?.statusMessage || e.message || 'Gagal menghapus.'
  }
}
</script>

<template>
  <div class="p-6">
    <div class="flex justify-between items-center mb-6">
      <div>
        <h1 class="text-2xl font-bold text-gray-800">Kelola Blog</h1>
        <p class="text-gray-500 text-sm">Tulis dan kelola artikel blog.</p>
      </div>
      <NuxtLink
        to="/mentorkita-admin/blog/create"
        class="bg-[#2966F3] text-white px-4 py-2 rounded-xl text-sm font-semibold hover:bg-blue-700 transition-all shadow-sm flex items-center space-x-2"
      >
        <Icon name="lucide:plus" size="18" />
        <span>Tulis Artikel</span>
      </NuxtLink>
    </div>

    <div class="overflow-x-auto bg-white rounded-2xl border border-gray-100 shadow-sm">
      <table class="min-w-full text-sm">
        <thead class="bg-gray-50 text-gray-500 text-left">
          <tr>
            <th class="px-4 py-3 font-semibold">#</th>
            <th class="px-4 py-3 font-semibold">Judul</th>
            <th class="px-4 py-3 font-semibold">Slug</th>
            <th class="px-4 py-3 font-semibold">Views</th>
            <th class="px-4 py-3 font-semibold text-right">Aksi</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in store.articles" :key="item.id" class="border-t border-gray-50 hover:bg-gray-50/60">
            <td class="px-4 py-3 text-gray-400 font-mono">{{ item.id }}</td>
            <td class="px-4 py-3 font-medium text-gray-700">{{ item.title }}</td>
            <td class="px-4 py-3 text-gray-500">{{ item.slug }}</td>
            <td class="px-4 py-3 text-gray-500">{{ item.views }}</td>
            <td class="px-4 py-3 text-right space-x-2 whitespace-nowrap">
              <NuxtLink :to="`/mentorkita-admin/blog/${item.id}`" class="text-amber-600 bg-amber-50 px-3 py-1.5 rounded-lg text-xs font-semibold hover:bg-amber-100 transition-all">Edit</NuxtLink>
              <button @click="openDeleteModal(item)" class="text-red-600 bg-red-50 px-3 py-1.5 rounded-lg text-xs font-semibold hover:bg-red-100 transition-all">Hapus</button>
            </td>
          </tr>
        </tbody>
      </table>
      <div v-if="!store.articles.length" class="text-center py-10 text-gray-400 italic">Belum ada artikel.</div>
    </div>

    <Transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0 scale-95"
      enter-to-class="opacity-100 scale-100"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="opacity-100 scale-100"
      leave-to-class="opacity-0 scale-95"
    >
      <div v-if="isModalDeleteOpen" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" @click="isModalDeleteOpen = false">
        <div class="bg-white w-full max-w-sm rounded-3xl shadow-2xl p-8 text-center border-2 border-red-100" @click.stop>
          <div class="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center text-red-500 mx-auto mb-6">
            <Icon name="lucide:alert-triangle" size="40" />
          </div>
          <h3 class="text-xl font-bold text-gray-800 mb-2">Hapus Artikel?</h3>
          <p class="text-gray-500 text-sm mb-8">
            Menghapus <span class="font-bold text-gray-700">"{{ itemToDelete?.title }}"</span> tidak dapat dibatalkan.
          </p>
          <p v-if="errorMessage" class="text-sm text-red-500 mb-4">{{ errorMessage }}</p>
          <div class="flex space-x-3">
            <button @click="isModalDeleteOpen = false" class="flex-1 px-4 py-3 rounded-2xl border border-gray-100 font-semibold text-gray-500 hover:bg-gray-50 transition-all">Batal</button>
            <button @click="handleConfirmDelete" class="flex-1 px-4 py-3 rounded-2xl bg-red-600 font-semibold text-white hover:bg-red-700 transition-all shadow-md">Ya, Hapus</button>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>
