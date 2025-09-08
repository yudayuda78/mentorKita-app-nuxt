import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import prisma from "../prisma/client.js"

export default defineEventHandler(async(event) => {
    const body = await readBody(event)
    const {email, password } = body

    const user = await prisma.user.findUnique({
        where: { email: email}
    })

    const isPasswordValid = await bcrypt.compare(password, user.password)
    if (!isPasswordValid) {
        return {
            error: true,
            message: 'Email atau password salah'
        }
    }

    const token = jwt.sign(
        { id: user.id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: '7d' }
    )

    setCookie(event, 'token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production', 
        sameSite: 'none',
        path: '/',
        maxAge: 60 * 60 * 24 * 7, // 7 hari
        domain: process.env.APP_DOMAIN || undefined
    })

    return {
        token,
        user: {
            id: user.id,
            email: user.email,
            username: user.username
        }
    }
})