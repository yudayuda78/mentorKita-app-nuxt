export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { userId, materiId } = body

  if (!userId || !materiId) {
    throw createError({
      statusCode: 400,
      statusMessage: 'UserId atau MateriId tidak lengkap',
    })
  }

  const score = await calculateIRTScore(userId, materiId)

  const saved = await prisma.scoreLatihan.create({
    data: {
      userId,
      materiId,
      score,
    },
  })

  return { success: true, score: saved }
})