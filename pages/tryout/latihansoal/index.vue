<script setup>


const latihanStore = useLatihanStore()
const latihanData = computed(() => latihanStore.latihanData)

onMounted( async () => {
  await latihanStore.latihanFetch()
})
</script>

<template>
    <Navbar/>
    <Section>
         <h2 class="text-lg font-bold mb-4">Daftar Kelas</h2>
    <ul>
      <li v-for="kelas in latihanData" :key="kelas.id">
        {{ kelas.name }}
      </li>
    </ul>
    </Section>
    <Footer/>
</template>