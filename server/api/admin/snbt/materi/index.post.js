import prisma from "../../../../prisma/client.js"

const VALID_TYPES = ['TES_PORTENSI_SKOLASTIK', 'TES_LITERASI']

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { name, time, type, tryoutId } = body

  if (!tryoutId) {
    throw createError({ statusCode: 400, statusMessage: 'tryoutId diperlukan' })
  }
  if (!name || !String(name).trim()) {
    throw createError({ statusCode: 400, statusMessage: 'Nama materi wajib diisi' })
  }

  const parsedTime = parseInt(time)
  if (!parsedTime || parsedTime <= 0) {
    throw createError({ statusCode: 400, statusMessage: 'Durasi (time) wajib diisi dan lebih dari 0' })
  }

  const materi = await prisma.snbtTryoutMateri.create({
    data: {
      name: String(name).trim(),
      time: parsedTime,
      type: VALID_TYPES.includes(type) ? type : 'TES_PORTENSI_SKOLASTIK',
      tryout: { connect: { id: parseInt(tryoutId) } },
    },
  })

  return {
    statusCode: 200,
    message: 'Materi berhasil ditambahkan',
    data: materi,
  }
})
