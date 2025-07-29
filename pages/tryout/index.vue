<script setup>
</script>

<template>
  <Navbar />

  <Section height="min-h-[70vh] pb-16">
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
      
      <!-- Latihan Soal -->
      <div class="bg-white shadow-md rounded-xl p-6 flex flex-col justify-between">
        <div>
          <img src="/icons/icon1.webp" alt="Latihan Soal Icon" />
          <h2 class="text-xl font-semibold text-gray-800 mb-4">Latihan Soal</h2>
        </div>
        <NuxtLink to="/tryout/latihansoal">
          <Button class="mt-auto w-full sm:w-auto bg-[#2966F2] text-white hover:bg-[#1f4fd1]" :colorClass="'bg-[#2966F2] text-white hover:bg-[#1f4fd1]'">Latihan Sekarang</Button>
        </NuxtLink>
      </div>

      <!-- Try Out UN -->
      <div class="bg-white shadow-md rounded-xl p-6 flex flex-col justify-between">
        <div>
          <img src="/icons/icon2.webp" alt="Try Out UN Icon" />
          <h2 class="text-xl font-semibold text-gray-800 mb-4">Try Out UN</h2>
        </div>
        <NuxtLink to="#">
          <Button class="mt-auto w-full sm:w-auto bg-[#2966F2] text-white hover:bg-[#1f4fd1]" :colorClass="'bg-[#2966F2] text-white hover:bg-[#1f4fd1]'">Latihan Sekarang</Button>
        </NuxtLink>
      </div>

      <!-- Try Out UTBK -->
      <div class="bg-white shadow-md rounded-xl p-6 flex flex-col justify-between">
        <div>
          <img src="/icons/icon3.webp" alt="Try Out UTBK Icon" />
          <h2 class="text-xl font-semibold text-gray-800 mb-2">Try Out UTBK</h2>
          <p class="text-gray-500">Coming Soon</p>
        </div>
        <NuxtLink to="/tryout/snbt">
          <Button class="mt-auto w-full sm:w-auto bg-[#2966F2] text-white hover:bg-[#1f4fd1]" :colorClass="'bg-[#2966F2] text-white hover:bg-[#1f4fd1]'">Latihan Sekarang</Button>
        </NuxtLink>
      </div>

    </div>
  </Section>

  <Footer />
</template>
