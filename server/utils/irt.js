// utils/irt.ts
export async function updateSoalDifficulty() {
  const soalList = await prisma.snbtSoal.findMany()

  for (const soal of soalList) {
    const total = await prisma.answerSnbtUser.count({
      where: { soalId: soal.id }
    })

    const benar = await prisma.answerSnbtUser.count({
      where: { soalId: soal.id, benar: true }
    })

    if (total === 0) continue // hindari 0/0

    const difficulty = parseFloat((1 - benar / total).toFixed(2))

    await prisma.snbtSoal.update({
      where: { id: soal.id },
      data: { difficulty }
    })
  }
}
