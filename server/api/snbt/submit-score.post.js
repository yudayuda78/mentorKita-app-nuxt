
export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { userId, materiId } = body

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

  return { success: true, score: saved }
})
