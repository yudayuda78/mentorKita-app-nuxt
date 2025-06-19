export default defineEventHandler(async(event) => {
    const body = await readBody(event)
    const {userId, additionalDays} = body

    if (!userId || !additionalDays) {
        return sendError(event, createError({ statusCode: 400, statusMessage: 'userId dan additionalDays wajib diisi' }))
    }

    const subscription = await prisma.subscription.findFirst({
        where: { userId, isActive: true }
    })

    if (!subscription) {
        return sendError(event, createError({ statusCode: 404, statusMessage: 'Subscription tidak ditemukan' }))
    }

    const newExpiredAt = new Date(subscription.expiredAt)
    newExpiredAt.setDate(newExpiredAt.getDate() + additionalDays)

    const updated = await prisma.subscription.update({
        where: { id: subscription.id },
        data: {
            expiredAt: newExpiredAt
        }
    })

    return updated
})