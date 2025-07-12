
export default defineEventHandler(async (event) => {
  const body = await readBody(event)
 const { userId: rawUserId, materiId: rawMateriId } = await readBody(event)
  const userId = Number(rawUserId)
const materiId = Number(rawMateriId)

  if (!userId || !materiId) {
    throw createError({
      statusCode: 400,
      statusMessage: 'UserId atau MateriId tidak lengkap',
    })
  }

  const rawScore = await calculateIRTScore(userId, materiId)
  

  // Amankan jika NaN
  const score = isNaN(rawScore) ? 200 : Math.round(rawScore)

  const saved = await prisma.scoreSnbt.upsert({
    where: {
      userId_materiId: {
        userId,
        materiId,
      },
    },
    update: { score },
    create: {
      userId,
      materiId,
      score,
    },
  })

   await updateSoalDifficulty(materiId)
  return { success: true, score: saved }
})
