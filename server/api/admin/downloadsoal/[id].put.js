import prisma from "../../../prisma/client.js"

export default defineEventHandler(async (event) => {
  const id = parseInt(event.context.params.id)
  if (isNaN(id)) {
    throw createError({ statusCode: 400, statusMessage: 'ID tidak valid.' })
  }

  const current = await prisma.downloadSoal.findUnique({ where: { id } })
  if (!current) {
    throw createError({ statusCode: 404, statusMessage: 'Download soal tidak ditemukan.' })
  }

  const body = await readBody(event)
  const { title, slug, description, fileUrl, thumbnail } = body

  const data = {}

  if (title !== undefined) {
    if (!String(title).trim()) {
      throw createError({ statusCode: 400, statusMessage: 'Judul wajib diisi.' })
    }
    data.title = String(title).trim()
  }

  if (fileUrl !== undefined) {
    if (!String(fileUrl).trim()) {
      throw createError({ statusCode: 400, statusMessage: 'URL file wajib diisi.' })
    }
    data.fileUrl = String(fileUrl).trim()
  }

  if (slug !== undefined && String(slug).trim()) {
    const base = generateSlug(slug)
    if (base !== current.slug) {
      data.slug = await uniqueSlug(base, (s) => prisma.downloadSoal.findUnique({ where: { slug: s } }), id)
    }
  }

  if (description !== undefined) data.description = description || null
  if (thumbnail !== undefined) data.thumbnail = thumbnail || null

  const updated = await prisma.downloadSoal.update({ where: { id }, data })

  return {
    statusCode: 200,
    message: 'Download soal berhasil diperbarui',
    data: updated,
  }
})
