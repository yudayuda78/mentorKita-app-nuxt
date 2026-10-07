import prisma from "../../../prisma/client.js"

export default defineEventHandler(async (event) => {
  const id = parseInt(event.context.params.id)
  if (isNaN(id)) {
    throw createError({ statusCode: 400, statusMessage: 'ID tidak valid.' })
  }

  const current = await prisma.product.findUnique({ where: { id } })
  if (!current) {
    throw createError({ statusCode: 404, statusMessage: 'Produk tidak ditemukan.' })
  }

  const body = await readBody(event)
  const { name, slug, price, image, description } = body

  const data = {}

  if (name !== undefined) {
    if (!String(name).trim()) {
      throw createError({ statusCode: 400, statusMessage: 'Nama produk wajib diisi.' })
    }
    data.name = String(name).trim()
  }

  if (price !== undefined) {
    const parsedPrice = parseInt(price)
    if (isNaN(parsedPrice) || parsedPrice < 0) {
      throw createError({ statusCode: 400, statusMessage: 'Harga tidak boleh negatif.' })
    }
    data.price = parsedPrice
  }

  if (slug !== undefined && String(slug).trim()) {
    const base = generateSlug(slug)
    if (base !== current.slug) {
      data.slug = await uniqueSlug(base, (s) => prisma.product.findUnique({ where: { slug: s } }), id)
    }
  }

  if (image !== undefined) data.image = image || null
  if (description !== undefined) data.description = description || null

  const updated = await prisma.product.update({ where: { id }, data })

  return {
    statusCode: 200,
    message: 'Produk berhasil diperbarui',
    data: updated,
  }
})
