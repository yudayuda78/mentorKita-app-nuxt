export default defineEventHandler(async (event) => {
      const query = getQuery(event)
  const user = await getUserFromEvent(event) // ← ambil user dari cookie/JWT
  const userId = user.id
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