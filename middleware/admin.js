
export default defineNuxtRouteMiddleware(async (to, from) => {
  const nuxtApp = useNuxtApp()

  // Jalankan HANYA di client
  if (import.meta.client) {
    try {
      const { data } = await useFetch('/api/admin/me', {
        // penting agar cookie dikirim ke server
        credentials: 'include',
        headers: useRequestHeaders(['cookie']),
      })

      if (!data.value?.user) {
        return navigateTo('/mentorkita-admin/login')
      }
    } catch (err) {
      return navigateTo('/mentorkita-admin/login')
    }
  }
})
