export default defineEventHandler(async (event) => {
  const { slug, id } = event.context.params

  if (!slug || !id) {
    return { status: 400, message: 'Parameter tidak lengkap' }
  }

  const tryout = await prisma.snbtTryout.findUnique({
    where: { slug },
    include: {
      tryoutMateri: {
        where: {
          id: parseInt(id), // atau pakai name jika belum ada field `slug`
        },
        include: {
          snbtSoal: true
        }
      }
    }
  })

  if (!tryout || tryout.tryoutMateri.length === 0) {
    return { status: 404, message: 'Materi tidak ditemukan' }
  }

  return {
    status: 200,
    data: tryout.tryoutMateri[0]
  }
})
