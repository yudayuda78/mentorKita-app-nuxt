import prisma from "../../../../prisma/client.js"

export default defineEventHandler(async(event) => {
    const id = event.context.params.id

    const kelas = await prisma.latihanClass.delete({
        where: {
            id: parseInt(id)
        }
    })

    return {
        statusCode: 200,
        message: 'Data berhasil dihapus',
        data: kelas
    }
})