export default defineEventHandler( async (event) => {
    const body = await readBody(event)
    const {userId, duration} = body

    if(!userId || !duration){
        return sendError(event, createError({ statusCode: 400, statusMessage: 'userId dan durationInDays wajib diisi' }))
    }

    const now = new Date()
    const expiredAt = new Date()
    expiredAt.setDate(now.getDate()+duration)

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