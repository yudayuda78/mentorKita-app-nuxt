<script setup>
const jumlahSoal = 40
</script>

<template>
  <section class="px-4 py-6">
    <h2 class="text-xl font-semibold mb-4 text-center">Navigasi Soal</h2>

    <div class="w-60 grid grid-cols-5 sm:grid-cols-5 md:grid-cols-5 gap-1">
      <BoxSoal
        v-for="i in jumlahSoal"
        :key="i"
        :nomor="i"
      />
    </div>

    <Button>Submit</Button>
  </section>
</template>
