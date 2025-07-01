<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";

const password = ref("");
const confirmPassword = ref("");
const message = ref("");
const error = ref("");
const route = useRoute();
const router = useRouter();

const token = route.query.token;
const email = route.query.email;

const reset = async () => {
  if (password.value !== confirmPassword.value) {
    error.value = "Konfirmasi password tidak cocok.";
    return;
  }

  try {
    await $fetch("/api/auth/reset-password", {
      method: "POST",
      body: {
        token,
        email, // tambahkan email di body
        password: password.value,
        passwordConfirm: confirmPassword.value,
      },
    });
    message.value = "Password berhasil direset. Silakan login.";
    setTimeout(() => router.push("/login"), 2000);
  } catch (err) {
    error.value = "Token tidak valid atau sudah kedaluwarsa.";
  }
};
</script>

<template>
  <Navbar />
  <Section>
    <div class="max-w-md w-full bg-white p-8 rounded-lg shadow">
      <h2 class="text-xl font-bold mb-6">Reset Password</h2>
      <input
        v-model="password"
        type="password"
        placeholder="Password baru"
        class="border p-2 mb-4 w-full"
      />
      <input
        v-model="confirmPassword"
        type="password"
        placeholder="Konfirmasi password"
        class="border p-2 mb-4 w-full"
      />
      <button @click="reset" class="bg-blue-500 text-white p-2 rounded">
        Reset
      </button>
      <p v-if="message" class="text-green-500 mt-4">{{ message }}</p>
      <p v-if="error" class="text-red-500 mt-4">{{ error }}</p>
    </div>
  </Section>
  <Footer />
</template>
