<script setup>
defineProps({
  height: {
    type: String,
    default: 'h-[70vh]'
  }
})
defineOptions({ inheritAttrs: false })
</script>

<template>
  <section :class="[' px-18 py-4', height]" v-bind="$attrs">
    <div class=" flex h-[100%]">
      <slot />
    </div>
  </section>
</template>
