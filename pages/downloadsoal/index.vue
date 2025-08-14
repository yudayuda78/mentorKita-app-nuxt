<script setup>
definePageMeta({
  ssr: true,
})
const downloadSoalStore = useDownloadsoalStore()
await downloadSoalStore.fetchDownloadsoal()


const items = downloadSoalStore.downloadsoal

</script>

<template>
  
  <Navbar />
  <WhatsappButton />
  <Section height="min-h-[90vh] pb-16">
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
      <div
        v-for="(item, index) in items"
        :key="index"
        class="bg-white rounded-2xl shadow-md p-6 flex flex-col justify-between hover:shadow-lg transition duration-300"
      >
        <div>
          <h2 class="text-xl font-semibold mb-2">{{ item.title }}</h2>
          <p class="text-gray-600">{{ item.description }}</p>
        </div>
        <NuxtLink
          :to="`/downloadsoal/${item.slug}`"
          class="mt-4 inline-block bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-300"
        >
          Lihat Soal
        </NuxtLink>
          
      </div>
    </div>
  </Section>
  <Footer />
</template>
