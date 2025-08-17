<script setup>
definePageMeta({
  ssr: true,
})

const route = useRoute()
const slug = route.params.slug

const { data: response, pending, error } = await useAsyncData(`blog-${slug}`, () =>
  $fetch(`/api/blog/${slug}`)
)

const blog = computed(() => response.value?.data || {})
</script>

<template>
  <Navbar />
  <div class="max-w-3xl mx-auto py-12 px-4">
    <div v-if="pending" class="text-center text-gray-500">Loading...</div>
    <div v-else-if="error" class="text-center text-red-500">Terjadi kesalahan saat memuat data.</div>
    <div v-else>
      <h1 class="text-3xl font-bold mb-4" v-html="blog.title"></h1>
      
      <img
        :src="blog.thumbnail || 'https://via.placeholder.com/600x400'"
        alt="Thumbnail"
        class="w-full h-auto rounded mb-6"
      />

      <p class="text-sm text-gray-500 mb-4">
        Dibuat pada: {{ new Date(blog.createdAt).toLocaleDateString('id-ID', {
          day: 'numeric', month: 'long', year: 'numeric'
        }) }}
      </p>

      <!-- Artikel dengan enter / spasi -->
      <div class="text-gray-800 leading-relaxed whitespace-pre-line">
        {{ blog.artikel }}
      </div>
    </div>
  </div>
  <Footer />
</template>
