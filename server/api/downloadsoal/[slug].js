export default defineEventHandler(async (event) => {
  try {
    const { slug } = event.context.params

    const soal = await prisma.downloadSoal.findUnique({
      where: { slug }
    })

    if (!soal) {
      return {
        status: 404,
        message: 'Download soal not found',
        data: null
      }
    }

    return {
      status: 200,
      message: 'Berhasil mendapatkan data download soal',
      data: soal
    }
  } catch (err) {
    console.error('API ERROR:', err)
    return {
      status: 500,
      message: 'Server error',
      data: null
    }
  }
})
