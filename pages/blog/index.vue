<script setup>


const blogStore = useBlogStore()

onMounted(() => {
  blogStore.fetchBlog()
})
</script>

<template>
  <Navbar />
  <Section />

  <!-- Blog Section -->
  <section class="max-w-3xl mx-auto px-4 py-10">
    <h2 class="text-3xl font-bold mb-6">Artikel Terbaru</h2>

    <div class="space-y-10">
      <article
        v-for="item in blogStore.blog"
        :key="item.id"
      >
      <NuxtLink
        :to="`/blog/${item.slug}`">
        <img
          :src="item.thumbnail || 'https://via.placeholder.com/600x400?text=Thumbnail'"
          :alt="item.title"
          class="w-full h-48 object-cover rounded-lg mb-3"
        />
      </NuxtLink>


        <p class="text-sm text-gray-500">
          {{ new Date(item.createdAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }) }}
        </p>

        <NuxtLink :to="`/blog/${item.slug}`">
          <h3 class="text-2xl font-semibold mt-1" v-html="item.title" />
          <p class="text-gray-700 mt-2">{{ item.excerpt }}</p>
        </NuxtLink>
      </article>
    </div>
  </section>

  <Footer />
</template>
