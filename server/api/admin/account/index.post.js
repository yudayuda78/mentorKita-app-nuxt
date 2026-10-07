import bcrypt from 'bcrypt'
import prisma from "../../../prisma/client.js"

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { username, password, role } = body

  if (!username || !String(username).trim()) {
    throw createError({ statusCode: 400, statusMessage: 'Username wajib diisi.' })
  }
  if (!password || String(password).length < 6) {
    throw createError({ statusCode: 400, statusMessage: 'Password minimal 6 karakter.' })
  }

  const uname = String(username).trim()
  const existing = await prisma.admin.findUnique({ where: { username: uname } })
  if (existing) {
    throw createError({ statusCode: 400, statusMessage: 'Username sudah dipakai.' })
  }

  const data = await prisma.admin.create({
    data: {
      username: uname,
      password: await bcrypt.hash(String(password), 10),
      role: role || 'admin',
    },
    select: { id: true, username: true, role: true },
  })

  return {
    statusCode: 200,
    message: 'Akun admin berhasil dibuat',
    data,
  }
})
