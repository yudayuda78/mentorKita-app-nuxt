import bcrypt from 'bcrypt'
import prisma from "../../../prisma/client.js"

export default defineEventHandler(async (event) => {
  const id = parseInt(event.context.params.id)
  if (isNaN(id)) {
    throw createError({ statusCode: 400, statusMessage: 'ID tidak valid.' })
  }

  const current = await prisma.admin.findUnique({ where: { id } })
  if (!current) {
    throw createError({ statusCode: 404, statusMessage: 'Admin tidak ditemukan.' })
  }

  const body = await readBody(event)
  const { username, password, role } = body

  const data = {}

  if (username !== undefined && String(username).trim() !== current.username) {
    const uname = String(username).trim()
    if (!uname) throw createError({ statusCode: 400, statusMessage: 'Username tidak boleh kosong.' })
    const dup = await prisma.admin.findUnique({ where: { username: uname } })
    if (dup && dup.id !== id) throw createError({ statusCode: 400, statusMessage: 'Username sudah dipakai.' })
    data.username = uname
  }

  if (role !== undefined) data.role = String(role)

  if (password !== undefined && String(password).length) {
    if (String(password).length < 6) {
      throw createError({ statusCode: 400, statusMessage: 'Password minimal 6 karakter.' })
    }
    data.password = await bcrypt.hash(String(password), 10)
  }

  const updated = await prisma.admin.update({
    where: { id },
    data,
    select: { id: true, username: true, role: true },
  })

  return {
    statusCode: 200,
    message: 'Akun admin berhasil diperbarui',
    data: updated,
  }
})
