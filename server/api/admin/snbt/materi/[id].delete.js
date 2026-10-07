import prisma from "../../../../prisma/client.js"

export default defineEventHandler(async (event) => {
  const id = parseInt(event.context.params.id)
  if (isNaN(id)) {
    throw createError({ statusCode: 400, statusMessage: 'ID tidak valid' })
  }

  const materi = await prisma.snbtTryoutMateri.findUnique({ where: { id } })
  if (!materi) {
    throw createError({ statusCode: 404, statusMessage: 'Materi tidak ditemukan' })
  }

  try {
    const soal = await prisma.snbtSoal.findMany({
      where: { snbtMateriId: id },
      select: { id: true },
    })
    const soalIds = soal.map((s) => s.id)

    if (soalIds.length) {
      await prisma.answerSnbtUser.deleteMany({ where: { soalId: { in: soalIds } } })
      await prisma.snbtSoal.deleteMany({ where: { id: { in: soalIds } } })
    }

    // Hapus skor yang menunjuk ke materi ini
    await prisma.scoreSnbt.deleteMany({ where: { materiId: id } })

    await prisma.snbtTryoutMateri.delete({ where: { id } })

    return {
      statusCode: 200,
      message: 'Materi dan semua data terkait (Soal, Jawaban, Skor) berhasil dihapus',
    }
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Gagal menghapus materi: ' + error.message,
    })
  }
})
