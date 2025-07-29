<script setup>
defineProps({
  height: {
    type: String,
    default: ''
  },
  color: {
    type: String,
    default: ''
  }
})
defineOptions({ inheritAttrs: false })
</script>

<template>
  <section :class="['px-4 sm:px-8 md:px-16 lg:px-28 py-4', height, color]" v-bind="$attrs">
    <div class="flex flex-col w-full max-w-screen-xl mx-auto gap-8">
      <slot />
    </div>
  </section>
</template>
