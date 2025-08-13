import bcrypt from 'bcrypt'
import prisma from "../prisma/client.js"

export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    const { username, email, password } = body

    if (!username || !email || !password) {
        return sendError(event, createError({ statusCode: 400, statusMessage: 'Semua field wajib diisi.' }))
    }

      // Validasi: cek apakah username atau email sudah ada
    const existingUser = await prisma.user.findFirst({
        where: {
            OR: [
                { username: username },
                { email: email }
            ]
        }
    })

    if (existingUser) {
        return sendError(event, createError({
        statusCode: 400,
        statusMessage: 'Username atau email sudah terdaftar'
        }))
    }

    //hash password
    const hashedPassword = await bcrypt.hash(password, 10)

    const user = await prisma.user.create({
        data: {
            username,
            email,
            password: hashedPassword,
        }
    })

    return{
        status: 'succes',
        message: 'akun berhasil dibuat',
        data: {
            username: body.username,
            email: body.email,
            password: hashedPassword
        },
    }
})