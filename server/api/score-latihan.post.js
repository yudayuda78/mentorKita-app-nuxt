export default defineEventHandler( async (event) => {
    const {dataScore} = await readBody(event)

    if(!dataScore){
        throw createError({
            statusCode: 400,
            statusMessage: 'Tidak ada data terkirim',
        })
    }

    const { id, userId, soalId, score } = dataScore

    const addData = await prisma.ScoreLatihan.create({
        data : {
            userId,
            soalId,
            score
        }, skipDuplicate : true
    })

    return { success: true, inserted: addData }
})