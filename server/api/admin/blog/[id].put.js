import prisma from "../../../prisma/client.js"

export default defineEventHandler(async (event) => {
  const id = parseInt(event.context.params.id)
  if (isNaN(id)) {
    throw createError({ statusCode: 400, statusMessage: 'ID tidak valid.' })
  }

  const current = await prisma.blog.findUnique({ where: { id } })
  if (!current) {
    throw createError({ statusCode: 404, statusMessage: 'Artikel tidak ditemukan.' })
  }

  const body = await readBody(event)
  const { title, slug, excerpt, artikel, thumbnail } = body

  const data = {}

  if (title !== undefined) {
    if (!String(title).trim()) {
      throw createError({ statusCode: 400, statusMessage: 'Judul wajib diisi.' })
    }
    data.title = String(title).trim()
  }

  if (artikel !== undefined) {
    if (!String(artikel).trim()) {
      throw createError({ statusCode: 400, statusMessage: 'Isi artikel wajib diisi.' })
    }
    data.artikel = String(artikel)
  }

  if (slug !== undefined && String(slug).trim()) {
    const base = generateSlug(slug)
    if (base !== current.slug) {
      data.slug = await uniqueSlug(base, (s) => prisma.blog.findUnique({ where: { slug: s } }), id)
    }
  }

  if (excerpt !== undefined) data.excerpt = excerpt || null
  if (thumbnail !== undefined) data.thumbnail = thumbnail || null

  const updated = await prisma.blog.update({ where: { id }, data })

  return {
    statusCode: 200,
    message: 'Artikel berhasil diperbarui',
    data: updated,
  }
})
