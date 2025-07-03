export default defineEventHandler(async (event) => {
  try {
    const products = await prisma.product.findMany({
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        name: true,
        slug: true,
        price: true,
        image: true,
        description: true,
        createdAt: true,
        updatedAt: true,
      },
    })

    return { success: true, data: products }
  } catch (error) {
    console.error('Error fetching products:', error)
    return {
      success: false,
      message: 'Gagal mengambil data produk',
    }
  }
})