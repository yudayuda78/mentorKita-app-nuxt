<script setup>


const latihanStore = useLatihanStore()
const latihanData = computed(() => latihanStore.latihanData)

onMounted( async () => {
  await latihanStore.latihanFetch()
})
</script>

<template>
  <div class="min-h-screen flex flex-col">
    <Navbar />
    
    <main class="flex-grow">
      <Section height="min-h-[90vh] pb-16">
        <div v-if="latihanData && latihanData.length">
          <h2 class="text-xl font-bold mb-4">Latihan Soal</h2>
          <ul>
            <li v-for="kelas in latihanData" :key="kelas.id" class="mb-4">
              <details>
                <summary class="cursor-pointer font-semibold">{{ kelas.name }}</summary>
                <ul class="ml-4 mt-2">
                  <li v-for="course in kelas.courses" :key="course.id" class="mb-2">
                    <details>
                      <summary class="cursor-pointer">{{ course.name }}</summary>
                      <ul class="ml-4 mt-1 list-disc">
                        <li v-for="materi in course.materi" :key="materi.id">
                        <NuxtLink :to="`/tryout/latihansoal/${materi.slug}`">
                          {{ materi.name }}
                          </NuxtLink>
                        </li>
                      </ul>
                    </details>
                  </li>
                </ul>
              </details>
            </li>
          </ul>
        </div>
        <div v-else>
          <p>Loading data...</p>
        </div>
      </Section>
    </main>

    <Footer />
  </div>
</template>
