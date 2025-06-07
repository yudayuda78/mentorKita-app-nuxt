<script setup>
</script>

<template>
  <Navbar />

  <Section height="h-[70vh]">
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
      <!-- Latihan Soal -->
      <div class="bg-white shadow-md rounded-xl p-6 flex flex-col justify-between">
        <div>
          <h2 class="text-xl font-semibold text-gray-800 mb-4">Latihan Soal</h2>
        </div>
        <NuxtLink to="/tryout/latihansoal">
        <Button class="mt-auto w-full sm:w-auto">Latihan Sekarang</Button>
        </NuxtLink>
      </div>

      <!-- Try Out UN -->
      <div class="bg-white shadow-md rounded-xl p-6 flex flex-col justify-between">
        <div>
          <h2 class="text-xl font-semibold text-gray-800 mb-4">Try Out UN</h2>
        </div>
        <Button class="mt-auto w-full sm:w-auto">Latihan Sekarang</Button>
      </div>

      <!-- Try Out UTBK -->
      <div class="bg-white shadow-md rounded-xl p-6 flex flex-col justify-between">
        <div>
          <h2 class="text-xl font-semibold text-gray-800 mb-4">Try Out UTBK</h2>
          <p class="text-gray-500">Coming Soon</p>
        </div>
      </div>
    </div>
  </Section>

  <Footer />
</template>
