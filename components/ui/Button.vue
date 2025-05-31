<!-- Button.vue -->
<script setup>
defineProps({
  colorClass: {
    type: String,
    default: 'bg-black text-white'
  }
})
defineOptions({ inheritAttrs: false })
</script>

<template>
  <button
    :class="[colorClass, 'px-5 py-2.5 rounded-md cursor-pointer', $attrs.class]"
    v-bind="$attrs"
  >
    <slot />
  </button>
</template>
