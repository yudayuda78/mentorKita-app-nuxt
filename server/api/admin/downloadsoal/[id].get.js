import prisma from "../../../prisma/client.js"

export default defineEventHandler(async (event) => {
  const id = parseInt(event.context.params.id)
  if (isNaN(id)) {
    throw createError({ statusCode: 400, statusMessage: 'ID tidak valid.' })
  }

  const data = await prisma.downloadSoal.findUnique({ where: { id } })
  if (!data) {
    throw createError({ statusCode: 404, statusMessage: 'Download soal tidak ditemukan.' })
  }

  return {
    statusCode: 200,
    data,
  }
})
