<script setup>
definePageMeta({
  ssr: true,
})


const route = useRoute();
const slug = route.params.slug;

if (!slug) {
  throw createError({ statusCode: 400, statusMessage: "Slug tidak tersedia" });
}

const { data: response, pending, error } = await useAsyncData(
  () => `blog-${route.params.slug}`,
  () => route.params.slug ? $fetch(`/api/blog/${route.params.slug}`) : null,
  { watch: [() => route.params.slug] } // penting, supaya refetch tiap slug berubah
)
console.log(response.value)

const blog = computed(() => response.value?.data ?? {});
</script>

<template>
    <Navbar />
  <div class="max-w-3xl mx-auto py-12 px-4">
    <div v-if="pending" class="text-center text-gray-500">Loading...</div>
    <div v-else-if="!blog" class="text-center text-gray-500">
  Artikel tidak ditemukan.
</div>

    <div v-else>
       <h1 class="text-3xl font-bold mb-4" >{{ blog.title }}</h1>
      
      <img
        :src="blog.thumbnail"
        alt="Thumbnail"
        class="w-full h-auto rounded mb-6"
      />

      <p class="text-sm text-gray-500 mb-4">
        Dibuat pada: {{ new Date(blog.createdAt).toLocaleDateString('id-ID', {
          day: 'numeric', month: 'long', year: 'numeric'
        }) }}
      </p>

      <div class="text-gray-800 leading-relaxed whitespace-pre-line">
        <p>{{ blog.artikel }}</p>
      </div>
    </div>
  </div>
  <Footer />
</template>

