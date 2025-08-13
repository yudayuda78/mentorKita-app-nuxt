import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import prisma from "../../prisma/client.js"


export default defineEventHandler(async(event) => {
    const body = await readBody(event)
    const {username, password } = body

    const user = await prisma.admin.findUnique({
        where: { username: username}
    })

    const isPasswordValid = await bcrypt.compare(password, user.password)
    if (!isPasswordValid) {
        return {
            error: true,
            message: 'Username atau password salah'
        }
    }

    const token = jwt.sign(
        { id: user.id, username: user.username },
        process.env.JWT_SECRET,
        { expiresIn: '7d' }
    )

    setCookie(event, 'admin_token', token, {
        httpOnly: true,
        sameSite: 'strict',
        maxAge: 60 * 60 * 24 * 7 // 7 hari
    })

    return {
        token,
        admin: {
            id: user.id,
            username: user.username
        }
    }
})