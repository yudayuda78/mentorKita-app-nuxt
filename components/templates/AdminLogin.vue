<script setup>


const auth = useAuthStore()
const admin = useAdminStore()

const username = ref('')
const password = ref('')
const error = ref('')
const showPassword = ref(false)

const handleLogin = async () => {
  error.value = ''
  const success = await admin.login(username.value, password.value)

  if (!success) {
    error.value = admin.error
    return
  }

  await navigateTo('/mentorkita-admin')
}
</script>

<template>
  <div class="flex h-screen">
   

    <!-- Panel kiri -->
    <div class="bg-amber-200 w-[40%] h-full hidden md:block"></div>

    <!-- Form login -->
    <div class="flex items-center justify-center w-full md:w-[60%]">
      <div class="w-[90%] max-w-[400px] space-y-4 p-6 bg-white rounded-xl shadow-md">
        <h2 class="text-2xl font-bold text-center">Admin Login</h2>
    

        <!-- Username -->
        <Input v-model="username" name="username" type="text" placeholder="Masukkan username">
          Username
        </Input>

        <!-- Password -->
        <div class="relative">
          <input
            v-model="password"
            :type="showPassword ? 'text' : 'password'"
            placeholder="Masukkan password"
            class="w-full px-3 py-2 border rounded-md"
          />
          <button
            type="button"
            @click="showPassword = !showPassword"
            class="absolute inset-y-0 right-2 flex items-center text-sm text-gray-600"
          >
            {{ showPassword ? '🙈' : '👁️' }}
          </button>
        </div>

        <!-- Error -->
        <p v-if="error" class="text-red-600 text-sm text-center">{{ error }}</p>

        <!-- Tombol -->
        <Button @click="handleLogin" class="w-full">Login</Button>
        

        
      </div>
    </div>
  </div>
</template>
