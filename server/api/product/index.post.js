import prisma from "../../prisma/client.js"


function generateSlug(name) {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')  
    .replace(/\s+/g, '-')          
    .replace(/-+/g, '-')            
}

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)

    const { name, price, image, description } = body

    if (!name || !price) {
      return {
        success: false,
        message: 'Name dan price wajib diisi',
      }
    }

    const slug = generateSlug(name)

    // Cek apakah slug sudah ada
    const existing = await prisma.product.findUnique({ where: { slug } })
    if (existing) {
      return {
        success: false,
        message: `Produk dengan slug '${slug}' sudah ada`,
      }
    }

    const newProduct = await prisma.product.create({
      data: {
        name,
        slug,
        price: parseInt(price),
        image: image || null,
        description: description || null,
      },
    })

    return {
      success: true,
      message: 'Produk berhasil ditambahkan',
      data: newProduct,
    }
  } catch (error) {
    console.error('Gagal menambahkan produk:', error)
    return {
      success: false,
      message: 'Terjadi kesalahan saat menambahkan produk',
    }
  }
})
