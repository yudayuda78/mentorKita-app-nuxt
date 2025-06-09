<script setup>
        const route = useRoute()
const latihanStore = useLatihanStore()
const slug = route.params.slug

const materi = ref(null)

onMounted(async () => {
  await latihanStore.latihanFetch()
  const data = latihanStore.latihanData.flatMap(kelas =>
    kelas.courses.flatMap(course => course.materi)
  )
  materi.value = data.find(item => item.slug === Number(slug) || item.slug === slug)
})
</script>

    
<template>
    <Section>
        <Timer/>
    </Section>
     <Section height="h-auto">
      <div v-if="materi">
        <h2 class="text-xl font-bold mb-4">Materi: {{ materi.name }}</h2>
        <div v-if="materi.soal && materi.soal.length">
          <h3 class="text-lg font-semibold mb-2">Daftar Soal:</h3>
          <ol class="list-decimal ml-5 space-y-4">
            <li v-for="(soal, index) in materi.soal" :key="soal.id">
              <p class="font-medium">{{ index + 1 }}. {{ soal.question }}</p>
              <div v-if="soal.type === 'PILIHAN_GANDA'" class="ml-4">
                <p>A. {{ soal.optionA }}</p>
                <p>B. {{ soal.optionB }}</p>
                <p>C. {{ soal.optionC }}</p>
                <p>D. {{ soal.optionD }}</p>
                <p v-if="soal.optionE">E. {{ soal.optionE }}</p>
              </div>
              <div v-else class="italic text-gray-500 ml-4">
                Soal esai
              </div>
            </li>
          </ol>
        </div>
        <div v-else>
          <p>Tidak ada soal untuk materi ini.</p>
        </div>
      </div>
      <div v-else>
        <p>Loading atau materi tidak ditemukan...</p>
      </div>
    </Section>
    
    <NavSoal/>
</template>