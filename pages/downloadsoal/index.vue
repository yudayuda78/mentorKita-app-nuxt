<script setup>
const items = [
  {
    title: 'Card 1',
    description: 'Ini adalah deskripsi singkat untuk Card 1.',
    link: '#'
  },
  {
    title: 'Card 2',
    description: 'Ini adalah deskripsi singkat untuk Card 2.',
    link: '#'
  },
  {
    title: 'Card 3',
    description: 'Ini adalah deskripsi singkat untuk Card 3.',
    link: '#'
  }
]
</script>

<template>
  <Navbar />
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
        <a
          :href="item.link"
          class="mt-4 inline-block text-sm bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Selengkapnya
        </a>
      </div>
    </div>
  </Section>
  <Footer />
</template>
