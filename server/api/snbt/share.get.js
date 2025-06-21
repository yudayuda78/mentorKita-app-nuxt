export default defineEventHandler(async (event) => {
      const query = getQuery(event)
  const userId = parseInt(query.userId)
  const snbtTryoutId = parseInt(query.snbtTryoutId)
    const getShared = await prisma.shareSnbt.findFirst({
        where: {
            userId,
            snbtTryoutId,
        },
    })

    if(!getShared){
        return null
    }

    return {
        status: 'success',
        message: 'SNBT Tryout berhasil ditemukan',
        data: getShared,
    }
})