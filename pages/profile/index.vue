<template>
  <Navbar />

  <Section height="min-h-screen" color="bg-gray-50">
    <div class="m-auto w-full max-w-2xl bg-white p-8 rounded-xl shadow-lg space-y-6">
      <h2 class="text-2xl font-bold text-gray-700 text-center">Profil Saya</h2>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- Username -->
        <div class="md:col-span-2">
          <label class="block text-sm font-medium text-gray-700 mb-1">Username</label>
          <input
            type="text"
            class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Contoh: ariefyuda"
          />
        </div>

        <!-- Nama Lengkap -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Nama Lengkap</label>
          <input
            type="text"
            class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Nama Lengkap"
          />
        </div>

        <!-- Email -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input
            type="email"
            class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="email@example.com"
          />
        </div>

        <!-- Nomor HP -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Nomor HP</label>
          <input
            type="tel"
            class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="08xxxxxxxxxx"
          />
        </div>

        <!-- Tanggal Lahir -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Tanggal Lahir</label>
          <input
            type="date"
            class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <!-- Jenis Kelamin -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Jenis Kelamin</label>
          <div class="flex gap-4 mt-2">
            <label class="inline-flex items-center">
              <input type="radio" name="gender" value="Laki-laki" class="form-radio text-blue-600" />
              <span class="ml-2">Laki-laki</span>
            </label>
            <label class="inline-flex items-center">
              <input type="radio" name="gender" value="Perempuan" class="form-radio text-blue-600" />
              <span class="ml-2">Perempuan</span>
            </label>
          </div>
        </div>

        <!-- Asal Sekolah / Universitas -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Asal Sekolah / Universitas</label>
          <input
            type="text"
            class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Contoh: SMA 1 Jakarta / Universitas A"
          />
        </div>

        <!-- Universitas Tujuan -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Universitas Tujuan</label>
          <input
            type="text"
            class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Contoh: Universitas Indonesia"
          />
        </div>

        <!-- Jurusan Tujuan -->
        <div class="md:col-span-2">
          <label class="block text-sm font-medium text-gray-700 mb-1">Jurusan Tujuan</label>
          <input
            type="text"
            class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Contoh: Teknik Informatika"
          />
        </div>
      </div>

      <div class="text-center">
        <button
          class="mt-6 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Simpan Profil
        </button>
      </div>
    </div>
  </Section>

  <Footer />
</template>
