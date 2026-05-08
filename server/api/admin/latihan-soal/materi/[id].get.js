import prisma from "../../../../prisma/client.js"

export default defineEventHandler(async(event) => {
    const id = event.context.params.id

    const materi = await prisma.latihanMateri.findUnique({
        where: {
            id: parseInt(id)
        },
        include: {
            course: true,
            soal: true 
        }
    })

    if (!materi) {
        throw createError({
            statusCode: 404,
            message: 'Materi tidak ditemukan'
        })
    }

    return {
        statusCode: 200,
        data: materi
    }
})
