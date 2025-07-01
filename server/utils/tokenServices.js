const tokenMap = new Map()

export function generateToken(){
    return Math.random().toString(36).substring(2, 15)
}

export async function saveToken(email, token) {
  const expires = new Date(Date.now() + 15 * 60 * 1000) // 15 menit

  await prisma.passwordResetToken.deleteMany({
    where: { email }
  })

  await prisma.passwordResetToken.create({
    data: {
      email,
      token,
      expiresAt: expires
    }
  })
}

export async function verifyToken(email, token) {
  const record = await prisma.passwordResetToken.findFirst({
    where: {
      email,
      token,
      expiresAt: { gt: new Date() }
    }
  })
  return !!record // true jika ditemukan dan belum expired
}

export async function removeToken(email) {
  await prisma.passwordResetToken.deleteMany({
    where: { email }
  })
}