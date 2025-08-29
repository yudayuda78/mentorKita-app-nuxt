<script setup>
defineEmits(['submitJawaban'])

const route = useRoute()
const latihanStore = useLatihanStore()
const slug = route.params.slug
const auth = useAuthStore()
const userId = computed(() => auth.user?.id || "")

const materi = ref(null)
const timerRef = ref(null)
const isSoalStart = ref(false)
const currentIndex = ref(0)
const jawabanUser = ref([])
const terkunci = ref([])
const ragu = ref([])

const soalStart = () => {
  isSoalStart.value = true
  timerRef.value?.startTimer()
}

const loadSavedJawaban = (materiId, jumlahSoal) => {
  const saved = localStorage.getItem(`latihanJawaban-${materiId}`)
  if (saved) {
    try {
      const parsed = JSON.parse(saved)
      if (Array.isArray(parsed) && parsed.length === jumlahSoal) {
        return parsed
      }
    } catch {}
  }
  return Array(jumlahSoal).fill("")
}

onMounted(async () => {
  await latihanStore.latihanFetch()
  const data = latihanStore.latihanData.flatMap((kelas) =>
    kelas.courses.flatMap((course) => course.materi)
  )
  materi.value = data.find(
    (item) => item.slug === Number(slug) || item.slug === slug
  )

  if (materi.value?.soal) {
    const jumlahSoal = materi.value.soal.length
    jawabanUser.value = loadSavedJawaban(materi.value.id, jumlahSoal)
    terkunci.value = Array(jumlahSoal).fill(false)
    ragu.value = Array(jumlahSoal).fill(false)
  }

  const deadlineKey = `latihanTimerDeadline-${materi.value?.id}`
  const existingDeadline = localStorage.getItem(deadlineKey)
  if (existingDeadline) {
    isSoalStart.value = false
  }
})

watch(jawabanUser, (newVal) => {
  if (materi.value?.id) {
    localStorage.setItem(`latihanJawaban-${materi.value.id}`, JSON.stringify(newVal))
  }
}, { deep: true })

const currentSoal = computed(() => materi.value?.soal?.[currentIndex.value] || {})

const isSelected = (option) => jawabanUser.value[currentIndex.value] === option

const pilihJawaban = (option) => {
  if (!terkunci.value[currentIndex.value]) {
    jawabanUser.value[currentIndex.value] = option
  }
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

const lockJawaban = () => {
  terkunci.value[currentIndex.value] = true
  ragu.value[currentIndex.value] = false
}

const bukaKunci = () => {
  if (terkunci.value[currentIndex.value]) {
    terkunci.value[currentIndex.value] = false
    ragu.value[currentIndex.value] = true
  }
}

const soalStatus = computed(() =>
  jawabanUser.value.map((jawaban, index) => {
    if (terkunci.value[index]) return "terkunci"
    if (jawaban) return "dijawab"
    return "belum"
  })
)

const goToSoal = (index) => {
  currentIndex.value = index
}

const submitJawaban = async () => {
  const payload = materi.value.soal.map((soal, index) => {
    const jawaban = jawabanUser.value[index]
    const benar = jawaban === soal.correctOption
    return {
      soalId: soal.id,
      jawaban,
      benar,
      userId: userId.value,
      materiSoal: soal.materiSoal,
    }
  })

  const materiId = materi.value?.id

  try {
    await $fetch('/api/answer-latihan', {
      method: 'POST',
      body: { jawaban: payload },
    })

    alert('Jawaban telah disubmit')
    localStorage.removeItem(`latihanJawaban-${materiId}`)
  } catch (err) {
    console.error(err)
    alert('Gagal menyimpan jawaban!')
  }

  useScoreLatihan(payload, materiId)
  await timerRef.value?.resetTimer()
  isSoalStart.value = false
  currentIndex.value = 0
}
</script>

<template>
  <!-- Timer -->
  <Section>
    <Timer
      ref="timerRef"
      v-if="materi && materi.id"
      :materiId="materi.id"
      :duration="60 * 30"
      :isStarted="isSoalStart"
      @autoSubmit="submitJawaban"
    />
  </Section>

  <!-- Soal Section -->
  <Section height="h-auto">
    <!-- Tombol mulai -->
    <div v-if="!isSoalStart" class="text-center">
      <Button @click="soalStart">Mulai Kerjakan</Button>
    </div>

    <!-- Tampilan soal aktif -->
    <div v-else class="flex flex-col md:flex-row gap-4 w-full mt-4">
      <!-- Area Soal -->
      <div class="w-full md:w-[75%] space-y-4 overflow-auto">
        <h2 class="text-xl font-bold">Materi: {{ materi.name }}</h2>

        <div v-if="materi.soal && materi.soal.length">
          <p class="font-medium mb-2">
            {{ currentIndex + 1 }}. <img v-if="currentSoal.questionImage" :src="`/questionImage/${currentSoal.questionImage}`"  alt="Belajar" class="w-full max-w-[500px] md:max-w-[50%] h-auto mx-auto my-4 rounded-lg shadow" />{{ currentSoal.question }}
          </p>

          <!-- Pilihan jawaban -->
          <div class="space-y-2 ml-2">
            <template v-for="option in ['A', 'B', 'C', 'D', 'E']" :key="option">
              <label
                v-if="currentSoal[`option${option}`]"
                class="flex items-center gap-2 p-2 rounded-md cursor-pointer"
                :class="{ 'bg-blue-100': isSelected(option) }"
              >
                <input
                  type="radio"
                  :value="option"
                  v-model="jawabanUser[currentIndex]"
                  :disabled="terkunci[currentIndex]"
                  @change="pilihJawaban(option)"
                />
                <span>{{ option }}. {{ currentSoal[`option${option}`] }}</span>
              </label>
            </template>
          </div>

          <!-- Navigasi -->
          <div class="mt-4 flex flex-wrap gap-2">
            <Button @click="prevSoal" :disabled="currentIndex === 0">
              Sebelumnya
            </Button>
            <Button
              @click="nextSoal"
              :disabled="currentIndex === materi.soal.length - 1"
            >
              Selanjutnya
            </Button>
            <Button
              @click="lockJawaban"
              :disabled="terkunci[currentIndex]"
              class="bg-red-500 text-white"
            >
              Kunci Jawaban
            </Button>
            <Button
              v-if="terkunci[currentIndex]"
              @click="bukaKunci"
              class="bg-yellow-400 text-black"
            >
              Belum Yakin
            </Button>
          </div>
        </div>

        <div v-else>
          <p>Tidak ada soal untuk materi ini.</p>
        </div>
      </div>

      <!-- Navigasi soal -->
      <div class="w-full md:w-[25%]">
        <NavSoal
          :jumlahSoal="materi?.soal?.length || 0"
          :statusList="soalStatus"
          :goToSoal="goToSoal"
          @submitJawaban="submitJawaban"
        />
      </div>
    </div>
  </Section>
</template>
