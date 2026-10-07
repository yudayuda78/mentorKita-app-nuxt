import prisma from "../../../../prisma/client.js"

const VALID_TYPES = ['TES_PORTENSI_SKOLASTIK', 'TES_LITERASI']

export default defineEventHandler(async (event) => {
  const id = parseInt(event.context.params.id)
  if (isNaN(id)) {
    throw createError({ statusCode: 400, statusMessage: 'ID tidak valid' })
  }

  const body = await readBody(event)
  const { name, time, type } = body

  const data = {}

  if (name !== undefined) {
    if (!String(name).trim()) {
      throw createError({ statusCode: 400, statusMessage: 'Nama materi wajib diisi' })
    }
    data.name = String(name).trim()
  }

  if (time !== undefined) {
    const parsedTime = parseInt(time)
    if (!parsedTime || parsedTime <= 0) {
      throw createError({ statusCode: 400, statusMessage: 'Durasi (time) harus lebih dari 0' })
    }
    data.time = parsedTime
  }

  if (type !== undefined && VALID_TYPES.includes(type)) {
    data.type = type
  }

  const materi = await prisma.snbtTryoutMateri.update({
    where: { id },
    data,
  })

  return {
    statusCode: 200,
    message: 'Data berhasil diupdate',
    data: materi,
  }
})
