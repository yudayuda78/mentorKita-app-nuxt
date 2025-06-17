export default defineEventHandler(async (event) => {
    const slug = getRouterParam(event, 'slug')
    if (!slug) {
    return { status: 400, message: 'Slug tidak ditemukan' }
  }

  const tryout = await prisma.snbtTryout.findUnique({
    where: { slug },
    include: {
      tryoutMateri: true
    }
  })

  if (!tryout) {
    return { status: 404, message: 'Tryout tidak ditemukan' }
  }

  return {
    status: 200,
    data: tryout
  }
})