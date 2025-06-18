<script setup>
  definePageMeta({
  middleware: 'auth'
})
</script>
    
<template>
    <Navbar/>
   <main class="flex-grow">
    <Snbt/>
  </main>
    <Footer/>
</template>