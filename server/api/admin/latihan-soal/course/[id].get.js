import prisma from "../../../../prisma/client.js"

export default defineEventHandler(async(event) => {
    const id = event.context.params.id

    const course = await prisma.latihanCourse.findUnique({
        where: {
            id: parseInt(id)
        },
        include: {
            materi: true // Ini akan menarik semua data kelas yang berelasi
        }
    })

    if (!course) {
        throw createError({
            statusCode: 404,
            message: 'Course tidak ditemukan'
        })
    }

    return {
        statusCode: 200,
        data: course
    }
})