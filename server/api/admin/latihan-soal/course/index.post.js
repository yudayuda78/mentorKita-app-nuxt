import prisma from "../../../../prisma/client.js"

export default defineEventHandler(async(event) => {
    const body = await readBody(event)
    const { name, course_id } = body

    const kelas = await prisma.latihanCourse.create({
        data: {
            name: name,
            course_id: parseInt(course_id)
        }
    })

    return {
        statusCode: 200,
        message: 'Data berhasil ditambahkan',
        data: kelas
    }
})