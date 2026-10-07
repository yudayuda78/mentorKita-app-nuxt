import prisma from "../../../prisma/client.js"

export default defineEventHandler(async (event) => {
  const id = parseInt(event.context.params.id)
  if (isNaN(id)) {
    throw createError({ statusCode: 400, statusMessage: 'ID tidak valid.' })
  }

  const sub = await prisma.subscription.findUnique({ where: { id } })
  if (!sub) {
    throw createError({ statusCode: 404, statusMessage: 'Subscription tidak ditemukan.' })
  }

  await prisma.subscription.delete({ where: { id } })

  return {
    statusCode: 200,
    message: 'Subscription berhasil dihapus',
  }
})
