import prisma from "../../../../prisma/client.js"

export default defineEventHandler(async (event) => {
  const id = parseInt(event.context.params.id)
  if (isNaN(id)) {
    throw createError({ statusCode: 400, statusMessage: 'ID tidak valid' })
  }

  const soal = await prisma.snbtSoal.findUnique({ where: { id } })
  if (!soal) {
    throw createError({ statusCode: 404, statusMessage: 'Soal tidak ditemukan' })
  }

  try {
    await prisma.answerSnbtUser.deleteMany({ where: { soalId: id } })
    await prisma.snbtSoal.delete({ where: { id } })

    return {
      statusCode: 200,
      message: 'Soal dan jawaban terkait berhasil dihapus',
    }
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Gagal menghapus soal: ' + error.message,
    })
  }
})
