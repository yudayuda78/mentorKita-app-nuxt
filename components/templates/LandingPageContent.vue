<script setup>
</script>

<template>
  <!-- Section 1 -->
  <Section :height="'min-h-[90vh]'">
    <div class="flex flex-col md:flex-row items-center justify-between w-full gap-10">
      <!-- Text -->
      <div class="w-full md:w-[60%] flex flex-col justify-center gap-6 text-center md:text-left px-4">
        <p class="text-4xl md:text-6xl font-bold text-[#2966F2] leading-tight">
          Belajar, Latihan dan Dibimbing
        </p>
        <div class="flex flex-col md:flex-row gap-4 justify-center md:justify-start">
          <NuxtLink to="/tryout">
            <Button :colorClass="'bg-[#FFFA6D] text-[#2966F2] font-bold'">
              Ikuti Try Out Gratis
            </Button>
          </NuxtLink>
          <NuxtLink to="/kelas">
            <Button :colorClass="'bg-[#FFFA6D] text-[#2966F2] font-bold'">
              Mulai Belajar
            </Button>
          </NuxtLink>
        </div>
      </div>

      <!-- Image hanya di md ke atas -->
      <div class="hidden md:flex w-full md:w-[40%] items-center justify-center px-4">
        <img src="/study.webp" alt="Belajar" class="max-w-full h-auto" />
      </div>
    </div>
  </Section>

  <!-- Section 2 -->
  <Section :height="'min-h-[70vh]'" :color="'bg-[#2966F2]'">
    <div class="flex flex-col items-center justify-center text-center gap-6 px-4">
       <h2 class="text-white text-3xl sm:text-4xl md:text-5xl font-extrabold leading-snug max-w-3xl">
      Puluhan soal, simulasi, dan try out untuk latihan
    </h2>

    <div class="flex flex-wrap justify-center gap-4">
      <NuxtLink to="/tryout/latihansoal">
        <Button :colorClass="'bg-[#FFFA6D] text-[#2966F2] font-semibold hover:brightness-110 transition-all duration-200 px-6 py-3 rounded-xl shadow-md'">
          Coba Latihan Soal
        </Button>
      </NuxtLink>
      <NuxtLink to="/tryout">
        <Button :colorClass="'bg-[#FFFA6D] text-[#2966F2] font-semibold hover:brightness-110 transition-all duration-200 px-6 py-3 rounded-xl shadow-md'">
          Coba Try Out
        </Button>
      </NuxtLink>
    </div>
    </div>
  </Section>

  <!-- Section 3 -->
  <Section :height="'min-h-[70vh]'">
    <div class="flex flex-col-reverse md:flex-row items-center justify-between w-full gap-10">
      <!-- Text -->
      <div class="w-full md:w-[60%] flex flex-col justify-center gap-6 text-center md:text-left px-4">
        <p class="text-4xl md:text-6xl font-bold text-[#2966F2] leading-tight">
          Belajar, Latihan dan Dibimbing
        </p>
        <div class="flex flex-col md:flex-row gap-4 justify-center md:justify-start">
          <Button :colorClass="'bg-[#FFFA6D] text-[#2966F2] font-bold'">
            Ikuti Try Out Gratis
          </Button>
          <Button :colorClass="'bg-[#FFFA6D] text-[#2966F2] font-bold'">
            Mulai Belajar
          </Button>
        </div>
      </div>

      <!-- Image hanya di md ke atas -->
      <div class="hidden md:flex w-full md:w-[40%] items-center justify-center px-4">
        <img src="/study.webp" alt="Belajar" class="max-w-full h-auto" />
      </div>
    </div>
  </Section>
</template>
