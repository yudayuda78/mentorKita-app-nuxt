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

    const difficulty = parseFloat((1 - benar / total).toFixed(2)) // b
    const discrimination = 1.0 // a, bisa dibuat lebih dinamis nanti

    await prisma.snbtSoal.update({
      where: { id: soal.id },
      data: { difficulty, discrimination },
    })
  }
}

export async function calculateIRTScore(userId, materiId) {
    const jawaban = await prisma.answerSnbtUser.findMany({
    where: {
      userId: Number(userId),
      soal: {
        snbtMateriId: Number(materiId),
      },
    },
    include: {
      soal: true,
    },
  })

  const theta = 0.0
  let score = 0

  for (const j of jawaban) {
    const soal = j.soal
    const a = soal.discrimination ?? 1.0
    const b = soal.difficulty ?? 0.5
    const c = soal.guessing ?? 0.2

    const p = c + ((1 - c) / (1 + Math.exp(-a * (theta - b))))

    if (j.benar) {
      score += p
    }
  }

  // 🎯 Normalisasi ke skala 200 - 900
  const minRaw = 0
  const maxRaw = jawaban.length // maksimal skor mentah (jika semua benar)
  const normScore = 200 + ((score - minRaw) / (maxRaw - minRaw)) * 700

  return parseFloat(normScore.toFixed(2))
}
