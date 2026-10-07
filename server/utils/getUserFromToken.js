import jwt from 'jsonwebtoken'


export async function getUserFromToken(event) {
  const token = getCookie(event, 'token')
  if (!token) return null

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    if (decoded.typ === 'admin') return null
    const user = await prisma.user.findUnique({
      where: { id: decoded.id }
    })
    if (!user || user.isActive === false) return null
    return user
  } catch (err) {
    return null
  }
}