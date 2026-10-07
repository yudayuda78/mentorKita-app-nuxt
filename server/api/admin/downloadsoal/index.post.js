import prisma from "../../../prisma/client.js"

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { title, slug, description, fileUrl, thumbnail } = body

  if (!title || !String(title).trim()) {
    throw createError({ statusCode: 400, statusMessage: 'Judul wajib diisi.' })
  }
  if (!fileUrl || !String(fileUrl).trim()) {
    throw createError({ statusCode: 400, statusMessage: 'URL file wajib diisi.' })
  }

  const base = generateSlug(slug || title)
  const finalSlug = await uniqueSlug(base, (s) => prisma.downloadSoal.findUnique({ where: { slug: s } }))

  const data = await prisma.downloadSoal.create({
    data: {
      title: String(title).trim(),
      slug: finalSlug,
      description: description || null,
      fileUrl: String(fileUrl).trim(),
      thumbnail: thumbnail || null,
    },
  })

  return {
    statusCode: 200,
    message: 'Download soal berhasil ditambahkan',
    data,
  }
})
