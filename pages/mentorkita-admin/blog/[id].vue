<script setup>
definePageMeta({
  layout: 'admin',
  middleware: 'admin',
})

const route = useRoute()
</script>

<template>
  <BlogEditor :article-id="route.params.id" />
</template>
