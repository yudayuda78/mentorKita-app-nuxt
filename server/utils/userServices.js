import bcrypt from 'bcrypt'

export async function getUserByEmail(email) {
  return await prisma.user.findUnique({
    where: { email: email }
  })
}

export async function updateUserPassword(email, newPassword) {
  const user = prisma.user.findUnique({
    where: { email: email }
  })

  if (!user) {
    throw new Error('User not found')
  }

  const hashedPassword = await bcrypt.hash(newPassword, 10)

  await prisma.user.update({
    where: { email: email },
    data: { password: hashedPassword }
  })

}