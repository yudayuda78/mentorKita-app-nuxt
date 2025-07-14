
export default defineEventHandler(async (event) => {
  const body = await readBody(event)
 const { userId: rawUserId, materiId: rawMateriId, slug: rawSlug } = await readBody(event)
  const userId = Number(rawUserId)
const materiId = Number(rawMateriId)
const tryoutIdr = await prisma.snbtTryout.findUnique({
  where:{
    slug : rawSlug
  }
})

if (!tryoutIdr) {
  throw createError({
    statusCode: 404,
    message: "Tryout tidak ditemukan dari slug",
  })
}

const tryoutId = tryoutIdr.id

const tryoutMateri = await prisma.snbtTryoutMateri.findUnique({
  where: {
    id: materiId
  }
})

if(!tryoutMateri){
  throw createError({
    statusCode: 404,
    message: "Tryout Materi tidak ditemukan"
  })
}

const materiType = tryoutMateri.type

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
      snbtTryoutId: tryoutId,
      type: materiType,
      score,
    },
  })

   await updateSoalDifficulty(materiId)
  return { success: true, score: saved }
})
