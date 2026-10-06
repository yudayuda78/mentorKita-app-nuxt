import prisma from "../../../prisma/client.js"

export default defineEventHandler(async (event) => {
  const id = parseInt(event.context.params.id)
  if (isNaN(id)) {
    throw createError({ statusCode: 400, statusMessage: 'ID tidak valid.' })
  }

  const tryout = await prisma.snbtTryout.findUnique({ where: { id } })
  if (!tryout) {
    throw createError({ statusCode: 404, statusMessage: 'Tryout tidak ditemukan.' })
  }

  try {
    // 1. Ambil semua materi milik tryout ini
    const materi = await prisma.snbtTryoutMateri.findMany({
      where: { tryoutId: id },
      select: { id: true },
    })
    const materiIds = materi.map((m) => m.id)

    // 2. Ambil semua soal dari materi tersebut
    let soalIds = []
    if (materiIds.length) {
      const soal = await prisma.snbtSoal.findMany({
        where: { snbtMateriId: { in: materiIds } },
        select: { id: true },
      })
      soalIds = soal.map((s) => s.id)
    }

    // 3. Hapus jawaban user
    if (soalIds.length) {
      await prisma.answerSnbtUser.deleteMany({ where: { soalId: { in: soalIds } } })
    }

    // 4. Hapus data terkait tryout
    await prisma.scoreSnbt.deleteMany({ where: { snbtTryoutId: id } })
    await prisma.snbtFinalScore.deleteMany({ where: { snbtTryoutId: id } })
    await prisma.paymentSnbtTryout.deleteMany({ where: { snbtTryoutId: id } })
    await prisma.enrollmentSnbtTryout.deleteMany({ where: { snbtTryoutId: id } })
    await prisma.shareSnbt.deleteMany({ where: { snbtTryoutId: id } })
    await prisma.clickSnbtTryout.deleteMany({ where: { snbtTryoutId: id } })

    // 5. Hapus soal & materi
    if (soalIds.length) {
      await prisma.snbtSoal.deleteMany({ where: { id: { in: soalIds } } })
    }
    if (materiIds.length) {
      await prisma.snbtTryoutMateri.deleteMany({ where: { id: { in: materiIds } } })
    }

    // 6. Hapus tryout
    await prisma.snbtTryout.delete({ where: { id } })

    return {
      statusCode: 200,
      message: 'Tryout dan semua data terkait berhasil dihapus',
    }
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Gagal menghapus tryout: ' + error.message,
    })
  }
})
