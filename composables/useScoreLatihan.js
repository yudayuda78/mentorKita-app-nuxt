
export const useScoreLatihan = async(answer, materiId) => {
    const evaluasiStore = useEvaluasiStore()
    const authStore = useAuthStore()
    const totalAnswer = answer.length
    const trueAnswer = answer.filter(item => item.benar == true)
    const totalTrueAnswer = answer.filter(item => item.benar == true).length
    const totalFalseAnswer = answer.filter(item => item.benar == false).length

    const score = (totalTrueAnswer / totalAnswer) * 100

    evaluasiStore.setScore(score, totalTrueAnswer, totalFalseAnswer, totalAnswer)

    const userId = authStore.user.id

    try {
        await $fetch('/api/score-latihan', {
            method: 'POST',
            body: {
                userId,
                materiId,
                score: Math.round(score),
        },
    })

    
    // navigateTo('/evaluasi')
    } catch (err) {
        console.error('Gagal menyimpan score:', err)
    }
    
    // navigateTo('/evaluasi')
}