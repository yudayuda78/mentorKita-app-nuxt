export default defineNuxtRouteMiddleware(async (to, from) => {
  const nuxtApp = useNuxtApp()

  try {
    const { data } = await useFetch('/api/admin/me', {
      credentials: 'include',
      headers: useRequestHeaders(['cookie']),
    })

    if (!data.value?.admin) {
      return navigateTo('/mentorkita-admin/login')
    }
  } catch (err) {
    return navigateTo('/mentorkita-admin/login')
  }
})
