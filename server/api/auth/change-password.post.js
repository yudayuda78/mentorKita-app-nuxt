import bcrypt from 'bcrypt'



export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    const {oldPassword, newPassword} = body

    if(!oldPassword || !newPassword){
        throw createError({
            statusCode: 400,
            statusMessage: 'Semua field harus diisi',
        })
    }

    const user = await getUserFromToken(event)
    if (!user) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Unauthorized',
    })
  }

  // Ambil user dari database
  const existingUser = await prisma.user.findUnique({
    where: { id: user.id },
  })

  if (!existingUser) {
    throw createError({
      statusCode: 404,
      statusMessage: 'User tidak ditemukan',
    })
  }

  // Verifikasi password lama
  const isMatch = await bcrypt.compare(oldPassword, existingUser.password)

  if (!isMatch) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Password lama salah',
    })
  }

  // Hash password baru
  const hashed = await bcrypt.hash(newPassword, 10)

  // Update ke database
  await prisma.user.update({
    where: { id: user.id },
    data: { password: hashed },
  })

  return {
    message: 'Password berhasil diubah',
  }

})