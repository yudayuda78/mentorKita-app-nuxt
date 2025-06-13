<script setup>
const remainingTime = ref(7200) // misalnya 3 jam 20 menit (3 * 3600 + 20 * 60)
let timer = null

const formatTime = (seconds) => {
  const h = String(Math.floor(seconds / 3600)).padStart(2, '0')
  const m = String(Math.floor((seconds % 3600) / 60)).padStart(2, '0')
  const s = String(seconds % 60).padStart(2, '0')
  return `${h}:${m}:${s}`
}

const startTimer = () => {
  if (timer) return
  timer = setInterval(() => {
    if (remainingTime.value > 0) {
      remainingTime.value--
    } else {
      clearInterval(timer)
      timer = null
      // Tambahkan aksi jika waktu habis, misalnya auto-submit
    }
  }, 1000)
}

const stopTimer = () => {
  clearInterval(timer)
  timer = null
}

defineExpose({ startTimer, stopTimer })

onBeforeUnmount(() => {
  clearInterval(timer)
})
</script>

<template>
  <div class="text-2xl font-bold text-center">
    Waktu tersisa: {{ formatTime(remainingTime) }}
  </div>
</template>
