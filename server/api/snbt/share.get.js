import prisma from "../../prisma/client.js"
import jwt from 'jsonwebtoken'


export default defineEventHandler(async (event) => {
      const query = getQuery(event)
      

  const token = getCookie(event, 'token')
  console.log("getUserFromToken → raw token:", token)

   const decoded = jwt.verify(token, process.env.JWT_SECRET)
console.log("getUserFromToken → decoded:", decoded)

    const user = await prisma.user.findUnique({
      where: { id: decoded.id }
    })
    console.log("getUserFromToken → prisma user:", user)
 
  


  
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

     

    if (!getShared) {
        return {
        status: 'not_found',
        message: 'Belum ada share SNBT',
        data: null,
        }
    }

    return {
        status: 'success',
        message: 'SNBT Tryout berhasil ditemukan',
        data: getShared,
    }
})