<script setup>
  definePageMeta({
  middleware: 'auth'
})
</script>
    
<template>
    <Navbar/>
   <main class="flex-grow">
    <Latihan/>
  </main>
    <Footer/>
</template>