import prisma from "../../../prisma/client.js"

export default defineEventHandler(async (event) => {
  const user = await getUserFromToken(event)
  if (!user) {
    throw createError({ statusCode: 401, statusMessage: 'Silakan login terlebih dahulu.' })
  }

  const query = getQuery(event)
  const snbtTryoutId = parseInt(query.snbtTryoutId)
  if (!snbtTryoutId || isNaN(snbtTryoutId)) {
    throw createError({ statusCode: 400, statusMessage: 'snbtTryoutId wajib diisi.' })
  }

  const payment = await prisma.paymentSnbtTryout.findFirst({
    where: { userId: user.id, snbtTryoutId },
  })

  return {
    status: 'success',
    data: {
      snbtTryoutId,
      isPaid: !!payment?.isPaid,
      paidAt: payment?.paidAt || null,
    },
  }
})
