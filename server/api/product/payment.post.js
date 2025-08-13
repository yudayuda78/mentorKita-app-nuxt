import prisma from "../../prisma/client.js"


export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    const { userId, productId, productName } = body

    const isThere = await prisma.paymentProduct.findFirst({
        where: {
            userId,
            productId,
        },
    })

     if (!isThere) {
    const clickProduct = await prisma.paymentProduct.create({
      data: {
        userId,
        productId,
        productName
      },
    })
    }

    return {
    status: 'success',
    message: 'Product Payment',
  }
})