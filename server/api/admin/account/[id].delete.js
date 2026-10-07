import prisma from "../../../prisma/client.js"

export default defineEventHandler(async (event) => {
  const id = parseInt(event.context.params.id)
  if (isNaN(id)) {
    throw createError({ statusCode: 400, statusMessage: 'ID tidak valid.' })
  }

  const current = event.context.admin
  if (current && current.id === id) {
    throw createError({ statusCode: 400, statusMessage: 'Tidak bisa menghapus akun sendiri.' })
  }

  const target = await prisma.admin.findUnique({ where: { id } })
  if (!target) {
    throw createError({ statusCode: 404, statusMessage: 'Admin tidak ditemukan.' })
  }

  const total = await prisma.admin.count()
  if (total <= 1) {
    throw createError({ statusCode: 400, statusMessage: 'Minimal harus ada satu akun admin.' })
  }

  await prisma.admin.delete({ where: { id } })

  return {
    statusCode: 200,
    message: 'Akun admin berhasil dihapus',
  }
})
