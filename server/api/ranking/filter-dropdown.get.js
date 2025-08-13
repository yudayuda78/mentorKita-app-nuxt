import prisma from "../../prisma/client.js"



export default defineEventHandler(async (event) => {
    const allTryout = await prisma.snbtTryout.findMany({
        select: {
            name: true,
            slug: true,
        }
    })

    return{
        success: true,
        data: allTryout
    }
})