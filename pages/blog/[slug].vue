<script setup>
const blog = ref(null)
const route = useRoute()
const slug = route.params.slug  // ambil slug dari URL

onMounted(async () => {
  const response = await $fetch(`/api/blog/${slug}`)
  blog.value = response.data
})
</script>

<template>
    <Navbar/>
     <div v-if="blog" class="max-w-3xl mx-auto px-4 py-10">
    <h1 class="text-3xl font-bold mb-4" v-html="blog.title" />
    
    <img
      :src="blog.thumbnail || 'https://via.placeholder.com/600x400?text=Thumbnail'"
      alt="Thumbnail"
      class="w-full h-64 object-cover rounded-lg mb-6"
    />
    
    <p class="text-sm text-gray-500 mb-2">
      Dipublikasikan pada:
      {{ new Date(blog.createdAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }) }}
    </p>
    
    <p class="text-sm text-gray-500 mb-6">
      Dilihat {{ blog.views }} kali
    </p>
    
    <div class="prose" v-html="blog.artikel" />
  </div>
</template>