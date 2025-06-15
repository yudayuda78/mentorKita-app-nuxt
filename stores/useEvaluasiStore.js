import { defineStore } from "pinia"

export const useEvaluasiStore = defineStore('evaluasi', () => {
    const score = ref(null)
  const benar = ref(0)
  const salah = ref(0)
  const total = ref(0)

    const setScore = (newScore, totalTrueAnswer, totalFalseAnswer, totalAnswer) => {
   score.value = newScore
    benar.value = totalTrueAnswer     // ✅ Gunakan nama parameter yang benar
    salah.value = totalFalseAnswer
    total.value = totalAnswer
}

    return {
        score,
  benar,
  salah,
  total,
  setScore
    }
  

})