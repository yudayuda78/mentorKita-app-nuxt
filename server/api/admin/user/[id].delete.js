import prisma from "../../../prisma/client.js"

export default defineEventHandler(async (event) => {
  const id = parseInt(event.context.params.id)
  if (isNaN(id)) {
    throw createError({ statusCode: 400, statusMessage: 'ID tidak valid.' })
  }

  const user = await prisma.user.findUnique({ where: { id } })
  if (!user) {
    throw createError({ statusCode: 404, statusMessage: 'User tidak ditemukan.' })
  }

  // Soft delete: nonaktifkan akun
  const updated = await prisma.user.update({
    where: { id },
    data: { isActive: false },
    select: { id: true, username: true, isActive: true },
  })

  return {
    statusCode: 200,
    message: 'User dinonaktifkan',
    data: updated,
  }
})
