import prisma from "../../../../prisma/client.js"

export default defineEventHandler(async(event) => {
    const body = await readBody(event)
    const { name } = body

    const kelas = await prisma.latihanClass.create({
        data: {
            name: name
        }
    })

    return {
        statusCode: 200,
        data: kelas
    }
})