<script setup>

const route = useRoute()
const latihanStore = useLatihanStore()
const slug = route.params.slug

const materi = ref(null)
const isSoalStart = ref(false)
const currentIndex = ref(0)
const jawabanUser = ref([])
const terkunci = ref([])

const soalStart = () => {
  isSoalStart.value = true
}

const currentSoal = computed(() => {
  return materi.value?.soal?.[currentIndex.value] ?? null
})

const pilihJawaban = (huruf) => {
  if (terkunci.value[currentIndex.value]) return // jika sudah dikunci, tidak bisa pilih
  jawabanUser.value[currentIndex.value] = huruf
}

const isSelected = (huruf) => {
  return jawabanUser.value[currentIndex.value] === huruf
}

const lockJawaban = () => {
  terkunci.value[currentIndex.value] = true
}

const nextSoal = () => {
  if (currentIndex.value < materi.value.soal.length - 1) {
    currentIndex.value++
  }
}

const prevSoal = () => {
  if (currentIndex.value > 0) {
    currentIndex.value--
  }
}

onMounted(async () => {
  await latihanStore.latihanFetch()
  const data = latihanStore.latihanData.flatMap((kelas) =>
    kelas.courses.flatMap((course) => course.materi)
  )
  materi.value = data.find(
    (item) => item.slug === Number(slug) || item.slug === slug
  )
  if (materi.value && materi.value.soal) {
    jawabanUser.value = new Array(materi.value.soal.length).fill(null)
    terkunci.value = new Array(materi.value.soal.length).fill(false)
  }
})
</script>

<template>
  <Section>
    <Timer />
  </Section>

  <Section height="h-auto">
    <div v-if="!isSoalStart">
      <Button @click="soalStart">Mulai Kerjakan</Button>
    </div>

    <div v-else class="flex w-full gap-6">
      <div class="soal w-[80%]">
        <div v-if="currentSoal">
          <p class="font-bold mb-2">Soal {{ currentIndex + 1 }}:</p>
          <p class="mb-4">{{ currentSoal.question }}</p>
          <div class="space-y-2 ml-4">
            <div
              v-if="currentSoal.optionA"
              :class="['cursor-pointer', 'p-2 rounded', isSelected('A') ? 'bg-blue-200' : '', terkunci[currentIndex] ? 'pointer-events-none opacity-60' : '']"
              @click="pilihJawaban('A')"
            >
              A. {{ currentSoal.optionA }}
            </div>
            <div
              v-if="currentSoal.optionB"
              :class="['cursor-pointer', 'p-2 rounded', isSelected('B') ? 'bg-blue-200' : '', terkunci[currentIndex] ? 'pointer-events-none opacity-60' : '']"
              @click="pilihJawaban('B')"
            >
              B. {{ currentSoal.optionB }}
            </div>
            <div
              v-if="currentSoal.optionC"
              :class="['cursor-pointer', 'p-2 rounded', isSelected('C') ? 'bg-blue-200' : '', terkunci[currentIndex] ? 'pointer-events-none opacity-60' : '']"
              @click="pilihJawaban('C')"
            >
              C. {{ currentSoal.optionC }}
            </div>
            <div
              v-if="currentSoal.optionD"
              :class="['cursor-pointer', 'p-2 rounded', isSelected('D') ? 'bg-blue-200' : '', terkunci[currentIndex] ? 'pointer-events-none opacity-60' : '']"
              @click="pilihJawaban('D')"
            >
              D. {{ currentSoal.optionD }}
            </div>
            <div
              v-if="currentSoal.optionE"
              :class="['cursor-pointer', 'p-2 rounded', isSelected('E') ? 'bg-blue-200' : '', terkunci[currentIndex] ? 'pointer-events-none opacity-60' : '']"
              @click="pilihJawaban('E')"
            >
              E. {{ currentSoal.optionE }}
            </div>
          </div>

          <div class="mt-6 flex gap-3">
            <button @click="lockJawaban" class="bg-green-500 text-white px-4 py-2 rounded">Kunci Jawaban</button>
            <button @click="prevSoal" :disabled="currentIndex === 0" class="bg-gray-400 text-white px-4 py-2 rounded">Previous</button>
            <button @click="nextSoal" :disabled="currentIndex === materi.soal.length - 1" class="bg-gray-800 text-white px-4 py-2 rounded">Next</button>
          </div>
        </div>
        <div v-else>
          <p>Tidak ada soal untuk materi ini.</p>
        </div>
      </div>
      <div class="navsoal w-[20%]">
        <NavSoal />
      </div>
    </div>
  </Section>
</template>
