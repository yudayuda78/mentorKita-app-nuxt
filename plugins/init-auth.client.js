export default defineNuxtPlugin(async () => {
  const auth = useAuthStore()

  if (!auth.user) {
    try {
      const data = await $fetch('/api/me') // token dari cookie akan ikut
      auth.user = data.user
    } catch (err) {
      auth.user = null
    }
  }
})
