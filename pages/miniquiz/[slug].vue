<script setup>
definePageMeta({
  ssr: true,
});

const route = useRoute();
const slug = route.params.slug;

if (!slug) {
  throw createError({ statusCode: 400, statusMessage: "Slug tidak tersedia" });
}

const {
  data: response,
  pending,
  error,
} = await useAsyncData(`miniquiz-${slug}`, () =>
  $fetch(`/api/miniquiz/${slug}`)
);
const miniquiz = computed(() => response.value?.data ?? {});

const currentIndex = ref(0);
console.log("Current Index:", currentIndex.value);
const currentSoal = computed(
  () => miniquiz.value?.soalMiniQuiz?.[currentIndex.value] ?? {}
);
const jawabanUser = ref([]);
const terkunci = ref([]);
const isSelected = (option) => jawabanUser.value[currentIndex.value] === option;

const pilihJawaban = (option) => {
  if (!terkunci.value[currentIndex.value]) {
    jawabanUser.value[currentIndex.value] = option;
  }
};

const nextSoal = () => {
  if (currentIndex.value < miniquiz.value.soalMiniQuiz.length - 1) {
    currentIndex.value++;
  }
};

const prevSoal = () => {
  if (currentIndex.value > 0) {
    currentIndex.value--;
  }
};

const showPembahasan = ref([]);

const kunciJawaban = () => {
  terkunci.value[currentIndex.value] = true;
  showPembahasan.value[currentIndex.value] = true;
};
</script>

<template>
  <Navbar />
  <Section height="min-h-[90vh] pb-16">
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
      <div class="judul">{{ miniquiz.title }}</div>
      <div class="deskripsi">{{ miniquiz.description }}</div>
      <div v-if="miniquiz.soalMiniQuiz && miniquiz.soalMiniQuiz.length">
        <p class="font-medium mb-2">
          {{ currentIndex + 1 }}. {{ currentSoal.question }}
        </p>

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

        <div class="mt-4 flex flex-wrap gap-2">
          <Button v-if="currentIndex > 0" @click="prevSoal">
            Sebelumnya
          </Button>

          <Button
            v-if="currentIndex < miniquiz.soalMiniQuiz.length - 1"
            @click="nextSoal"
          >
            Selanjutnya
          </Button>

            <Button
    v-if="!terkunci[currentIndex]"
    @click="kunciJawaban"
    color="primary"
  >
    Pilih Jawaban
  </Button>
        </div>

        <div v-if="showPembahasan[currentIndex]" class="mt-4 p-4 bg-green-50 rounded-md">
  <p class="font-semibold text-green-700">
    Jawaban yang benar: {{ currentSoal.correctOption }}
  </p>
  <p class="mt-2 text-gray-700 whitespace-pre-line">
    Pembahasan: {{ currentSoal.pembahasan }}
  </p>
</div>

      </div>
    </div>
  </Section>
  <Footer />
</template>
