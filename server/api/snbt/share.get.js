import prisma from "../../prisma/client.js"


export default defineEventHandler(async (event) => {
      const query = getQuery(event)
  const user = await getUserFromToken(event)
  
   if (!user) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Unauthorized: User not found or token invalid'
    })
  }


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