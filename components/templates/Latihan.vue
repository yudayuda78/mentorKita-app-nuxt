<script setup>
defineEmits(['submitJawaban'])
const route = useRoute();
const latihanStore = useLatihanStore();
const slug = route.params.slug;
const auth = useAuthStore()
const userId = computed(() => auth.user?.id || "");

const materi = ref(null);
const timerRef = ref(null)
const isSoalStart = ref(false);
const currentIndex = ref(0);
const jawabanUser = ref([]);
const terkunci = ref([]);
const ragu = ref([]);

const soalStart = () => {
  isSoalStart.value = true;
  timerRef.value?.startTimer()
};

onMounted(async () => {
  await latihanStore.latihanFetch();
  const data = latihanStore.latihanData.flatMap((kelas) =>
    kelas.courses.flatMap((course) => course.materi)
  );
  materi.value = data.find(
    (item) => item.slug === Number(slug) || item.slug === slug
  );

  // Inisialisasi array jawaban dan kunci
  if (materi.value?.soal) {
    jawabanUser.value = Array(materi.value.soal.length).fill("");
    terkunci.value = Array(materi.value.soal.length).fill(false);
  }
  ragu.value = Array(materi.value.soal.length).fill(false);
});

const currentSoal = computed(
  () => materi.value?.soal?.[currentIndex.value] || {}
);

const isSelected = (option) => {
  return jawabanUser.value[currentIndex.value] === option;
};

const pilihJawaban = (option) => {
  if (!terkunci.value[currentIndex.value]) {
    jawabanUser.value[currentIndex.value] = option;
  }
};

const nextSoal = () => {
  if (currentIndex.value < materi.value.soal.length - 1) {
    currentIndex.value++;
  }
};

const prevSoal = () => {
  if (currentIndex.value > 0) {
    currentIndex.value--;
  }
};

const lockJawaban = () => {
  terkunci.value[currentIndex.value] = true;
  ragu.value[currentIndex.value] = false;
};

const bukaKunci = () => {
  // Hanya bisa dibuka kalau terkunci
  if (terkunci.value[currentIndex.value]) {
    terkunci.value[currentIndex.value] = false;
    ragu.value[currentIndex.value] = true;
  }
};

const soalStatus = computed(() => {
  return jawabanUser.value.map((jawaban, index) => {
    if (terkunci.value[index]) return "terkunci";
    if (jawaban) return "dijawab";
    return "belum";
  });
});

const goToSoal = (index) => {
  currentIndex.value = index;
};

const submitJawaban = async() => {
  

  const payload = materi.value.soal.map( (soal, index) => {
    const jawaban = jawabanUser.value[index]
    const benar = jawaban === soal.correctOption


    return {
      soalId: soal.id,
      jawaban : jawaban,
      benar : benar,
      userId : userId.value,
      materiSoal: soal.materiSoal,
    }
  })

  const materiId = materi.value?.id

  try {
    const response = await $fetch('/api/answer-latihan', {
      method: 'POST',
      body: { jawaban: payload },
    })

    alert('Waktu habis! Jawaban disubmit otomatis.')
    
  } catch (err) {
    console.error(err)
    alert('Gagal menyimpan jawaban!')
  }

  useScoreLatihan(payload, materiId)
 
}
</script>

<template>
  <Section>
    <Timer ref="timerRef" @autoSubmit="submitJawaban()"/>
  </Section>

  <Section height="h-auto">
    <div v-if="!isSoalStart">
      <Button @click="soalStart">Mulai Kerjakan</Button>
    </div>

    <div v-else class="flex gap-4 w-full">
      <div class="soal w-[80%]">
        <div v-if="materi">
          <h2 class="text-xl font-bold mb-4">Materi: {{ materi.name }}</h2>

          <div v-if="materi.soal && materi.soal.length">
            <div>
              <p class="font-medium mb-2">
                {{ currentIndex + 1 }}. {{ currentSoal.question }}
              </p>
              <div class="space-y-2 ml-4">
                <label
                  v-if="currentSoal.optionA"
                  class="flex items-center gap-2 cursor-pointer p-2 rounded-md"
                  :class="{ 'bg-blue-100': isSelected('A') }"
                >
                  <input
                    type="radio"
                    value="A"
                    v-model="jawabanUser[currentIndex]"
                    :disabled="terkunci[currentIndex]"
                    @change="pilihJawaban('A')"
                  />
                  <span>A. {{ currentSoal.optionA }}</span>
                </label>

                <label
                  v-if="currentSoal.optionB"
                  class="flex items-center gap-2 cursor-pointer p-2 rounded-md"
                  :class="{ 'bg-blue-100': isSelected('B') }"
                >
                  <input
                    type="radio"
                    value="B"
                    v-model="jawabanUser[currentIndex]"
                    :disabled="terkunci[currentIndex]"
                    @change="pilihJawaban('B')"
                  />
                  <span>B. {{ currentSoal.optionB }}</span>
                </label>

                <label
                  v-if="currentSoal.optionC"
                  class="flex items-center gap-2 cursor-pointer p-2 rounded-md"
                  :class="{ 'bg-blue-100': isSelected('C') }"
                >
                  <input
                    type="radio"
                    value="C"
                    v-model="jawabanUser[currentIndex]"
                    :disabled="terkunci[currentIndex]"
                    @change="pilihJawaban('C')"
                  />
                  <span>C. {{ currentSoal.optionC }}</span>
                </label>

                <label
                  v-if="currentSoal.optionD"
                  class="flex items-center gap-2 cursor-pointer p-2 rounded-md"
                  :class="{ 'bg-blue-100': isSelected('D') }"
                >
                  <input
                    type="radio"
                    value="D"
                    v-model="jawabanUser[currentIndex]"
                    :disabled="terkunci[currentIndex]"
                    @change="pilihJawaban('D')"
                  />
                  <span>D. {{ currentSoal.optionD }}</span>
                </label>

                <label
                  v-if="currentSoal.optionE"
                  class="flex items-center gap-2 cursor-pointer p-2 rounded-md"
                  :class="{ 'bg-blue-100': isSelected('E') }"
                >
                  <input
                    type="radio"
                    value="E"
                    v-model="jawabanUser[currentIndex]"
                    :disabled="terkunci[currentIndex]"
                    @change="pilihJawaban('E')"
                  />
                  <span>E. {{ currentSoal.optionE }}</span>
                </label>
              </div>

              <div class="mt-4 flex gap-2">
                <Button @click="prevSoal" :disabled="currentIndex === 0"
                  >Sebelumnya</Button
                >
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
          </div>
          <div v-else>
            <p>Tidak ada soal untuk materi ini.</p>
          </div>
        </div>
        <div v-else>
          <p>Loading atau materi tidak ditemukan...</p>
        </div>
      </div>

      <div class="navsoal w-[20%]">
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
