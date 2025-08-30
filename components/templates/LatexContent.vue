<template>
  <div ref="container" v-html="sanitizedContent"></div>
</template>

<script setup>
import { onMounted, ref, watch, computed } from "vue"
import renderMathInElement from "katex/contrib/auto-render"
import "katex/dist/katex.min.css"

const props = defineProps({
  content: {
    type: String,
    required: true
  }
})

const container = ref(null)

// 🔥 Normalize: ganti `\\` jadi `\`
const sanitizedContent = computed(() => {
  return props.content.replace(/\\\\/g, "\\")
})

const renderLatex = () => {
  if (container.value) {
    renderMathInElement(container.value, {
      delimiters: [
        { left: "$$", right: "$$", display: true },
        { left: "$", right: "$", display: false },
        { left: "\\(", right: "\\)", display: false },
        { left: "\\[", right: "\\]", display: true }
      ]
    })
  }
}

onMounted(renderLatex)
watch(sanitizedContent, renderLatex)
</script>
