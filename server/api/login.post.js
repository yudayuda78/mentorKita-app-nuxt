import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

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

    return {
        token,
        user: {
            id: user.id,
            email: user.email,
            username: user.username
        }
    }
})