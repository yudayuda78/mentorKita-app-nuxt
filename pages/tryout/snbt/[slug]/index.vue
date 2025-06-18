<script setup>
import { NuxtLink } from '#components'

const route = useRoute()
const store = useSnbtStore()

onMounted(() => {
  store.snbtSlug(route.params.slug)
  
})
</script>

<template>
  <Navbar />
  <Section>
    <div class="wrapper py-10 max-w-3xl mx-auto">
      <div v-if="store.loading" class="text-center text-gray-500">Loading...</div>
      
      <div v-else-if="store.error" class="text-center text-red-500">
        Terjadi error: {{ store.error.message }}
      </div>

      <div v-else-if="store.snbtDetail">
        <h1 class="text-2xl font-bold mb-6 text-center">
          {{ store.snbtDetail.name }}
        </h1>
        
        <ul class="space-y-4">
          <li
            v-for="materi in store.snbtDetail.tryoutMateri"
            :key="materi.id"
            class="p-4 border rounded-lg flex items-center justify-between"
          >
            <div>
              <p class="font-semibold text-lg">{{ materi.name }}</p>
              <p class="text-sm text-gray-500">
                {{ Math.floor(materi.time / 60) }} menit
              </p>
            </div>
            <div class="ml-4">
            <NuxtLink :to="`/tryout/snbt/${route.params.slug}/${materi.id}`">
              <Button>Kerjakan</Button>
            </NuxtLink>
            </div>
          </li>
        </ul>
      </div>

      <div v-else class="text-center text-gray-500">
        Data tidak ditemukan
      </div>
    </div>
  </Section>
  <Footer />
</template>
