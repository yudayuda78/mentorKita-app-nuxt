import prisma from "../../../prisma/client.js"

export default defineEventHandler(async (event) => {
  const id = parseInt(event.context.params.id)
  if (isNaN(id)) {
    throw createError({ statusCode: 400, statusMessage: 'ID tidak valid.' })
  }

  const data = await prisma.blog.findUnique({ where: { id } })
  if (!data) {
    throw createError({ statusCode: 404, statusMessage: 'Artikel tidak ditemukan.' })
  }

  await prisma.blog.delete({ where: { id } })

  return {
    statusCode: 200,
    message: 'Artikel berhasil dihapus',
  }
})
