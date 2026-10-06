import jwt from 'jsonwebtoken'
import prisma from '../prisma/client.js'

export async function getAdminFromToken(event) {
  const token = getCookie(event, 'admin_token')
  if (!token) return null

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    if (decoded.typ !== 'admin') return null
    const admin = await prisma.admin.findUnique({
      where: { id: decoded.id },
      select: { id: true, username: true, role: true },
    })
    return admin
  } catch (err) {
    return null
  }
}
