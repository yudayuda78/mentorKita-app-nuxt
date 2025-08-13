import prisma from "../prisma/client.js"

export default defineEventHandler( async (event) => {
    const body = await readBody(event)
    const { userId, materiId, score } = body
    if(!userId){
        throw createError({
            statusCode: 400,
            statusMessage: 'User ID tidak ada',
        })
    }

    if(!materiId){
        throw createError({
            statusCode: 400,
            statusMessage: 'Materi ID tidak ada',
        })
    }

    if(!score){
        throw createError({
            statusCode: 400,
            statusMessage: 'Score tidak ada',
        })
    }

    const addData = await prisma.ScoreLatihan.create({
        data : {
            userId,
            materiId,
            score
        }
    })

    return { success: true, inserted: addData }
})