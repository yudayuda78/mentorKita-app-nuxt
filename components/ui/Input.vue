<script setup>
defineProps({
  type: {
    type: String,
    default: 'text'
  },
  name: {
    type: String,
    default: ''
  },
  placeholder: {
    type: String,
    default: ''
  }
})

const modelValue = defineModel()

defineOptions({ inheritAttrs: false })
</script>

<template>
  <div class="mb-4">
 

    <input
      :type="type"
      :id="name"
      :name="name"
      :placeholder="placeholder"
      v-model="modelValue"
      v-bind="$attrs"
      class="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
    />
  </div>
</template>
