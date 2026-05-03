import prisma from '../../../../prisma/client.js';

export default defineEventHandler(async(event) => {
    const body = await readBody(event)
    const { name, latihan_class_id } = body

    if (!latihan_class_id) {
        throw createError({
            statusCode: 400,
            message: 'latihan_class_id diperlukan'
        })
    }

    
 

    const course = await prisma.latihanCourse.create({
        data: {
            name: name,
            classes: {
                connect: { id: parseInt(latihan_class_id) }
            }
        }
    })

    return {
        statusCode: 200,
        message: 'Data berhasil ditambahkan',
        data: course
    }
})
