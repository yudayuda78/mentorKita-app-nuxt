import jwt from 'jsonwebtoken'


export async function getUserFromToken(event) {
  const token = getCookie(event, 'token')
  if (!token) return null

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    const user = await prisma.user.findUnique({
      where: { id: decoded.id }
    })
    return user
  } catch (err) {
    return null
  }
}