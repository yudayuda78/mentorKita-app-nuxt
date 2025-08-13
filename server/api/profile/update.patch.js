import jwt from 'jsonwebtoken'
import prisma from "../../prisma/client.js"



export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    const {username, email, fullName, phoneNumber, birthDate, gender, schoolOrigin, targetUniversity, targetMajor} = body


    const token = getCookie(event, 'token')
    if(!token) {
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

    const currentUser = await prisma.user.findUnique({
        where: { id: decoded.id },
    })

    if(!currentUser) {
        throw createError({
            statusCode: 404,
            statusMessage: 'Pengguna tidak ditemukan'
        })
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    if (!emailRegex.test(email)) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Format email tidak valid'
        })
    }


  // Cek username jika berubah dan dipakai user lain
if (username !== currentUser.username) {
  const existingUsername = await prisma.user.findUnique({ where: { username } })
  if (existingUsername && existingUsername.id !== currentUser.id) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Username sudah terdaftar'
    })
  }
}


if (email !== currentUser.email) {
  const existingEmail = await prisma.user.findUnique({ where: { email } })
  if (existingEmail && existingEmail.id !== currentUser.id) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Email sudah terdaftar'
    })
  }
}


    

    const updatedUser = await prisma.user.update({
        where: { id: currentUser.id },
        data: {
            username,
            email,
        }
    })



    const updatedProfile = await prisma.userProfile.upsert({
  where: { userId: currentUser.id },
  update: {
    fullName: fullName,
    phoneNumber,
    birthDate: new Date(birthDate),
    gender,
    schoolOrigin,
    targetUniversity,
    targetMajor
  },
  create: {
    userId: currentUser.id,
    fullName: fullName,
    phoneNumber,
    birthDate: new Date(birthDate),
    gender,
    schoolOrigin,
    targetUniversity,
    targetMajor
  }
})


    return {
        message: 'Profil berhasil diperbarui',
        user: updatedUser,
        userProfile: updatedProfile
    }

})