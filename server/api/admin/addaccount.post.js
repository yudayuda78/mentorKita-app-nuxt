import bcrypt from 'bcrypt'

export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    const { username, password } = body

    if (!username ||  !password) {
        return sendError(event, createError({ statusCode: 400, statusMessage: 'Semua field wajib diisi.' }))
    }

      // Validasi: cek apakah username atau email sudah ada
    const existingUser = await prisma.admin.findFirst({
        where: {
            OR: [
                { username: username },
                
            ]
        }
    })

    if (existingUser) {
        return sendError(event, createError({
        statusCode: 400,
        statusMessage: 'Username sudah terdaftar'
        }))
    }

    //hash password
    const hashedPassword = await bcrypt.hash(password, 10)

    const user = await prisma.admin.create({
        data: {
            username,
            password: hashedPassword,
            role: 'admin',
        }
    })

    return{
        status: 'succes',
        message: 'akun berhasil dibuat',
        data: {
            username: body.username,
            password: hashedPassword
        },
    }
})