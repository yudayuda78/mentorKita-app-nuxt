<script setup>
const { handleFileInput: handleFileInput1, files: files1 } = useFileStorage({
  clearOldFiles: false,
});

const { handleFileInput: handleFileInput2, files: files2 } = useFileStorage({
  clearOldFiles: false,
});

const { handleFileInput: handleFileInput3, files: files3 } = useFileStorage({
  clearOldFiles: false,
});

const { handleFileInput: handleFileInput4, files: files4 } = useFileStorage({
  clearOldFiles: false,
});

const { handleFileInput: handleFileInput5, files: files5 } = useFileStorage({
  clearOldFiles: false,
});

const uploadAll = async () => {
  const response = await $fetch("/api/files", {
    method: "POST",
    body: {
      files: [
        ...files1.value,
        ...files2.value,
        ...files3.value,
        ...files4.value,
        ...files5.value,
      ],
    },
  });
  alert("Upload berhasil!");
};

const route = useRoute();
const store = useSnbtStore();
const useAuth = useAuthStore();
const userId = computed(() => useAuth.user?.id || "");
const subscriptionStore = useSubscriptionStore();

const expiredAt = ref(null);
const hasSubscription = ref(false);

const isExpired = computed(() => {
  if (!hasSubscription.value) return true; // ✅ Anggap expired jika tidak punya subscription
  if (!expiredAt.value) return true; // ✅ Anggap expired jika tidak ada tanggal expired
  return new Date(expiredAt.value) < new Date();
});

console.log("isExpired:", isExpired.value);

onMounted(async () => {
  await store.snbtSlug(route.params.slug);
  await subscriptionStore.getSubscriptionDetails(userId.value);
  const detail = subscriptionStore.subscriptionDetail;

  if (detail && detail.expiredAt) {
    hasSubscription.value = true;
    expiredAt.value = detail.expiredAt;
  } else {
    hasSubscription.value = false;
  }

  console.log("expiredAt:", expiredAt.value);
});

const promoText = `🔥 *Tryout Online GRATIS – Kuota Terbatas!*

Siapkan dirimu dengan latihan soal yang _real dan menantang_, lengkap dengan sistem seperti ujian asli.

🎓 Cocok untuk persiapan *UTBK, PAS, dan Ujian Sekolah*

🧾 Langsung dapat *skor & pembahasan*

⏳ Jangan sampai kehabisan kuota!

➤ *Daftar sekarang!* Klik link berikut:
👉 https://contoh.link/pendaftaran`;

const copyPromo = async () => {
  try {
    await navigator.clipboard.writeText(promoText);
    alert("Teks promosi berhasil disalin! Silakan tempel di WhatsApp 📲");
  } catch (err) {
    alert("Gagal menyalin teks.");
  }
};
</script>

<template>
  <Navbar />
  <Section>
    <div v-if="isExpired && store.snbtDetail?.isfree">
      <p
        class="mt-6 px-4 py-3 bg-green-50 border border-green-300 text-green-800 rounded-lg text-sm shadow-sm"
      >
        📢 <strong>Copy teks berikut ke 5 grup WhatsApp</strong> dan kirim bukti
        share tersebut 📷
      </p>



      <p
  class="mt-4 p-4 border border-gray-300 rounded-lg bg-white text-gray-700 text-sm leading-relaxed space-y-4"
>
  <div>
    <strong class="text-red-500">🔥 Tryout Online GRATIS – Kuota Terbatas!</strong><br />
    Siapkan dirimu dengan latihan soal yang <em>real dan menantang</em>,
    lengkap dengan sistem seperti ujian asli.<br /><br />
    🎓 Cocok untuk persiapan <strong>UTBK, PAS, dan Ujian Sekolah</strong><br />
    🧾 Langsung dapat <strong>skor & pembahasan</strong><br />
    ⏳ Jangan sampai kehabisan kuota!<br /><br />
    ➤
    <strong>
      <a href="#daftar" class="text-blue-600 underline">Daftar sekarang</a>
    </strong> sebelum ditutup!
  </div>

  <div>
    <button
      @click="copyPromo"
      class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
    >
      📋 Copy Teks
    </button>
  </div>
</p>


      <div class="space-y-4 mt-4">
        <label class="block">
          <span class="text-gray-700 font-medium">Bukti Share 1</span>
          <input
            type="file"
            @input="handleFileInput1"
            class="mt-1 block w-full rounded-lg border border-gray-300 bg-white text-sm text-gray-900 shadow-sm file:mr-4 file:rounded-md file:border-0 file:bg-blue-500 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white hover:file:bg-blue-600"
          />
        </label>

        <label class="block">
          <span class="text-gray-700 font-medium">Bukti Share 2</span>
          <input
            type="file"
            @input="handleFileInput2"
            class="mt-1 block w-full rounded-lg border border-gray-300 bg-white text-sm text-gray-900 shadow-sm file:mr-4 file:rounded-md file:border-0 file:bg-blue-500 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white hover:file:bg-blue-600"
          />
        </label>

        <label class="block">
          <span class="text-gray-700 font-medium">Bukti Share 3</span>
          <input
            type="file"
            @input="handleFileInput3"
            class="mt-1 block w-full rounded-lg border border-gray-300 bg-white text-sm text-gray-900 shadow-sm file:mr-4 file:rounded-md file:border-0 file:bg-blue-500 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white hover:file:bg-blue-600"
          />
        </label>

        <label class="block">
          <span class="text-gray-700 font-medium">Bukti Share 4</span>
          <input
            type="file"
            @input="handleFileInput4"
            class="mt-1 block w-full rounded-lg border border-gray-300 bg-white text-sm text-gray-900 shadow-sm file:mr-4 file:rounded-md file:border-0 file:bg-blue-500 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white hover:file:bg-blue-600"
          />
        </label>

        <label class="block">
          <span class="text-gray-700 font-medium">Bukti Share 5</span>
          <input
            type="file"
            @input="handleFileInput5"
            class="mt-1 block w-full rounded-lg border border-gray-300 bg-white text-sm text-gray-900 shadow-sm file:mr-4 file:rounded-md file:border-0 file:bg-blue-500 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white hover:file:bg-blue-600"
          />
        </label>
      </div>

      <button
        @click="uploadAll"
        class="bg-green-500 text-white px-4 py-2 rounded mt-4"
      >
        ⬆️ Upload Semua Bukti
      </button>
    </div>
    <div
      v-if="isExpired && !store.snbtDetail?.isfree"
      class="text-center text-red-500"
    >
      {{ store.snbtDetail?.isfree }}bayar dulu
      <input type="file" @input="handleFileInput" />
    </div>
    <div v-else-if="!isExpired" class="text-center text-gray-500">
      <div class="wrapper py-10 max-w-3xl mx-auto">
        <div v-if="store.loading" class="text-center text-gray-500">
          Loading...
        </div>

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
                <NuxtLink
                  :to="`/tryout/snbt/${route.params.slug}/${materi.id}`"
                >
                  <Button>Kerjakan</Button>
                </NuxtLink>
              </div>
            </li>
          </ul>
        </div>

        <div v-else class="text-center text-gray-500">Data tidak ditemukan</div>
      </div>
    </div>
  </Section>
  <Footer />
</template>
