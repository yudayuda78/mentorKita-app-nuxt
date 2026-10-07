import prisma from "../../../prisma/client.js"

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { name, slug, price, image, description } = body

  if (!name || !String(name).trim()) {
    throw createError({ statusCode: 400, statusMessage: 'Nama produk wajib diisi.' })
  }

  const parsedPrice = parseInt(price)
  if (isNaN(parsedPrice) || parsedPrice < 0) {
    throw createError({ statusCode: 400, statusMessage: 'Harga wajib diisi dan tidak boleh negatif.' })
  }

  const base = generateSlug(slug || name)
  const finalSlug = await uniqueSlug(base, (s) => prisma.product.findUnique({ where: { slug: s } }))

  const data = await prisma.product.create({
    data: {
      name: String(name).trim(),
      slug: finalSlug,
      price: parsedPrice,
      image: image || null,
      description: description || null,
    },
  })

  return {
    statusCode: 200,
    message: 'Produk berhasil ditambahkan',
    data,
  }
})
