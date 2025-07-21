export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { tryoutSlug } = body

  if (!tryoutSlug) {
    return {
      success: false,
      message: 'Tryout slug diperlukan.'
    }
  }

  const tryout = await prisma.snbtTryout.findUnique({
    where: { slug: tryoutSlug },
    select: { id: true }
  })

  if (!tryout) {
    return {
      success: false,
      message: 'Tryout tidak ditemukan.'
    }
  }

 const allScore = await prisma.snbtFinalScore.findMany({
  orderBy: {
    score: 'desc',
  },
  include: {
    user: {
      include: {
        userProfile: {
          select: {
            fullName: true,
            schoolOrigin: true
          }
        }
      }
    },
    tryout: {
      select: {
        slug: true,
        name: true
      }
    }
  }
})


  return {
  success: true,
  data: allScore.map((item, index) => ({
    name: item.user.userProfile?.fullName || item.user.username,
    school: item.user.userProfile?.schoolOrigin || "-",
    score: item.score,
    slug: item.tryout.slug,
    rank: index + 1
  }))
}

})
