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



const email = ref('')
const isSubmitted = ref(false)
const showError = ref(false)

async function submitEmail() {
  if (!email.value || !email.value.includes('@')) {
    showError.value = true
    return
  }

  // Simpan ke backend jika perlu (opsional)
  // await $fetch('/api/submit-email', { method: 'POST', body: { email: email.value, slug } })
  await $fetch('/api/miniquiz', { method: 'POST', body: { title: response.value.data.title,  email: email.value } })

  isSubmitted.value = true
  showError.value = false
}
</script>

<template>
  <Navbar />

  <Section height="min-h-[90vh] pb-16">
    <div class="max-w-6xl mx-auto px-4">
      <!-- Header Mini Quiz -->
      <div class="text-center mb-10">
        <h1 class="text-2xl font-bold text-gray-800 mb-2">{{ miniquiz.title }}</h1>
        <p class="text-gray-600 text-lg">{{ miniquiz.description }}</p>
      </div>

      <!-- Form Email -->
      <div v-if="!isSubmitted" class="max-w-md mx-auto bg-white p-6 rounded-lg shadow space-y-4">
        <label class="block text-gray-700 font-medium">Masukkan Email untuk mengerjakan quiz:</label>
        <input
          v-model="email"
          type="email"
          placeholder="contoh@email.com"
          class="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          @click="submitEmail"
          class="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Submit Email
        </button>
        <p v-if="showError" class="text-red-500 text-sm">Email tidak valid.</p>
      </div>

      <!-- Quiz Content -->
      <div v-else v-if="miniquiz.soalMiniQuiz && miniquiz.soalMiniQuiz.length" class="max-w-3xl mx-auto mt-10 space-y-6">
        <div class="bg-white p-6 rounded-lg shadow">
          <p class="font-medium text-lg mb-4">
            {{ currentIndex + 1 }}. {{ currentSoal.question }}
          </p>

          <div class="space-y-3">
            <template v-for="option in ['A', 'B', 'C', 'D', 'E']" :key="option">
              <label
                v-if="currentSoal[`option${option}`]"
                class="flex items-center gap-3 p-3 border rounded-md cursor-pointer hover:bg-gray-50"
                :class="{ 'bg-blue-100 border-blue-500': isSelected(option) }"
              >
                <input
                  type="radio"
                  :value="option"
                  v-model="jawabanUser[currentIndex]"
                  :disabled="terkunci[currentIndex]"
                  @change="pilihJawaban(option)"
                />
                <span class="text-gray-800">{{ option }}. {{ currentSoal[`option${option}`] }}</span>
              </label>
            </template>
          </div>

          <div class="mt-6 flex flex-wrap gap-3 justify-between">
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
        </div>

        <!-- Pembahasan -->
        <div
          v-if="showPembahasan[currentIndex]"
          class="p-5 bg-green-50 border border-green-200 rounded-md shadow"
        >
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
