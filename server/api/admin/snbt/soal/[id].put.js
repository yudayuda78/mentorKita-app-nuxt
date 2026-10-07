import prisma from "../../../../prisma/client.js"

export default defineEventHandler(async (event) => {
  const id = parseInt(event.context.params.id)
  if (isNaN(id)) {
    throw createError({ statusCode: 400, statusMessage: 'ID tidak valid' })
  }

  const current = await prisma.snbtSoal.findUnique({ where: { id } })
  if (!current) {
    throw createError({ statusCode: 404, statusMessage: 'Soal tidak ditemukan' })
  }

  const body = await readBody(event)
  const data = buildSoalData(body, { partial: true })

  const finalType = data.type ?? current.type
  if (data.question !== undefined && !data.question) {
    throw createError({ statusCode: 400, statusMessage: 'Pertanyaan wajib diisi' })
  }
  if (finalType === 'PILIHAN_GANDA' && data.correctOption === null && body.correctOption !== undefined) {
    throw createError({ statusCode: 400, statusMessage: 'Kunci jawaban pilihan ganda wajib diisi' })
  }

  const soal = await prisma.snbtSoal.update({ where: { id }, data })

  return {
    statusCode: 200,
    message: 'Data berhasil diupdate',
    data: soal,
  }
})
