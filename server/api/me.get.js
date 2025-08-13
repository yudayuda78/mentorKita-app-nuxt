import jwt from 'jsonwebtoken'
import { getCookie } from 'h3'
import prisma from "../prisma/client.js"


export default defineEventHandler(async (event) => {
    const token = getCookie(event, 'token')

    if (!token) {
        return {
            error: true,
            message: 'Tidak ada token'
        }
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET) 
    const user = await prisma.user.findUnique({
        where: { id: decoded.id },
        select: { id: true, email: true, username: true }
    })

    return { user }
})