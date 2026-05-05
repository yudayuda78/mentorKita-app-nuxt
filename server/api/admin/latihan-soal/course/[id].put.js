import prisma from '../../../../prisma/client.js'

export default defineEventHandler(async(event) => {
    const id = event.context.params.id
    const body = await readBody(event)
    const { name, latihan_class_id } = body

    const updateData = {}
    if (name) updateData.name = name
    if (latihan_class_id) {
        updateData.classes = {
            connect: { id: parseInt(latihan_class_id) }
        }
    }

    try {
        const course = await prisma.latihanCourse.update({
            where: {
                id: parseInt(id)
            },
            data: updateData
        })

        return {
            statusCode: 200,
            message: 'Data berhasil diupdate',
            data: course
        }
    } catch (error) {
        throw createError({
            statusCode: 500,
            message: 'Gagal mengupdate course: ' + error.message
        })
    }
})
