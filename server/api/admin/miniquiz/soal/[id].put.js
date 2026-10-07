import prisma from "../../../../prisma/client.js"

export default defineEventHandler(async (event) => {
  const id = parseInt(event.context.params.id)
  if (isNaN(id)) {
    throw createError({ statusCode: 400, statusMessage: 'ID tidak valid' })
  }

  const current = await prisma.soalMiniQuiz.findUnique({ where: { id } })
  if (!current) {
    throw createError({ statusCode: 404, statusMessage: 'Soal tidak ditemukan' })
  }

  const body = await readBody(event)
  const data = buildMiniquizSoalData(body, { partial: true })

  if (data.question !== undefined && !data.question) {
    throw createError({ statusCode: 400, statusMessage: 'Pertanyaan wajib diisi' })
  }

  const soal = await prisma.soalMiniQuiz.update({ where: { id }, data })

  return {
    statusCode: 200,
    message: 'Data berhasil diupdate',
    data: soal,
  }
})
