<script setup>
defineProps({
  title: String,
  image: String,
  price: [String, Number],
  description: String,
})

const emit = defineEmits(['buy'])
</script>

<template>
  <div class="bg-white w-80 rounded-2xl shadow hover:shadow-lg transition overflow-hidden flex flex-col">
    <!-- Gambar Produk -->
    <img
      :src="image"
      :alt="title"
      class="w-full h-48 object-cover"
    />

    <!-- Isi Card -->
    <div class="p-4 flex flex-col flex-grow">
      <h3 class="text-lg font-semibold text-gray-800 mb-1 line-clamp-1">{{ title }}</h3>
      <p class="text-sm text-gray-500 mb-2 line-clamp-2">{{ description }}</p>

      <div class="mt-auto flex items-center justify-between">
        <span class="text-primary font-bold text-base">Rp {{ price }}</span>

       <button
  class="bg-blue-600 text-white text-sm px-4 py-2 rounded hover:bg-blue-700 transition"
  @click="emit('buy')"
>
  Beli
</button>
      </div>
    </div>
  </div>
</template>
