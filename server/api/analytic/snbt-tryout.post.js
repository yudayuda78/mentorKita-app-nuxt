export default defineEventHandler = (async(event) => {
    const body = await readBody(event)
    const {userId, snbtTryoutId, snbtTryoutName} = body
    const clickSnbt = await prisma.clickSnbtTryout.create({
        data: {
            userId,
            snbtTryoutId,
            snbtMateri: snbtTryoutName
        }
    })

    return {
        status: 'success',
        message: 'SNBT Tryout berhasil diklik',
        data: clickSnbt,
    }
})