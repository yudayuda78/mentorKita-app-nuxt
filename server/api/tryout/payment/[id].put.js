import prisma from "../../../prisma/client.js"


export default defineEventHandler(async (event) => {
  const id = parseInt(event.context.params.id) // Ambil ID dari URL
  const body = await readBody(event)            // Ambil body dari request

  if (isNaN(id) || typeof body.isPaid !== 'boolean') {
    return {
      error: true,
      message: 'ID tidak valid atau data isPaid tidak sesuai'
    }
  }

  try {
    const updated = await prisma.paymentSnbtTryout.update({
      where: { id },
      data: {
        isPaid: body.isPaid
      }
    })

    return {
      success: true,
      message: 'Status berhasil diperbarui',
      data: updated
    }
  } catch (error) {
    return {
      error: true,
      message: 'Gagal menyimpan status',
      detail: error.message
    }
  }
})
