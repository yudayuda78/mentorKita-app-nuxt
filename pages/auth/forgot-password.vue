<script setup>


const email = ref('')
const message = ref('')
const error = ref('')


</script>

<template>
<navbar />
  <div>
    <h2>Lupa Password</h2>
    <input v-model="email" type="email" placeholder="Masukkan email" />
    <button @click="submit">Kirim Link Reset</button>
    <p v-if="message">{{ message }}</p>
    <p v-if="error" style="color: red">{{ error }}</p>
  </div>
</template>
