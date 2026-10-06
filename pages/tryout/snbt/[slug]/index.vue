<script setup>
  definePageMeta({
  middleware: 'auth'
})
import { useShareStore } from '~/stores/useShareStore';

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


const allFilesFilled = computed(() => {
  return (
    files1.value.length > 0 &&
    files2.value.length > 0 &&
    files3.value.length > 0 &&
    files4.value.length > 0 &&
    files5.value.length > 0
  );
});

const isUploading = ref(false)
const uploadError = ref(null)

const uploadAll = async () => {
  isUploading.value = true
  uploadError.value = null

  try {
    const files = [
      ...files1.value,
      ...files2.value,
      ...files3.value,
      ...files4.value,
      ...files5.value,
    ];

    console.log('Uploading files:', files)

    const response = await $fetch("/api/file", {
      method: "POST",
      body: {
        files,
      },
    });

    console.log('Upload response:', response)
    alert(`✅ Upload berhasil! ${response.total} file dikirim.`);
  } catch (err) {
    console.error('Upload error:', err)
    uploadError.value = err?.message || "Terjadi kesalahan saat upload."
    alert("❌ Upload gagal!");
  } finally {
    isUploading.value = false
  }
};


const route = useRoute();
const store = useSnbtStore();
const useAuth = useAuthStore();
const userId = computed(() => useAuth.user?.id || "");
const subscriptionStore = useSubscriptionStore();
const shareStore = useShareStore()

const snbtId = computed(() => store.snbtDetail?.id || null);
const snbtMateri = computed(() => store.snbtDetail?.name || null);
const isShared = computed(() => shareStore.isShared?.isShared === true)

const paymentLoading = ref(false);
const paymentError = ref('');
const paymentData = ref(null);
const transferAccounts = ref([]);
const hasPaid = ref(false);

const loadTransferAccounts = async () => {
  try {
    const res = await $fetch('/api/payment/transfer-accounts', { credentials: 'include' });
    transferAccounts.value = res?.data || [];
  } catch (e) {
    transferAccounts.value = [];
  }
};

const checkPaid = async () => {
  if (!snbtId.value) return;
  try {
    const res = await $fetch('/api/tryout/payment/check', {
      query: { snbtTryoutId: snbtId.value },
      credentials: 'include',
    });
    hasPaid.value = !!res?.data?.isPaid;
  } catch (e) {
    hasPaid.value = false;
  }
};

const payWithQris = async () => {
  paymentError.value = '';
  paymentLoading.value = true;
  try {
    const res = await $fetch('/api/tryout/payment', {
      method: 'POST',
      credentials: 'include',
      body: {
        snbtTryoutId: snbtId.value,
        snbtTryoutName: snbtMateri.value,
      },
    });
    paymentData.value = res.data;
    if (res.data?.isPaid) {
      hasPaid.value = true;
    }
  } catch (e) {
    paymentError.value = e?.data?.statusMessage || e?.statusMessage || 'Gagal membuat invoice QRIS.';
  } finally {
    paymentLoading.value = false;
  }
};

const onPaid = async () => {
  hasPaid.value = true;
};




const expiredAt = ref(null);
const hasSubscription = ref(false);

const isExpired = computed(() => {
  if (!hasSubscription.value) return true; // ✅ Anggap expired jika tidak punya subscription
  if (!expiredAt.value) return true; // ✅ Anggap expired jika tidak ada tanggal expired
  return new Date(expiredAt.value) < new Date();
});

const hasAccess = computed(() => {
  const detail = store.snbtDetail;
  if (!detail) return false;
  if (detail.isfree) return hasSubscription.value || isShared.value;
  return hasPaid.value;
});


const isLoading = ref(true)
onMounted(async () => {
  try {
    await store.snbtSlug(route.params.slug)
    await subscriptionStore.getSubscriptionDetails(userId.value)

    const detail = subscriptionStore.subscriptionDetail
    hasSubscription.value = !!detail
    expiredAt.value = detail?.expiredAt ?? null

    await shareStore.getShared(userId.value, snbtId.value)

    if (store.snbtDetail && !store.snbtDetail.isfree) {
      await checkPaid();
      if (!hasPaid.value) {
        loadTransferAccounts();
      }
    }
  } catch (e) {
    console.error("Error saat mengambil data:", e)
  } finally {
    isLoading.value = false // ✅ hanya setelah semua data siap
  }
  
});


const addDataShare = async () => {
  shareStore.shareSnbt(userId.value, snbtId.value, snbtMateri.value)
}

const handleUpload = () => {
  uploadAll();
  addDataShare();
}


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
  <Section height="min-h-[90vh] pb-16">
    <div v-if="isLoading" class="text-center py-10 text-gray-500">
      ⏳ Memuat data tryout...
    </div>

    <template v-else>
      <div v-if="(isExpired && store.snbtDetail?.isfree) && !isShared">
        <p
          class="mt-6 px-4 py-3 bg-green-50 border border-green-300 text-green-800 rounded-lg text-sm shadow-sm"
        >
          📢 <strong>Copy teks berikut ke 5 grup WhatsApp</strong> dan kirim bukti
          share tersebut 📷
        </p>

      <div
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
</div>



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
  @click="handleUpload"
  :disabled="!allFilesFilled || isUploading"
  class="bg-green-500 text-white px-4 py-2 rounded mt-4 disabled:opacity-50"
>
  ⬆️ Upload Semua Bukti
</button>

      <div class="grid grid-cols-2 gap-2 mt-4">
  <img
    v-for="(file, i) in [
      ...files1,
      ...files2,
      ...files3,
      ...files4,
      ...files5
    ]"
    :key="i"
    :src="file.content"
    class="w-full h-auto rounded shadow border"
  />
</div>

<div v-if="isUploading" class="text-sm text-gray-500 mt-2">⏳ Mengunggah...</div>
<div v-if="uploadError" class="text-sm text-red-500 mt-2">{{ uploadError }}</div>



    </div>


    <div
      v-if="!store.snbtDetail?.isfree && !hasPaid"
      class="max-w-xl mx-auto"
    >
      <div class="bg-yellow-50 border border-yellow-300 text-yellow-800 p-4 rounded-md mb-4">
        <p class="font-semibold text-lg mb-1">💰 Akses Tryout Premium</p>
        <p class="text-sm">
          Bayar sekali untuk membuka akses tryout ini. Pembayaran terverifikasi otomatis.
        </p>
      </div>

      <div v-if="!paymentData" class="text-center">
        <button
          class="bg-[#2966F2] text-white px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition disabled:opacity-50"
          :disabled="paymentLoading"
          @click="payWithQris"
        >
          {{ paymentLoading ? 'Membuat invoice...' : 'Bayar dengan QRIS' }}
        </button>
        <p v-if="paymentError" class="text-sm text-red-500 mt-3">{{ paymentError }}</p>
      </div>

      <QrisPayment
        v-else
        :order-id="paymentData.orderId"
        :total-amount="paymentData.totalAmount"
        :unique-code="paymentData.uniqueCode"
        :qris-base64="paymentData.qrisBase64"
        :qris-payload="paymentData.qrisPayload"
        :expires-at="paymentData.expiresAt"
        :transfer-accounts="transferAccounts"
        @paid="onPaid"
      />
    </div>



    <div v-else-if="hasAccess" class="text-center text-gray-500">
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
              v-for="materi in store.snbtDetail.tryoutMateri.slice().reverse() || []"
              :key="materi.id"
              class="p-4 border rounded-lg flex items-center justify-between"
            >
              <div class="text-left">
                <p class="font-semibold text-lg">{{ materi.name }}</p>
                <p class="text-sm text-gray-500">
                  {{ Math.floor(materi.time) }} menit
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
    </template>

    
  </Section>
  <Footer />
</template>
