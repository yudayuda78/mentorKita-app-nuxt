export default defineEventHandler( async (event) => {
    const body = await readBody(event)
    const {userId} = body

    if(!userId){
        return sendError(event, createError({ statusCode: 400, statusMessage: 'userId wajib diisi' }))
    }

    const now = new Date()
    const expiredAt = new Date()
    expiredAt.setDate(now.getDate()+90)

    const subscription = await prisma.subscription.create({
        data: {
        userId,
        startedAt: now,
        expiredAt,
        isActive: true
    }
    })

    return subscription
})