<script setup>
</script>

<template>
  <Section :height="'h-[90vh]'">
    <div class="w-[60%] flex flex-col justify-center gap-6">
      <p class="text-6xl font-bold text-[#2966F2]">
        Belajar, Latihan dan Dibimbing
      </p>
      <div class="flex gap-4">
        <Button :colorClass="'bg-[#FFFA6D] text-[#2966F2] font-bold'">
          Ikuti Try Out Gratis
        </Button>
        <Button :colorClass="'bg-[#FFFA6D] text-[#2966F2] font-bold'">
          Mulai Belajar
        </Button>
      </div>
    </div>

    <div class="w-[40%] flex items-center justify-center">
      <img src="/study.webp" alt="Belajar" class="max-w-full h-auto" />
    </div>
  </Section>
  <Section :height="'h-[70vh]'" :color="'bg-[#2966F2]'">
    <div>
        <p class="text-white text-5xl font-bold">Puluhan soal, simulasi dan try out untuk latihan</p>
        <div>
        <Button :colorClass="'bg-[#FFFA6D] text-[#2966F2] font-bold'">Coba Latihan Soal</Button>
        <Button :colorClass="'bg-[#FFFA6D] text-[#2966F2] font-bold'">Coba Try Out</Button>
        </div>
    </div>
  </Section>
  <Section :height="'h-[70vh]'">
     <div class="w-[40%] flex items-center justify-center">
      <img src="/study.webp" alt="Belajar" class="max-w-full h-auto" />
    </div>

    <div class="w-[60%] flex flex-col justify-center gap-6">
      <p class="text-6xl font-bold text-[#2966F2]">
        Belajar, Latihan dan Dibimbing
      </p>
      <div class="flex gap-4">
        <Button :colorClass="'bg-[#FFFA6D] text-[#2966F2] font-bold'">
          Ikuti Try Out Gratis
        </Button>
        <Button :colorClass="'bg-[#FFFA6D] text-[#2966F2] font-bold'">
          Mulai Belajar
        </Button>
      </div>
    </div>

   
  </Section>
</template>
