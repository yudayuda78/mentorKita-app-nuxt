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
  const body = await readBody(event)
  const { name, slug, price, isfree, isclosed, marketing, image, startedAt, endedAt } = body

  if (!name || !String(name).trim()) {
    throw createError({ statusCode: 400, statusMessage: 'Nama tryout wajib diisi.' })
  }

  let finalSlug = (slug && String(slug).trim()) ? generateSlug(slug) : generateSlug(name)
  if (!finalSlug) finalSlug = `tryout-${Date.now()}`

  const existing = await prisma.snbtTryout.findUnique({ where: { slug: finalSlug } })
  if (existing) {
    throw createError({ statusCode: 400, statusMessage: `Slug '${finalSlug}' sudah dipakai.` })
  }

  const free = isfree === true || isfree === 'true'
  const now = new Date()
  const defaultEnd = new Date()
  defaultEnd.setDate(now.getDate() + 30)

  const data = await prisma.snbtTryout.create({
    data: {
      name: String(name).trim(),
      slug: finalSlug,
      price: free ? null : (price !== undefined && price !== null && price !== '' ? parseInt(price) : null),
      isfree: free,
      isclosed: isclosed === true || isclosed === 'true',
      marketing: marketing || null,
      image: image || null,
      startedAt: startedAt ? new Date(startedAt) : now,
      endedAt: endedAt ? new Date(endedAt) : defaultEnd,
    },
  })

  return {
    statusCode: 200,
    message: 'Tryout berhasil ditambahkan',
    data,
  }
})
