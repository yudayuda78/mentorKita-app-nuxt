import prisma from "../../../../prisma/client.js"

export default defineEventHandler(async (event) => {
  const id = parseInt(event.context.params.id)
  if (isNaN(id)) {
    throw createError({ statusCode: 400, statusMessage: 'ID tidak valid' })
  }

  const soal = await prisma.soalMiniQuiz.findUnique({ where: { id } })
  if (!soal) {
    throw createError({ statusCode: 404, statusMessage: 'Soal tidak ditemukan' })
  }

  await prisma.soalMiniQuiz.delete({ where: { id } })

  return {
    statusCode: 200,
    message: 'Soal berhasil dihapus',
  }
})
