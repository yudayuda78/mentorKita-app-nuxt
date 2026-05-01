import prisma from "../../../../prisma/client.js"

export default defineEventHandler(async(event) => {
    const allClass = await prisma.latihanClass.findMany()

    return {
        statusCode: 200,
        data: allClass
    }
})