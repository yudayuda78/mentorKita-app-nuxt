<script setup>
defineProps({
  height: {
    type: String,
    default: 'h-[70vh]'
  },
  color: {
    type: String,
    default: ''
  }
})
defineOptions({ inheritAttrs: false })
</script>

<template>
  <section :class="[' px-28 py-4', height, color]" v-bind="$attrs">
    <div class=" flex h-[100%]">
      <slot />
    </div>
  </section>
</template>
