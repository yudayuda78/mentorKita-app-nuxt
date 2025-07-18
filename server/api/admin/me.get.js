import jwt from 'jsonwebtoken'
import { getCookie } from 'h3'


export default defineEventHandler(async (event) => {
    const token = getCookie(event, 'admin_token')

    if (!token) {
        return {
            error: true,
            message: 'Tidak ada token'
        }
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET) 
    const admin = await prisma.admin.findUnique({
        where: { id: decoded.id },
        select: { id: true, username: true }
    })

    return { admin }
})