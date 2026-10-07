import prisma from "../../../prisma/client.js"

export default defineEventHandler(async (event) => {
  const id = parseInt(event.context.params.id)
  if (isNaN(id)) {
    throw createError({ statusCode: 400, statusMessage: 'ID tidak valid.' })
  }

  const tryout = await prisma.snbtTryout.findUnique({
    where: { id },
    include: { tryoutMateri: { orderBy: { id: 'asc' } } },
  })

  if (!tryout) {
    throw createError({ statusCode: 404, statusMessage: 'Tryout tidak ditemukan.' })
  }

  return {
    statusCode: 200,
    data: tryout,
  }
})
