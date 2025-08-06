<script setup>
definePageMeta({
  ssr: true,
}) 

const route = useRoute()
const slug = route.params.slug

</script>


<template>
    <Navbar />
    <Section height="min-h-[90vh] pb-16">
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
  
        
        </div>
    </Section>
    <Footer />
</template>
