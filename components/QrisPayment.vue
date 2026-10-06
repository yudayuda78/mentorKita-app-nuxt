<script setup>
const props = defineProps({
  orderId: { type: String, default: '' },
  totalAmount: { type: [Number, String], default: 0 },
  uniqueCode: { type: [Number, String], default: null },
  qrisBase64: { type: String, default: '' },
  qrisPayload: { type: String, default: '' },
  expiresAt: { type: [String, Date], default: null },
  transferAccounts: { type: Array, default: () => [] },
})

const emit = defineEmits(['paid'])

const status = ref('pending')
const remaining = ref('')
const copied = ref('')

let pollTimer = null
let countdownTimer = null

const formatRupiah = (value) => Number(value || 0).toLocaleString('id-ID')

const qrImage = computed(() => props.qrisBase64 || '')

const checkStatus = async () => {
  if (!props.orderId) return
  try {
    const res = await $fetch('/api/payment/status', {
      query: { orderId: props.orderId },
      credentials: 'include',
    })
    if (res?.data?.paymentStatus === 'paid') {
      status.value = 'paid'
      stopPolling()
      emit('paid', res.data)
    }
  } catch (error) {
    // biarkan polling mencoba lagi pada interval berikutnya
  }
}

const startPolling = () => {
  if (pollTimer) return
  pollTimer = setInterval(checkStatus, 10000)
}

const stopPolling = () => {
  if (pollTimer) {
    clearInterval(pollTimer)
    pollTimer = null
  }
}

const tick = () => {
  if (!props.expiresAt) {
    remaining.value = ''
    return
  }
  const diff = new Date(props.expiresAt).getTime() - Date.now()
  if (diff <= 0) {
    remaining.value = 'Kedaluwarsa'
    return
  }
  const hours = Math.floor(diff / 3600000)
  const minutes = Math.floor((diff % 3600000) / 60000)
  const seconds = Math.floor((diff % 60000) / 1000)
  remaining.value = `${hours}j ${minutes}m ${seconds}s`
}

const copyToClipboard = (text, bank) => {
  navigator.clipboard.writeText(String(text)).then(() => {
    copied.value = bank
    setTimeout(() => {
      copied.value = ''
    }, 3000)
  })
}

onMounted(() => {
  startPolling()
  checkStatus()
  tick()
  countdownTimer = setInterval(tick, 1000)
})

onBeforeUnmount(() => {
  stopPolling()
  if (countdownTimer) clearInterval(countdownTimer)
})
</script>

<template>
  <div class="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
    <div v-if="status === 'paid'" class="text-center py-6">
      <p class="text-3xl mb-2">✅</p>
      <p class="text-lg font-semibold text-green-600">Pembayaran Berhasil</p>
      <p class="text-sm text-gray-500">Akses tryout Anda sudah aktif.</p>
    </div>

    <template v-else>
      <p class="font-semibold text-lg mb-1 text-center">Scan QRIS untuk Membayar</p>
      <p class="text-sm text-gray-500 text-center mb-4">
        Nominal sudah terisi otomatis. Selesaikan sebelum kedaluwarsa.
      </p>

      <div class="flex flex-col items-center gap-3">
        <img
          v-if="qrImage"
          :src="qrImage"
          alt="QRIS"
          class="w-56 h-56 object-contain border rounded-lg bg-white p-2"
        />
        <div
          v-else
          class="w-56 h-56 flex items-center justify-center border rounded-lg bg-gray-50 text-sm text-gray-400 text-center px-4"
        >
          QR belum tersedia. Coba muat ulang.
        </div>

        <div class="text-center">
          <p class="text-sm text-gray-500">Total Pembayaran</p>
          <p class="text-2xl font-bold text-gray-800">
            Rp {{ formatRupiah(totalAmount) }}
          </p>
          <p v-if="uniqueCode" class="text-xs text-gray-400">
            Termasuk kode unik {{ uniqueCode }}
          </p>
        </div>

        <p v-if="remaining" class="text-sm text-orange-500">
          ⏳ Berlaku {{ remaining }}
        </p>
      </div>

      <div v-if="transferAccounts.length" class="mt-6 border-t pt-4">
        <p class="text-sm font-medium text-gray-700 mb-2">
          Atau transfer manual ke rekening berikut:
        </p>
        <ul class="space-y-2">
          <li
            v-for="(account, index) in transferAccounts"
            :key="index"
            class="flex items-center justify-between text-sm bg-gray-50 rounded-lg px-3 py-2"
          >
            <div>
              <p class="font-semibold">{{ account.bank_name || account.bank_code }}</p>
              <p>{{ account.account_number }} a.n. {{ account.account_holder }}</p>
            </div>
            <button
              class="ml-2 px-2 py-1 text-xs border rounded transition"
              :class="copied === account.account_number ? 'text-blue-600 border-blue-600' : 'hover:bg-gray-100'"
              @click="copyToClipboard(account.account_number, account.account_number)"
            >
              {{ copied === account.account_number ? 'Tersalin' : 'Salin' }}
            </button>
          </li>
        </ul>
      </div>

      <p class="text-xs text-gray-400 text-center mt-4">
        Status pembayaran diperbarui otomatis. Jangan tutup halaman ini.
      </p>
    </template>
  </div>
</template>
