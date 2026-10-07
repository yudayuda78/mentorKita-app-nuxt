import bcrypt from 'bcrypt'
import prisma from "../../../../prisma/client.js"

export default defineEventHandler(async (event) => {
  const id = parseInt(event.context.params.id)
  if (isNaN(id)) {
    throw createError({ statusCode: 400, statusMessage: 'ID tidak valid.' })
  }

  const user = await prisma.user.findUnique({ where: { id } })
  if (!user) {
    throw createError({ statusCode: 404, statusMessage: 'User tidak ditemukan.' })
  }

  const body = await readBody(event)
  const { password } = body

  if (!password || String(password).length < 6) {
    throw createError({ statusCode: 400, statusMessage: 'Password minimal 6 karakter.' })
  }

  const hashed = await bcrypt.hash(String(password), 10)
  await prisma.user.update({ where: { id }, data: { password: hashed } })

  return {
    statusCode: 200,
    message: 'Password user berhasil direset',
  }
})
