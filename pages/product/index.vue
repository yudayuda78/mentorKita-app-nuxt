<script setup>
const productStore = useProductStore()

onMounted(() => {
  productStore.fetchProducts()
})
</script>

<template>
  <Navbar />

  <Section>
    <div v-if="productStore.loading">Memuat produk...</div>
    <div v-if="productStore.error" class="text-red-500">{{ productStore.error }}</div>

    <div v-if="!productStore.loading && productStore.products.length" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      <Card
        v-for="product in productStore.products"
        :key="product.id"
        :title="product.name"
        :image="product.image"
        :price="`${product.price.toLocaleString('id-ID')}`"
        :description="product.description"
      />
    </div>

    <div v-if="!productStore.loading && productStore.products.length === 0">
      Tidak ada produk tersedia.
    </div>
  </Section>

  <Footer />
</template>