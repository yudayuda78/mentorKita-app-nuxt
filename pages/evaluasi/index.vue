<script setup>


const evaluasi = useEvaluasiStore()
</script>

<template>
  <Navbar />
  <WhatsappButton />
  <Section>
    <div class="max-w-xl mx-auto p-6 bg-white rounded-xl shadow-lg space-y-6 text-center">
      <h2 class="text-2xl md:text-3xl font-bold text-gray-800">
        🧠 Hasil Evaluasi
      </h2>

      <div class="text-4xl font-extrabold text-green-600">
        {{ evaluasi.score !== null ? evaluasi.score + '%' : 'Belum ada skor' }}
      </div>

      <div class="grid grid-cols-3 gap-6 text-sm text-gray-600 mt-4">
        <div>
          <p class="font-semibold text-blue-500">Benar</p>
          <p class="text-xl font-bold">{{ evaluasi.benar }}</p>
        </div>
        <div>
          <p class="font-semibold text-red-500">Salah</p>
          <p class="text-xl font-bold">{{ evaluasi.salah }}</p>
        </div>
        <div>
          <p class="font-semibold text-gray-500">Total Soal</p>
          <p class="text-xl font-bold">{{ evaluasi.total }}</p>
        </div>
      </div>

      <div class="mt-6">
        <NuxtLink
          to="/latihan"
          class="inline-block px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition duration-300"
        >
          Ulangi Latihan
        </NuxtLink>
      </div>
    </div>
  </Section>

  <Footer />
</template>
