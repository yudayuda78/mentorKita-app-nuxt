// middleware/auth.ts
export default defineNuxtRouteMiddleware(async (to, from) => {
  const nuxtApp = useNuxtApp()

  // Jalankan HANYA di client
 
    try {
      const { data } = await useFetch('/api/me', {
        // penting agar cookie dikirim ke server
        credentials: 'include',
        headers: useRequestHeaders(['cookie']),
      })

      if (!data.value?.user) {
        return navigateTo('/login')
      }
    } catch (err) {
      return navigateTo('/login')
    }
  
})
