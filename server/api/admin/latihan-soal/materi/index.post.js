import prisma from '../../../../prisma/client.js';

export default defineEventHandler(async(event) => {
    const body = await readBody(event)
    const { name, courseId } = body

    if (!courseId) {
        throw createError({
            statusCode: 400,
            message: 'courseId diperlukan'
        })
    }

    const materi = await prisma.latihanMateri.create({
        data: {
            name: name,
            course: {
                connect: { id: parseInt(courseId) }
            }
        }
    })

    return {
        statusCode: 200,
        message: 'Materi berhasil ditambahkan',
        data: materi
    }
})
