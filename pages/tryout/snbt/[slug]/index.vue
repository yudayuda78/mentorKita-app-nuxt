<script setup>
const route = useRoute();
const store = useSnbtStore();
const useAuth = useAuthStore();
const userId = computed(() => useAuth.user?.id || "");
const subscriptionStore = useSubscriptionStore();

const expiredAt = ref(null);
const hasSubscription = ref(false);

const isExpired = computed(() => {
  if (!hasSubscription.value) return true // ✅ Anggap expired jika tidak punya subscription
  if (!expiredAt.value) return true       // ✅ Anggap expired jika tidak ada tanggal expired
  return new Date(expiredAt.value) < new Date()
})

console.log("isExpired:", isExpired.value);


onMounted(async () => {
  await store.snbtSlug(route.params.slug);
  await subscriptionStore.getSubscriptionDetails(userId.value);
  const detail = subscriptionStore.subscriptionDetail

  if (detail && detail.expiredAt) {
    hasSubscription.value = true
    expiredAt.value = detail.expiredAt
  } else {
    hasSubscription.value = false
  }

  console.log("expiredAt:", expiredAt.value)
});
</script>

<template>
  <Navbar />
  <Section>
    <div v-if="isExpired" class="text-center text-red-500">
      Subscription has expired
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
