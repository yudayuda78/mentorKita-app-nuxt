<script setup>
definePageMeta({
  ssr: true
})
const showStickyNavbar = ref(false)

const handleScroll = () => {
  showStickyNavbar.value = window.scrollY > 100
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <Navbar />
  
  <StickyNavbar v-if="showStickyNavbar" />
  <LandingPageContent />
  <Footer />
</template>


