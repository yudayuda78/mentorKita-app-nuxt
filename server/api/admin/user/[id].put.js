import prisma from "../../../prisma/client.js"

export default defineEventHandler(async (event) => {
  const id = parseInt(event.context.params.id)
  if (isNaN(id)) {
    throw createError({ statusCode: 400, statusMessage: 'ID tidak valid.' })
  }

  const current = await prisma.user.findUnique({ where: { id } })
  if (!current) {
    throw createError({ statusCode: 404, statusMessage: 'User tidak ditemukan.' })
  }

  const body = await readBody(event)
  const { username, email, role, isActive } = body

  const data = {}

  if (username !== undefined && String(username).trim() !== current.username) {
    const uname = String(username).trim()
    if (!uname) throw createError({ statusCode: 400, statusMessage: 'Username tidak boleh kosong.' })
    const dup = await prisma.user.findUnique({ where: { username: uname } })
    if (dup && dup.id !== id) throw createError({ statusCode: 400, statusMessage: 'Username sudah dipakai.' })
    data.username = uname
  }

  if (email !== undefined && String(email).trim() !== current.email) {
    const mail = String(email).trim().toLowerCase()
    if (!mail) throw createError({ statusCode: 400, statusMessage: 'Email tidak boleh kosong.' })
    const dup = await prisma.user.findUnique({ where: { email: mail } })
    if (dup && dup.id !== id) throw createError({ statusCode: 400, statusMessage: 'Email sudah dipakai.' })
    data.email = mail
  }

  if (role !== undefined) data.role = String(role)
  if (isActive !== undefined) data.isActive = isActive === true || isActive === 'true'

  const updated = await prisma.user.update({
    where: { id },
    data,
    select: { id: true, username: true, email: true, role: true, isActive: true },
  })

  return {
    statusCode: 200,
    message: 'User berhasil diperbarui',
    data: updated,
  }
})
