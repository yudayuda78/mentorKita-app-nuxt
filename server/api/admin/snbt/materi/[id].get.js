import prisma from "../../../../prisma/client.js"

export default defineEventHandler(async (event) => {
  const id = parseInt(event.context.params.id)
  if (isNaN(id)) {
    throw createError({ statusCode: 400, statusMessage: 'ID tidak valid' })
  }

  const materi = await prisma.snbtTryoutMateri.findUnique({
    where: { id },
    include: { tryout: true, snbtSoal: { orderBy: { id: 'asc' } } },
  })

  if (!materi) {
    throw createError({ statusCode: 404, statusMessage: 'Materi tidak ditemukan' })
  }

  return {
    statusCode: 200,
    data: materi,
  }
})
