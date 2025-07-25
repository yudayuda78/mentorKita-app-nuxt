<script setup>
</script>

<template>
  <!-- Section 1 -->
  <Section :height="'min-h-[90vh]'">
    <div class="flex flex-col md:flex-row items-center justify-between w-full gap-10 px-4">
      <!-- Text -->
      <div class="w-full md:w-[60%] flex flex-col justify-center gap-6 text-center md:text-left">
        <p class="text-3xl sm:text-4xl md:text-6xl font-bold text-[#2966F2] leading-tight">
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

      <!-- Gambar hanya tampil di layar md ke atas -->
      <div class="hidden md:flex w-full md:w-[40%] items-center justify-center">
        <img src="/study.webp" alt="Belajar" class="max-w-full h-auto" />
      </div>
    </div>
  </Section>

  <!-- Section 2 -->
  <Section :height="'min-h-[70vh]'" :color="'bg-[#2966F2]'">
    <div class="flex flex-col items-center justify-center text-center gap-6 px-4">
      <p class="text-white text-2xl sm:text-3xl md:text-5xl font-bold leading-snug">
        Puluhan soal, simulasi dan try out untuk latihan
      </p>
      <div class="flex flex-col md:flex-row gap-4">
        <Button :colorClass="'bg-[#FFFA6D] text-[#2966F2] font-bold'">Coba Latihan Soal</Button>
        <Button :colorClass="'bg-[#FFFA6D] text-[#2966F2] font-bold'">Coba Try Out</Button>
      </div>
    </div>
  </Section>

  <!-- Section 3 -->
  <Section :height="'min-h-[70vh]'">
    <div class="flex flex-col-reverse md:flex-row items-center justify-between w-full gap-10 px-4">
      <!-- Text -->
      <div class="w-full md:w-[60%] flex flex-col justify-center gap-6 text-center md:text-left">
        <p class="text-3xl sm:text-4xl md:text-6xl font-bold text-[#2966F2] leading-tight">
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

      <!-- Gambar hanya tampil di layar md ke atas -->
      <div class="hidden md:flex w-full md:w-[40%] items-center justify-center">
        <img src="/study.webp" alt="Belajar" class="max-w-full h-auto" />
      </div>
    </div>
  </Section>
</template>
