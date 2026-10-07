import prisma from "../../../../prisma/client.js"

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const miniQuizId = parseInt(body.miniQuizId)

  if (!miniQuizId || isNaN(miniQuizId)) {
    throw createError({ statusCode: 400, statusMessage: 'miniQuizId diperlukan' })
  }

  const data = buildMiniquizSoalData(body)
  if (!data.question) {
    throw createError({ statusCode: 400, statusMessage: 'Pertanyaan wajib diisi' })
  }
  if (!data.correctOption) {
    throw createError({ statusCode: 400, statusMessage: 'Jawaban benar wajib diisi' })
  }

  const soal = await prisma.soalMiniQuiz.create({
    data: {
      ...data,
      miniQuiz: { connect: { id: miniQuizId } },
    },
  })

  return {
    statusCode: 200,
    message: 'Soal berhasil ditambahkan',
    data: soal,
  }
})
