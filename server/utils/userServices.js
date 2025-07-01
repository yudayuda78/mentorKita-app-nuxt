
export async function getUserByEmail(email) {
  return await prisma.user.findUnique({
    where: { email: email }
  })
}