export async function updateSoalDifficulty() {
  const soalList = await prisma.snbtSoal.findMany()

  for (const soal of soalList) {
    const total = await prisma.answerSnbtUser.count({
      where: { soalId: soal.id },
    })

    const benar = await prisma.answerSnbtUser.count({
      where: { soalId: soal.id, benar: true },
    })

    if (total === 0) continue

    const difficulty = parseFloat((1 - benar / total).toFixed(2))

    await prisma.snbtSoal.update({
      where: { id: soal.id },
      data: { difficulty },
    })
  }
}

export async function calculateIRTScore(userId, materiId) {
  const jawaban = await prisma.answerSnbtUser.findMany({
    where: {
      userId,
      soal: { snbtMateriId: materiId },
    },
    include: { soal: true },
  })

  let score = 0
  for (const j of jawaban) {
    if (j.benar) {
      const bobot = j.soal.difficulty ?? 0.5
      score += bobot
    }
  }

  return parseFloat(score.toFixed(2))
}