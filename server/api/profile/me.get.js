import jwt from 'jsonwebtoken'


export default defineEventHandler(async (event) => {
    const token = getCookie(event, 'token')

    if (!token){
        throw createError({
            statusCode: 401,
            statusMessage: 'Tidak ada token'
        })
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    if(!decoded) {
        throw createError({
            statusCode: 401,
            statusMessage: 'Token tidak valid'
        })
    }  
    
    const user = await prisma.user.findUnique({
        where: { id: decoded.id },
        select:{
            id: true,
            username: true,
            email: true,
            userProfile:{
                select: {
                    fullName: true,
                    phoneNumber: true,
                    birthDate: true,
                    gender: true,
                    schoolOrigin: true,
                    targetUniversity: true,
                    targetMajor: true
                }
            }
        }    
    })

     if (!user) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Pengguna tidak ditemukan'
    })
  }

  return {
    id: user.id,
    username: user.username,
    email: user.email,
    ...user.userProfile
  }


})