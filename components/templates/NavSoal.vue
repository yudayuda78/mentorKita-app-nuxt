<script setup>
const jumlahSoal = 40
</script>

<template>
  <section >


    <div class="w-60 grid grid-cols-5 sm:grid-cols-5 md:grid-cols-5 gap-1">
      <BoxSoal
        v-for="i in jumlahSoal"
        :key="i"
        :nomor="i"
      />
    </div>

    <div class="w-60 mt-2">
        <Button class="w-[100%]">Submit</Button>
    </div>
    
  </section>
</template>
