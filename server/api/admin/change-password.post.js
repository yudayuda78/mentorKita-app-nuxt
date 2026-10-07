import bcrypt from 'bcrypt'
import prisma from "../../prisma/client.js"

export default defineEventHandler(async (event) => {
  const admin = await requireAdmin(event)

  const body = await readBody(event)
  const { currentPassword, newPassword } = body

  if (!currentPassword || !newPassword) {
    throw createError({ statusCode: 400, statusMessage: 'Password lama dan baru wajib diisi.' })
  }
  if (String(newPassword).length < 6) {
    throw createError({ statusCode: 400, statusMessage: 'Password baru minimal 6 karakter.' })
  }

  const record = await prisma.admin.findUnique({ where: { id: admin.id } })
  if (!record) {
    throw createError({ statusCode: 404, statusMessage: 'Admin tidak ditemukan.' })
  }

  const valid = await bcrypt.compare(String(currentPassword), record.password)
  if (!valid) {
    throw createError({ statusCode: 400, statusMessage: 'Password lama salah.' })
  }

  await prisma.admin.update({
    where: { id: admin.id },
    data: { password: await bcrypt.hash(String(newPassword), 10) },
  })

  return {
    statusCode: 200,
    message: 'Password berhasil diubah',
  }
})
