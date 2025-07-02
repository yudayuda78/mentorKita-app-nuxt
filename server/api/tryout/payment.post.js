

export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    const { userId, snbtTryoutId, snbtTryoutName } = body

    const isThere = await prisma.paymentSnbtTryout.findFirst({
        where: {
            userId,
            snbtTryoutId,
        },
    })

     if (!isThere) {
    const clickSnbt = await prisma.paymentSnbtTryout.create({
      data: {
        userId,
        snbtTryoutId,
        snbtMateri: snbtTryoutName,
      },
    })
    }

    return {
    status: 'success',
    message: 'SNBT Payment',
  }
})