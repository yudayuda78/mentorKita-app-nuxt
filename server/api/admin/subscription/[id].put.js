import prisma from "../../../prisma/client.js"

export default defineEventHandler(async (event) => {
  const id = parseInt(event.context.params.id)
  if (isNaN(id)) {
    throw createError({ statusCode: 400, statusMessage: 'ID tidak valid.' })
  }

  const current = await prisma.subscription.findUnique({ where: { id } })
  if (!current) {
    throw createError({ statusCode: 404, statusMessage: 'Subscription tidak ditemukan.' })
  }

  const body = await readBody(event)
  const { isActive, expiredAt, days } = body

  const data = {}

  if (isActive !== undefined) data.isActive = isActive === true || isActive === 'true'

  if (expiredAt !== undefined) {
    data.expiredAt = new Date(expiredAt)
  } else if (days !== undefined && parseInt(days) !== 0) {
    const base = new Date(current.expiredAt) > new Date() ? new Date(current.expiredAt) : new Date()
    base.setDate(base.getDate() + parseInt(days))
    data.expiredAt = base
  }

  const updated = await prisma.subscription.update({ where: { id }, data })

  return {
    statusCode: 200,
    message: 'Subscription berhasil diperbarui',
    data: updated,
  }
})
