export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    const {username, email, fullname, phoneNumber, birthDate, gender, schoolOrigin, targetUniversity, targetMajor} = body

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    if (!emailRegex.test(email)) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Format email tidak valid'
        })
    }


    const existingUsername = await prisma.user.findUnique({
        where: { username }
    })

    if(existingUsername) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Username sudah terdaftar'
        })
    }

    const existingEmail = await prisma.user.findUnique({
        where: { email }
    })


    if (existingEmail) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Email sudah terdaftar'
        })
    }
    


    return{
        data: {
            username,
            email,
            fullname,
            phoneNumber,
            birthDate,
            gender,
            schoolOrigin,
            targetUniversity,
            targetMajor
        }
    }

})