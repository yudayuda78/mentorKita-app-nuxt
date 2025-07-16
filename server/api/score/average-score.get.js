export default defineEventHandler(async () => {
  try {
    const allScore = await prisma.averageScoreTryout.findMany({
      include: {
        user: {
          select: {
            username: true,
            userProfile: {
              select: {
                schoolOrigin: true
              }
            }
          }
        }
      }
    })

    const transformed = allScore.map(item => ({
      name: item.user?.username || '-',
      score: item.score,
      school: item.user?.userProfile?.schoolOrigin || '-'
    }))

    return {
        success: true,
        data: transformed
    }
  } catch (error) {
    console.error('Error fetching average scores:', error)
    return createError({
      statusCode: 500,
      statusMessage: 'Failed to fetch average scores'
    })
  }
})
