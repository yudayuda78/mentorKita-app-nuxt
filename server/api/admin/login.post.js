import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import prisma from "../../prisma/client.js"


export default defineEventHandler(async(event) => {
    const body = await readBody(event)
    const {username, password } = body

    const user = await prisma.user.findUnique({
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
        { expiresIn: '5h' }
    )

    setCookie(event, 'admin_token', token, {
        httpOnly: true,
        sameSite: 'strict',
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