
export const useScoreLatihan = (answer) => {
    const evaluasiStore = useEvaluasiStore()

    const totalAnswer = answer.length
    const trueAnswer = answer.filter(item => item.benar == true)
    const totalTrueAnswer = answer.filter(item => item.benar == true).length
    const totalFalseAnswer = answer.filter(item => item.benar == false).length

    const score = (totalTrueAnswer / totalAnswer) * 100

    evaluasiStore.setScore(score, totalTrueAnswer, totalFalseAnswer, totalAnswer)
    
    navigateTo('/evaluasi')
}