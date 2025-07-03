<script setup>


const productStore = useProductStore()
const showModal = ref(false)
const selectedProduct = ref(null)
const selectedMethod = ref('')
const copiedBank = ref('')

const openModal = (product) => {
  selectedProduct.value = product
  showModal.value = true
  selectedMethod.value = ''
}

const closeModal = () => {
  showModal.value = false
}

onMounted(() => {
  productStore.fetchProducts()
})

const copyToClipboard = (text, bank) => {
  navigator.clipboard.writeText(text).then(() => {
    copiedBank.value = bank
    setTimeout(() => {
      copiedBank.value = ''
    }, 5000)
  })
}
</script>

<template>
  <Navbar />

  <Section>
    <div v-if="productStore.loading">Memuat produk...</div>
    <div v-if="productStore.error" class="text-red-500">{{ productStore.error }}</div>

    <div
      v-if="!productStore.loading && productStore.products.length"
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4"
    >
      <Card
        v-for="product in productStore.products"
        :key="product.id"
        :title="product.name"
        :image="product.image"
        :price="`${product.price.toLocaleString('id-ID')}`"
        :description="product.description"
        @buy="openModal(product)"
      />
    </div>
  </Section>

<!-- Modal -->
<div
  v-if="showModal"
  class="fixed inset-0 bg-[rgba(0,0,0,0.5)] backdrop-blur-sm flex items-center justify-center z-50"
  @click.self="closeModal"
>
  <div class="bg-white p-6 rounded-lg w-full max-w-md relative shadow-lg">
    <button
      class="absolute top-2 right-2 text-gray-500 hover:text-black text-xl"
      @click="closeModal"
    >
      ✕
    </button>

    <h2 class="text-xl font-bold mb-4">Pembayaran untuk {{ selectedProduct?.name }}</h2>

    <!-- Pilihan metode -->
    <div class="flex gap-2 mb-4">
      <button
        class="px-4 py-2 border rounded "
        :class="{ 'bg-blue-600 text-white': selectedMethod === 'mandiri' }"
        @click="selectedMethod = 'mandiri'"
      >
        Mandiri
      </button>
      <button
        class="px-4 py-2 border rounded "
        :class="{ 'bg-blue-600 text-white': selectedMethod === 'bni' }"
        @click="selectedMethod = 'bni'"
      >
        BNI
      </button>
      <button
        class="px-4 py-2 border rounded "
        :class="{ 'bg-blue-600 text-white': selectedMethod === 'qris' }"
        @click="selectedMethod = 'qris'"
      >
        QRIS
      </button>
    </div>

    <!-- Konten berdasarkan pilihan -->
    <div class="text-gray-800 space-y-2">
      <div v-if="selectedMethod === 'mandiri'">
        <p><strong>Bank Mandiri</strong></p>
        <p>No Rekening: <span class="font-semibold">9876543210</span>
         <button
      class="ml-2 px-2 py-1 text-sm border rounded transition"
      :class="copiedBank === 'mandiri' ? 'text-blue-600 border-blue-600' : 'hover:bg-gray-100'"
      @click="copyToClipboard('9876543210', 'mandiri')"
    >
      {{ copiedBank === 'mandiri' ? 'Tersalin ✅' : 'Salin' }}
    </button></p>
        <p>Atas Nama: MentorKita</p>
      </div>

      <div v-if="selectedMethod === 'bni'">
        <p><strong>Bank BNI</strong></p>
        <p>No Rekening: <span class="font-semibold">1234567890</span>
            <button
      class="ml-2 px-2 py-1 text-sm border rounded transition"
      :class="copiedBank === 'bni' ? 'text-blue-600 border-blue-600' : 'hover:bg-gray-100'"
      @click="copyToClipboard('1234567890', 'bni')"
    >
      {{ copiedBank === 'bni' ? 'Tersalin ✅' : 'Salin' }}
    </button>
        </p>
        <p>Atas Nama: MentorKita</p>
      </div>

      <div v-if="selectedMethod === 'qris'">
        <p><strong>QRIS</strong></p>
        <img
          src=""
          alt="QRIS"
          class="w-40 h-40 object-contain border rounded"
        />
        <p class="text-sm text-gray-500">Scan QRIS untuk melakukan pembayaran.</p>
      </div>

      <div v-if="selectedMethod === ''" class="text-sm text-gray-500 italic">
        Pilih metode pembayaran terlebih dahulu.
      </div>
    </div>
  </div>
</div>


  <Footer />
</template>
