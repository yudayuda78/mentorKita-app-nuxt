import prisma from "../../../prisma/client.js"

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { title, slug, excerpt, artikel, thumbnail } = body

  if (!title || !String(title).trim()) {
    throw createError({ statusCode: 400, statusMessage: 'Judul wajib diisi.' })
  }
  if (!artikel || !String(artikel).trim()) {
    throw createError({ statusCode: 400, statusMessage: 'Isi artikel wajib diisi.' })
  }

  const base = generateSlug(slug || title)
  const finalSlug = await uniqueSlug(base, (s) => prisma.blog.findUnique({ where: { slug: s } }))

  const data = await prisma.blog.create({
    data: {
      title: String(title).trim(),
      slug: finalSlug,
      excerpt: excerpt || null,
      artikel: String(artikel),
      thumbnail: thumbnail || null,
    },
  })

  return {
    statusCode: 200,
    message: 'Artikel berhasil ditambahkan',
    data,
  }
})
