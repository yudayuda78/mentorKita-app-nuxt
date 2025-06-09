<script setup>


const remainingTime = ref(600) // dalam detik (10 menit)
let timer = null

const formatTime = (seconds) => {
  const m = String(Math.floor(seconds / 60)).padStart(2, '0')
  const s = String(seconds % 60).padStart(2, '0')
  return `${m}:${s}`
}

onMounted(() => {
  timer = setInterval(() => {
    if (remainingTime.value > 0) {
      remainingTime.value--
    } else {
      clearInterval(timer)
      // Bisa tambahkan aksi: auto-submit, alert, dsb.
    }
  }, 1000)
})

onBeforeUnmount(() => {
  clearInterval(timer)
})
</script>


<template>
  <div class="text-2xl font-bold text-center">
    Waktu tersisa: {{ formatTime(remainingTime) }}
  </div>
</template>
