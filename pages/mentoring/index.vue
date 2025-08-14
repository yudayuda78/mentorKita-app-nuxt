<script setup>
  const phoneNumber = "6285888442400"
const message = "Halo, saya tertarik untuk bimbingan di MentorKita"
</script>

<template>
  <Navbar />
  <WhatsappButton />
  <Section height="h-[70vh]">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-10">
        <!-- Bimbingan Online -->
        <div class="bg-white shadow-md rounded-2xl p-6 flex flex-col space-y-4">
          <h2 class="text-lg sm:text-xl font-semibold text-gray-800">Bimbel Online SD-SMP-SMA</h2>
          <ul class="text-gray-600 space-y-1">
            <li>📚 Bisa request materi</li>
            <li>⏰ Waktu fleksibel</li>
            <li>💰 Biaya terjangkau</li>
          </ul>
          <NuxtLink
    :to="`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`"
    target="_blank"
    external
  >
    <Button class="mt-auto w-full sm:w-auto">
      Bimbingan Sekarang
    </Button>
  </NuxtLink>
        </div>

        <!-- Bimbingan Offline -->
        <div class="bg-white shadow-md rounded-2xl p-6 flex flex-col space-y-4">
          <h2 class="text-lg sm:text-xl font-semibold text-gray-800">Bimbel Offline SD-SMP-SMA</h2>
          <ul class="text-gray-600 space-y-1">
            <li>📚 Bisa request materi</li>
            <li>⏰ Waktu fleksibel</li>
            <li>💰 Biaya terjangkau</li>
          </ul>
          <NuxtLink
    :to="`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`"
    target="_blank"
    external
  >
    <Button class="mt-auto w-full sm:w-auto">
      Bimbingan Sekarang
    </Button>
  </NuxtLink>
        </div>

        <!-- Bimbingan Skripsi -->
        <div class="bg-white shadow-md rounded-2xl p-6 flex flex-col space-y-4">
          <h2 class="text-lg sm:text-xl font-semibold text-gray-800">Bimbingan Skripsi Mahasiswa</h2>
          <ul class="text-gray-600 space-y-1">
            <li>⏰ Waktu fleksibel</li>
            <li>💰 Biaya terjangkau</li>
            <li>✅ Step-by-step dengan mentor</li>
          </ul>
          <NuxtLink
    :to="`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`"
    target="_blank"
    external
  >
    <Button class="mt-auto w-full sm:w-auto">
      Bimbingan Sekarang
    </Button>
  </NuxtLink>
        </div>
      </div>
    </div>
  </Section>

  <Footer />
</template>
