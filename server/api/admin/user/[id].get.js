import prisma from "../../../prisma/client.js"

export default defineEventHandler(async (event) => {
  const id = parseInt(event.context.params.id)
  if (isNaN(id)) {
    throw createError({ statusCode: 400, statusMessage: 'ID tidak valid.' })
  }

  const user = await prisma.user.findUnique({
    where: { id },
    select: {
      id: true,
      username: true,
      email: true,
      role: true,
      isActive: true,
      provider: true,
      thetaGlobal: true,
      createAt: true,
      userProfile: true,
      subscriptions: { orderBy: { expiredAt: 'desc' } },
      paymentsSnbt: { orderBy: { createdAt: 'desc' }, take: 20 },
      paymentProduct: { orderBy: { createdAt: 'desc' }, take: 20 },
    },
  })

  if (!user) {
    throw createError({ statusCode: 404, statusMessage: 'User tidak ditemukan.' })
  }

  return {
    statusCode: 200,
    data: user,
  }
})
