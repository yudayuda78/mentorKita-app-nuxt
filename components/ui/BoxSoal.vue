<script setup>
defineProps({
  nomor: Number
})
</script>

<template>
  <div
    class="w-10 h-10 flex items-center justify-center bg-blue-100 border border-blue-500 rounded text-sm font-semibold cursor-pointer hover:bg-blue-200 transition"
  >
    {{ nomor }}
  </div>
</template>
