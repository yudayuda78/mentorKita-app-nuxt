import prisma from "../../../prisma/client.js"

function generateSlug(name) {
  return String(name)
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
}

export default defineEventHandler(async (event) => {
  const id = parseInt(event.context.params.id)
  if (isNaN(id)) {
    throw createError({ statusCode: 400, statusMessage: 'ID tidak valid.' })
  }

  const current = await prisma.snbtTryout.findUnique({ where: { id } })
  if (!current) {
    throw createError({ statusCode: 404, statusMessage: 'Tryout tidak ditemukan.' })
  }

  const body = await readBody(event)
  const { name, slug, price, isfree, isclosed, marketing, image, startedAt, endedAt } = body

  const data = {}

  if (name !== undefined) {
    if (!String(name).trim()) {
      throw createError({ statusCode: 400, statusMessage: 'Nama tryout wajib diisi.' })
    }
    data.name = String(name).trim()
  }

  if (slug !== undefined) {
    const finalSlug = generateSlug(slug)
    if (!finalSlug) {
      throw createError({ statusCode: 400, statusMessage: 'Slug tidak valid.' })
    }
    if (finalSlug !== current.slug) {
      const existing = await prisma.snbtTryout.findUnique({ where: { slug: finalSlug } })
      if (existing) {
        throw createError({ statusCode: 400, statusMessage: `Slug '${finalSlug}' sudah dipakai.` })
      }
    }
    data.slug = finalSlug
  }

  const free = isfree !== undefined ? (isfree === true || isfree === 'true') : current.isfree
  if (isfree !== undefined) data.isfree = free

  if (isfree !== undefined || price !== undefined) {
    data.price = free
      ? null
      : (price !== undefined && price !== null && price !== '' ? parseInt(price) : current.price)
  }

  if (isclosed !== undefined) data.isclosed = isclosed === true || isclosed === 'true'
  if (marketing !== undefined) data.marketing = marketing || null
  if (image !== undefined) data.image = image || null
  if (startedAt !== undefined) data.startedAt = startedAt ? new Date(startedAt) : current.startedAt
  if (endedAt !== undefined) data.endedAt = endedAt ? new Date(endedAt) : current.endedAt

  const updated = await prisma.snbtTryout.update({
    where: { id },
    data,
  })

  return {
    statusCode: 200,
    message: 'Data berhasil diupdate',
    data: updated,
  }
})
