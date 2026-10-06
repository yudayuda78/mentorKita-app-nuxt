import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import prisma from "../../prisma/client.js"


export default defineEventHandler(async(event) => {
    const body = await readBody(event)
    const {username, password } = body

    const user = await prisma.admin.findUnique({
        where: { username: username}
    })

    if (!user) {
        return {
            error: true,
            message: 'Username atau password salah'
        }
    }

    const isPasswordValid = await bcrypt.compare(password, user.password)
    if (!isPasswordValid) {
        return {
            error: true,
            message: 'Username atau password salah'
        }
    }

    const token = jwt.sign(
        { id: user.id, username: user.username, role: user.role, typ: 'admin' },
        process.env.JWT_SECRET,
        { expiresIn: '5h' }
    )

    setCookie(event, 'admin_token', token, {
        httpOnly: true,
        sameSite: 'lax',
        secure: process.env.NODE_ENV === 'production',
        path: '/',
        maxAge: 60 * 60 * 5 // 5 Jam
    })

    return {
        token,
        admin: {
            id: user.id,
            username: user.username
        }
    }
})