<script setup>

const auth = useAuthStore()

const profile = ref({
  username: '',
  email: '',
  fullName: '',
  phoneNumber: '',
  birthDate: '',
  gender: '',
  schoolOrigin: '',
  targetUniversity: '',
  targetMajor: ''
})

const loading = ref(false)

onMounted(async () => {
  const data = await auth.getProfile()
  if (data) {
    profile.value = {
      username: data.username || '',
      email: data.email || '',
      fullName: data.fullName || '',
      phoneNumber: data.phoneNumber || '',
      birthDate: data.birthDate ? new Date(data.birthDate).toISOString().slice(0, 10) : '',
      gender: data.gender || '',
      schoolOrigin: data.schoolOrigin || '',
      targetUniversity: data.targetUniversity || '',
      targetMajor: data.targetMajor || ''
    }
  }
})



const updateProfile = async () => {
  loading.value = true
  const success = await auth.updateProfile(profile.value)
  loading.value = false

  if (success) {
    alert('Profil berhasil diperbarui!')
  } else {
    alert(auth.error || 'Terjadi kesalahan saat memperbarui profil.')
  }
}
</script>


<template>
  <Navbar />

  <Section height="min-h-screen" color="bg-gray-50" class="container mx-auto px-4 sm:px-6 lg:px-8">
    <div class="mx-auto w-full max-w-[95%] sm:max-w-[600px] md:max-w-[700px] lg:max-w-[800px] xl:max-w-[850px] bg-white px-5 py-8 sm:px-8 sm:py-10 rounded-2xl shadow space-y-6">

      <h2 class="text-2xl font-bold text-gray-700 text-center">Profil Saya</h2>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- Username -->
        <div class="md:col-span-2">
          <label class="block text-sm font-medium text-gray-700 mb-1">Username</label>
          <input
            v-model="profile.username"
            type="text"
            class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Contoh: user123"
          />
        </div>
      
        <!-- Nama Lengkap -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Nama Lengkap</label>
          <input
            v-model="profile.fullName"
            type="text"
            class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Nama Lengkap"
          />
        </div>

        <!-- Email -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input
            v-model="profile.email"
            type="email"
            class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="email@example.com"
          />
        </div>

        <!-- Nomor HP -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Nomor HP</label>
          <input
            v-model="profile.phoneNumber"
            type="tel"
            class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="08xxxxxxxxxx"
          />
        </div>

        <!-- Tanggal Lahir -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Tanggal Lahir</label>
          <input
            v-model="profile.birthDate"
            type="date"
            class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <!-- Jenis Kelamin -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Jenis Kelamin</label>
          <div class="flex gap-4 mt-2">
            <label class="inline-flex items-center">
              <input
                type="radio"
                value="Laki-laki"
                v-model="profile.gender"
                class="form-radio text-blue-600"
              />
              <span class="ml-2">Laki-laki</span>
            </label>
            <label class="inline-flex items-center">
              <input
                type="radio"
                value="Perempuan"
                v-model="profile.gender"
                class="form-radio text-blue-600"
              />
              <span class="ml-2">Perempuan</span>
            </label>
          </div>
        </div>

        <!-- Asal Sekolah / Universitas -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Asal Sekolah / Universitas</label>
          <input
            v-model="profile.schoolOrigin"
            type="text"
            class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Contoh: SMA 1 Jakarta / Universitas A"
          />
        </div>

        <!-- Universitas Tujuan -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Universitas Tujuan</label>
          <input
            v-model="profile.targetUniversity"
            type="text"
            class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Contoh: Universitas Indonesia"
          />
        </div>

        <!-- Jurusan Tujuan -->
        <div class="md:col-span-2">
          <label class="block text-sm font-medium text-gray-700 mb-1">Jurusan Tujuan</label>
          <input
            v-model="profile.targetMajor"
            type="text"
            class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Contoh: Teknik Informatika"
          />
        </div>
      </div>

      <div class="text-center">
        <button
          @click="updateProfile"
          class="mt-6 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Simpan Profil
        </button>
      </div>
    </div>
  </Section>

  <Footer />
</template>
