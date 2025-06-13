<script setup>
defineProps({
  nomor: Number,
  status: {
    type: String,
    default: 'belum'
  }
})
</script>

<template>
  <div
    class="w-10 h-10 flex items-center justify-center border rounded text-sm font-semibold cursor-pointer transition"
    :class="{
      'bg-white text-gray-800 border-gray-300': status === 'belum',
      'bg-yellow-300 text-black border-yellow-400': status === 'dijawab',
      'bg-blue-500 text-white border-blue-600': status === 'terkunci'
    }"
    @click="$emit('click')" 
  >
    {{ nomor }}
  </div>
</template>
