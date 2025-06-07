import { defineStore } from 'pinia'


export const useLatihanStore = defineStore('latihan', () => {
   const latihanData = ref()


 const latihanFetch = async () => {
    try {
      const res = await $fetch('/api/latihan')
      latihanData.value = res.data
      console.log('latihanData:', latihanData.value)
    } catch (e) {
      console.error('Fetch error:', e)
    }
  }
  return {
    latihanData,
    latihanFetch
  }
})
