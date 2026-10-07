import prisma from "../../../prisma/client.js"

export default defineEventHandler(async (event) => {
  const id = parseInt(event.context.params.id)
  if (isNaN(id)) {
    throw createError({ statusCode: 400, statusMessage: 'ID tidak valid.' })
  }

  const data = await prisma.product.findUnique({ where: { id } })
  if (!data) {
    throw createError({ statusCode: 404, statusMessage: 'Produk tidak ditemukan.' })
  }

  try {
    // Hapus riwayat pembayaran produk terkait agar FK tidak menghalangi
    await prisma.paymentProduct.deleteMany({ where: { productId: id } })
    await prisma.product.delete({ where: { id } })

    return {
      statusCode: 200,
      message: 'Produk dan pembayaran terkait berhasil dihapus',
    }
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Gagal menghapus produk: ' + error.message,
    })
  }
})
