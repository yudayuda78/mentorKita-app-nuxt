<script setup>
const props = defineProps({
  articleId: { type: [String, Number], default: null },
})

const store = useBlogAdminStore()
const router = useRouter()

const form = ref({
  title: '',
  slug: '',
  excerpt: '',
  artikel: '',
  thumbnail: '',
})

const loading = ref(false)
const saving = ref(false)
const uploading = ref(false)
const errorMessage = ref('')

const isEdit = computed(() => !!props.articleId)

onMounted(async () => {
  if (isEdit.value) {
    loading.value = true
    try {
      const data = await store.getArticleById(props.articleId)
      if (data) {
        form.value = {
          title: data.title || '',
          slug: data.slug || '',
          excerpt: data.excerpt || '',
          artikel: data.artikel || '',
          thumbnail: data.thumbnail || '',
        }
      }
    } finally {
      loading.value = false
    }
  }
})

const uploadThumbnail = async (event) => {
  const file = event.target.files?.[0]
  if (!file) return
  uploading.value = true
  try {
    const content = await new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = () => resolve(reader.result)
      reader.onerror = reject
      reader.readAsDataURL(file)
    })
    const res = await $fetch('/api/file', {
      method: 'POST',
      credentials: 'include',
      body: { folder: 'blog', files: [{ name: file.name, content }] },
    })
    form.value.thumbnail = (res.files?.[0] || '').split('/').pop()
  } catch (e) {
    errorMessage.value = 'Gagal mengunggah thumbnail: ' + (e?.data?.statusMessage || e.message)
  } finally {
    uploading.value = false
    event.target.value = ''
  }
}

const handleSave = async () => {
  errorMessage.value = ''
  if (!form.value.title || !form.value.artikel) {
    errorMessage.value = 'Judul dan isi artikel wajib diisi.'
    return
  }
  saving.value = true
  try {
    if (isEdit.value) {
      await store.updateArticle(Number(props.articleId), form.value)
    } else {
      await store.addArticle(form.value)
    }
    await router.push('/mentorkita-admin/blog')
  } catch (e) {
    errorMessage.value = e?.data?.statusMessage || e.message || 'Gagal menyimpan artikel.'
  } finally {
    saving.value = false
  }
}
</script>

<template>
  <div class="p-6 max-w-3xl">
    <div class="flex items-center space-x-2 text-sm text-gray-400 mb-2">
      <NuxtLink to="/mentorkita-admin/blog" class="hover:text-[#2966F3] transition-colors">Blog</NuxtLink>
      <Icon name="lucide:chevron-right" size="14" />
      <span class="text-gray-600 font-medium">{{ isEdit ? 'Edit Artikel' : 'Tulis Artikel' }}</span>
    </div>

    <h1 class="text-2xl font-bold text-gray-800 mb-6">{{ isEdit ? 'Edit Artikel' : 'Tulis Artikel Baru' }}</h1>

    <div v-if="loading" class="text-gray-500">Memuat...</div>

    <form v-else @submit.prevent="handleSave" class="space-y-5 bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
      <div>
        <label class="block text-sm font-semibold text-gray-700 mb-2">Judul</label>
        <input v-model="form.title" type="text" required class="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:border-[#2966F3] outline-none text-gray-700" />
      </div>

      <div>
        <label class="block text-sm font-semibold text-gray-700 mb-2">Slug (opsional)</label>
        <input v-model="form.slug" type="text" placeholder="auto dari judul" class="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:border-[#2966F3] outline-none text-gray-700" />
      </div>

      <div>
        <label class="block text-sm font-semibold text-gray-700 mb-2">Ringkasan (excerpt)</label>
        <textarea v-model="form.excerpt" rows="2" class="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:border-[#2966F3] outline-none text-gray-700 resize-none"></textarea>
      </div>

      <div>
        <label class="block text-sm font-semibold text-gray-700 mb-2">Thumbnail</label>
        <input type="file" accept="image/*" @change="uploadThumbnail" class="text-sm" />
        <img v-if="form.thumbnail" :src="`/blog/${form.thumbnail}`" class="mt-3 max-w-[240px] rounded-xl border" alt="thumbnail" />
      </div>

      <div>
        <label class="block text-sm font-semibold text-gray-700 mb-2">Isi Artikel (HTML/Markdown)</label>
        <textarea v-model="form.artikel" rows="16" required class="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:border-[#2966F3] outline-none text-gray-700 font-mono text-sm"></textarea>
      </div>

      <p v-if="errorMessage" class="text-sm text-red-500">{{ errorMessage }}</p>

      <div class="flex space-x-3 pt-2">
        <NuxtLink to="/mentorkita-admin/blog" class="flex-1 px-4 py-3 rounded-2xl border border-gray-100 font-semibold text-gray-500 hover:bg-gray-50 transition-all text-center">Batal</NuxtLink>
        <button type="submit" :disabled="saving || uploading" class="flex-1 px-4 py-3 rounded-2xl bg-[#2966F3] font-semibold text-white hover:bg-blue-700 transition-all shadow-md disabled:opacity-50">
          {{ saving ? 'Menyimpan...' : 'Simpan' }}
        </button>
      </div>
    </form>
  </div>
</template>
