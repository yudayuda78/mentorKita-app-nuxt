<script setup>
const statistikSection = ref(null)
const animated = ref(false) // agar animasi hanya terjadi sekali

const userCount = ref(null)
const soalCount = ref(null)
const latihanCount = ref(null)
const tryoutCount = ref(null)
const tkaCount = ref(null)
const tpsCount = ref(null)





const showHero = ref(false);

onMounted(() => {
  setTimeout(() => {
    showHero.value = true;
  }, 100)


  const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting && !animated.value) {
      animated.value = true
      useCountUp(userCount.value, 1000)
      useCountUp(soalCount.value, 5000)
      useCountUp(latihanCount.value, 10000)
      useCountUp(tryoutCount.value, 2000)
      useCountUp(tkaCount.value, 1000)
      useCountUp(tpsCount.value, 1500)
    }
  }, {
    threshold: 0.4, // hanya trigger saat 40% area terlihat
  })

  if (statistikSection.value) {
    observer.observe(statistikSection.value)
  }
});

function useCountUp(target, end, duration = 800, step = 10) {
  let start = 0
  const totalSteps = Math.ceil(end / step)
  const stepTime = Math.floor(duration / totalSteps)

  const timer = setInterval(() => {
    start += step
    if (start >= end) {
      start = end
      clearInterval(timer)
    }
    target.innerText = start + '+'
  }, stepTime)
}


</script>

<template>
  <!-- Section 1 -->
  <Section :height="'min-h-[90vh]'">
    <div
      class="flex flex-col md:flex-row items-center justify-between w-full gap-10 transition-all duration-1000 ease-out"
      :class="
        showHero ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      "
    >
      <!-- Text -->
      <div
        class="w-full md:w-full flex flex-col justify-center gap-6 text-center md:text-left px-4"
      >
        <img
          src="/study.webp"
          alt="Belajar"
          class="w-full max-w-[300px] md:max-w-[30%] h-auto mx-auto"
        />
        <p
          class="text-3xl md:text-6xl font-bold text-[#2966F2] leading-tight text-center"
        >
          Platform Belajar, Latihan, dan Tryout
        </p>
        <p class="text-1xl leading-tight text-center">
          Belajar jadi lebih seru dan efektif bersama MentorKita. Ribuan soal
          latihan & Tryout menanti kamu untuk upgrade cara belajarmu!
        </p>
        <div class="flex flex-row items-center gap-4 mx-auto">
          <NuxtLink to="/tryout">
            <Button
              :colorClass="'bg-[#2966F2] text-[#ffffff] font-bold'"
              class="px-6 py-3 w-full max-w-[160px]"
            >
              Tryout Gratis
            </Button>
          </NuxtLink>
          <NuxtLink to="/kelas">
            <Button
              :colorClass="'bg-[#2966F2] text-[#ffffff] font-bold'"
              class="px-6 py-3 w-full max-w-[160px]"
            >
              Mulai Belajar
            </Button>
          </NuxtLink>
        </div>
      </div>

      <!-- Image hanya di md ke atas -->
      <!-- <div class="hidden md:flex w-full md:w-[40%] items-center justify-center px-4">
        <img src="/study.webp" alt="Belajar" class="max-w-full h-auto" />
      </div> -->
    </div>
  </Section>

  <!-- Section 2 -->
  <Section :height="'min-h-[15vh]'" :color="'bg-[#2966F2]'">
    <div class="overflow-hidden w-full">
    <div
  ref="slider"
  class="flex gap-4 text-white text-base sm:text-lg whitespace-nowrap animate-slide px-4 py-2"
>
  <div class="flex-shrink-0 bg-white/10 backdrop-blur rounded-full px-4 py-2 flex items-center gap-2">
    🧠 <span>Penalaran Umum</span>
  </div>
  <div class="flex-shrink-0 bg-white/10 backdrop-blur rounded-full px-4 py-2 flex items-center gap-2">
    📘 <span>Pengetahuan & Pemahaman Umum</span>
  </div>
  <div class="flex-shrink-0 bg-white/10 backdrop-blur rounded-full px-4 py-2 flex items-center gap-2">
    ✍️ <span>Pemahaman Bacaan & Menulis</span>
  </div>
  <div class="flex-shrink-0 bg-white/10 backdrop-blur rounded-full px-4 py-2 flex items-center gap-2">
    🔢 <span>Pengetahuan Kuantitatif</span>
  </div>
  <div class="flex-shrink-0 bg-white/10 backdrop-blur rounded-full px-4 py-2 flex items-center gap-2">
    🇮🇩 <span>Literasi Bahasa Indonesia</span>
  </div>
  <div class="flex-shrink-0 bg-white/10 backdrop-blur rounded-full px-4 py-2 flex items-center gap-2">
    🇬🇧 <span>Literasi Bahasa Inggris</span>
  </div>
  <div class="flex-shrink-0 bg-white/10 backdrop-blur rounded-full px-4 py-2 flex items-center gap-2">
    ➗ <span>Penalaran Matematika</span>
  </div>
</div>

    </div>
  </Section>

  <!-- Section 3 -->
  <Section :height="'min-h-[60vh]'">
    <div class="flex flex-col items-center justify-center w-full gap-10 px-4">
      <h1
        class="text-4xl font-extrabold text-[#2966F2] uppercase tracking-wide text-center mb-6"
      >
        Statistik MentorKita
      </h1>

      <div
        ref="statistikSection"
        class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 text-center w-full max-w-5xl"
      >
        <!-- Item 1 -->
        <div class="bg-white rounded-xl shadow-md p-6">
          <p class="text-lg font-medium text-gray-600">Pengguna</p>
          <span ref="userCount" class="text-4xl font-bold text-[#2966F2]">1000+</span>
        </div>

        <!-- Item 2 -->
        <div class="bg-white rounded-xl shadow-md p-6">
          <p class="text-lg font-medium text-gray-600">Database Soal</p>
          <span ref="soalCount" class="text-4xl font-bold text-[#2966F2]">5000+</span>
        </div>

        <!-- Item 3 -->
        <div class="bg-white rounded-xl shadow-md p-6">
          <p class="text-lg font-medium text-gray-600">Soal Latihan</p>
          <span ref="latihanCount" class="text-4xl font-bold text-[#2966F2]">10000+</span>
        </div>

        <!-- Item 4 -->
        <div class="bg-white rounded-xl shadow-md p-6">
          <p class="text-lg font-medium text-gray-600">Soal Tryout</p>
          <span ref="tryoutCount" class="text-4xl font-bold text-[#2966F2]">2000+</span>
        </div>

        <!-- Item 5 -->
        <div class="bg-white rounded-xl shadow-md p-6">
          <p class="text-lg font-medium text-gray-600">Soal TKA</p>
          <span ref="tkaCount" class="text-4xl font-bold text-[#2966F2]">1000+</span>
        </div>

        <!-- Item 6 -->
        <div class="bg-white rounded-xl shadow-md p-6">
          <p class="text-lg font-medium text-gray-600">Soal TPS</p>
          <span ref="tpsCount" class="text-4xl font-bold text-[#2966F2]">1500+</span>
        </div>
      </div>
    </div>
  </Section>


    <Section :height="'min-h-[50vh]'">
    <div class="flex flex-col items-center justify-center w-full gap-10 px-4">
      <h1
        class="text-4xl font-extrabold text-[#2966F2] uppercase tracking-wide text-center mb-6"
      >
        Kenapa Harus MentorKita?
      </h1>

      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-5xl">
        <!-- Item 1 -->
        <div class="bg-white rounded-xl shadow-md p-6">
          <h2 class="text-xl font-semibold text-[#2966F2] mb-2">Soal Terverifikasi</h2>
          <p class="text-gray-600">Semua soal telah diverifikasi oleh tim ahli kami.</p>
        </div>

        <!-- Item 2 -->
        <div class="bg-white rounded-xl shadow-md p-6">
          <h2 class="text-xl font-semibold text-[#2966F2] mb-2">Latihan Mandiri</h2>
          <p class="text-gray-600">Latihan kapan saja, di mana saja, sesuai keinginanmu.</p>
        </div>

        <!-- Item 3 -->
        <div class="bg-white rounded-xl shadow-md p-6">
          <h2 class="text-xl font-semibold text-[#2966F2] mb-2">Tryout Gratis</h2>
          <p class="text-gray-600">Ikuti tryout gratis untuk mengukur kemampuanmu.</p>
        </div>
      </div>
    </div>
  </Section>
</template>
