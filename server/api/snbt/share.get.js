export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    const { userId, snbtTryoutId, snbtTryoutName } = body

    const getShared = await prisma.shareSnbt.findFirst({
        where: {
            userId,
            snbtTryoutId,
        },
    })

    return {
        status: 'success',
        message: 'SNBT Tryout berhasil ditemukan',
        data: getShared,
    }
})