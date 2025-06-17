<script setup>
const snbtStore = useSnbtStore()
const snbtData = computed(() => snbtStore.snbtData)

onMounted(async () => {
  await snbtStore.snbtFetch()
})
</script>

<template>
  <div class="min-h-screen flex flex-col">
    <Navbar />
    
    <main class="flex-grow">
      <Section>
        <div class="wrapper">
          <!-- Responsive Grid Start -->
          <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            <div
              v-for="(item, index) in snbtData"
              :key="index"
              class="bg-white shadow-md rounded-2xl p-6 flex  flex-col justify-between hover:shadow-xl transition-shadow duration-300"
            >
              <h3 class="text-lg font-semibold mb-2">{{ item.name || 'Try out ' + (index + 1) }}</h3>
              
              <p class="text-gray-600 mb-4" v-if="item.isfree===true">Free</p>
              <p class="text-gray-600 mb-4" v-if="item.isfree===false">Rp 15.000</p>

              <NuxtLink :to="`/tryout/snbt/${item.slug}`">
              <Button>Daftar Tryout</Button>
              </NuxtLink>
            </div>
          </div>
          <!-- Responsive Grid End -->
        </div>
      </Section>
    </main>

    <Footer />
  </div>
</template>
