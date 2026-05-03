import prisma from "../../../../prisma/client.js"

export default defineEventHandler(async(event) => {
    const id = event.context.params.id

    const kelas = await prisma.latihanClass.findUnique({
        where: {
            id: parseInt(id)
        },
        include: {
            courses: true // Ini akan menarik semua data course yang berelasi
        }
    })

    if (!kelas) {
        throw createError({
            statusCode: 404,
            message: 'Kelas tidak ditemukan'
        })
    }

    return {
        statusCode: 200,
        data: kelas
    }
})
