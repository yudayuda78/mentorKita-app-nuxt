<script setup>
defineProps({
  jumlahSoal: {
    type: Number,
    required: true
  },
  statusList: {
    type: Array,
    default: () => []
  },
  goToSoal: {
    type: Function,
    required: true
  }
})
</script>

<template>
  <section>
    <div class="w-60 grid grid-cols-5 sm:grid-cols-5 md:grid-cols-5 gap-1">
      <BoxSoal
        v-for="i in jumlahSoal"
        :key="i"
        :nomor="i"
        :status="statusList[i - 1]"
        @click="goToSoal(i - 1)"
      />
    </div>

    <div class="w-60 mt-2">
      <Button class="w-full">Submit</Button>
    </div>
  </section>
</template>
