import prisma from "../../../../prisma/client.js"

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const snbtMateriId = parseInt(body.snbtMateriId)

  if (!snbtMateriId || isNaN(snbtMateriId)) {
    throw createError({ statusCode: 400, statusMessage: 'snbtMateriId diperlukan' })
  }

  const data = buildSoalData(body)
  if (!data.question) {
    throw createError({ statusCode: 400, statusMessage: 'Pertanyaan wajib diisi' })
  }
  if (data.type === 'PILIHAN_GANDA' && !data.correctOption) {
    throw createError({ statusCode: 400, statusMessage: 'Kunci jawaban pilihan ganda wajib diisi' })
  }
  if (data.type === 'ESAI' && !data.correctEssay) {
    throw createError({ statusCode: 400, statusMessage: 'Kunci jawaban esai wajib diisi' })
  }

  const soal = await prisma.snbtSoal.create({
    data: {
      ...data,
      snbtMateri: { connect: { id: snbtMateriId } },
    },
  })

  return {
    statusCode: 200,
    message: 'Soal berhasil ditambahkan',
    data: soal,
  }
})
