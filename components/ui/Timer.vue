<script setup>
const props = defineProps({
  materiId: {
    type: [Number, String],
    required: true
  },
  duration: {
    type: Number,
    default: 60 * 30
  }
});

const emit = defineEmits(['autoSubmit']);
const remainingTime = ref(props.duration);
let timer = null;

const deadlineKey = `latihanTimerDeadline-${props.materiId}`;

const formatTime = (seconds) => {
  const h = String(Math.floor(seconds / 3600)).padStart(2, '0');
  const m = String(Math.floor((seconds % 3600) / 60)).padStart(2, '0');
  const s = String(seconds % 60).padStart(2, '0');
  return `${h}:${m}:${s}`;
};

const runTimer = () => {
  timer = setInterval(() => {
    if (remainingTime.value > 0) {
      remainingTime.value--;
    } else {
      clearInterval(timer);
      timer = null;
      localStorage.removeItem(deadlineKey);
      emit('autoSubmit');
    }
  }, 1000);
};

const startTimer = () => {
  if (timer) return;

  const existingDeadline = localStorage.getItem(deadlineKey);
  if (existingDeadline) return;

  const now = Date.now();
  const deadline = now + remainingTime.value * 1000;
  localStorage.setItem(deadlineKey, deadline.toString());
  runTimer();
};

const stopTimer = () => {
  clearInterval(timer);
  timer = null;
  localStorage.removeItem(deadlineKey);
};

const resetTimer = () => {
  stopTimer(); // hentikan dulu timer aktif
  remainingTime.value = props.duration; // set ke durasi default
  localStorage.removeItem(deadlineKey); // hapus deadline sebelumnya
};

onMounted(() => {
  const deadlineStr = localStorage.getItem(deadlineKey);
  if (deadlineStr) {
    const deadline = parseInt(deadlineStr, 10);
    const now = Date.now();
    const diff = Math.floor((deadline - now) / 1000);
    remainingTime.value = diff > 0 ? diff : 0;

    if (remainingTime.value > 0) {
      runTimer();
    } else {
      emit('autoSubmit');
    }
  }
});

onBeforeUnmount(() => {
  clearInterval(timer);
});

defineExpose({ startTimer, stopTimer, resetTimer });
</script>

<template>
  <div class="text-2xl font-bold text-center">
    Waktu tersisa: {{ formatTime(remainingTime) }}
  </div>
</template>
