import prisma from "../../../prisma/client.js"

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const userId = parseInt(body.userId)
  const days = parseInt(body.days) || 90

  if (!userId || isNaN(userId)) {
    throw createError({ statusCode: 400, statusMessage: 'userId wajib diisi.' })
  }

  const user = await prisma.user.findUnique({ where: { id: userId } })
  if (!user) {
    throw createError({ statusCode: 404, statusMessage: 'User tidak ditemukan.' })
  }

  const now = new Date()
  const existing = await prisma.subscription.findFirst({
    where: { userId, isActive: true, expiredAt: { gt: now } },
  })

  if (existing) {
    const newExpired = new Date(existing.expiredAt)
    newExpired.setDate(newExpired.getDate() + days)
    const updated = await prisma.subscription.update({
      where: { id: existing.id },
      data: { expiredAt: newExpired },
    })
    return { statusCode: 200, message: `Langganan diperpanjang ${days} hari`, data: updated }
  }

  const expiredAt = new Date()
  expiredAt.setDate(now.getDate() + days)
  const created = await prisma.subscription.create({
    data: { userId, startedAt: now, expiredAt, isActive: true },
  })

  return { statusCode: 200, message: `Langganan dibuat ${days} hari`, data: created }
})
