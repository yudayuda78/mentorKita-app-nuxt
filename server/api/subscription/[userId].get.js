import prisma from "../../prisma/client.js"


export default defineEventHandler( async(event) => {
    const userId = parseInt(event.context.params?.userId || '')

    const subscription = await prisma.subscription.findFirst({
        where: { userId, isActive: true }
    })

    if (!subscription) {
        return { status: 'none' }
    }

    const now = new Date()
    const isExpired = now > subscription.expiredAt

    return {
        ...subscription,
        status: isExpired ? 'expired' : 'active'
    }
})