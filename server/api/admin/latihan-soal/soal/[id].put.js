import prisma from "../../../../prisma/client.js"

export default defineEventHandler(async(event) => {
    const id = event.context.params.id
    const body = await readBody(event)
    const { name } = body

    const kelas = await prisma.latihanClass.update({
        where: {
            id: parseInt(id)
        },
        data: {
            name: name
        }
    })

    return {
        statusCode: 200,
        message: 'Data berhasil diupdate',
        data: kelas
    }
})