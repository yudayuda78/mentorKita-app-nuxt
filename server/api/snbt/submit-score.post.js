import { averageScore } from "~/server/utils/irt"

export default defineEventHandler(async (event) => {
 
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

let { score, rawScore, theta } = await calculateIRTScore(userId, materiId)
if (isNaN(score)) score = 200

  const saved = await prisma.scoreSnbt.upsert({
  where: {
    userId_materiId: {
      userId,
      materiId,
    },
  },
  update: {
    score,
    rawScore,
    theta,
    type: materiType,
  },
  create: {
    userId,
    snbtTryoutId: tryoutId,
    materiId,
    score,
    rawScore,
    theta,
    type: materiType,
  },
});


   await updateSoalDifficulty(materiId)
   await averageglobaltheta(userId)
   await finalScore(userId, tryoutId)
   await averageScore(userId)
  return { success: true, score: saved }
})
