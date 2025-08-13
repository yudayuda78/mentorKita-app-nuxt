import prisma from "../../prisma/client.js"


export default defineEventHandler(async(event) => {
    const payment = await prisma.paymentProduct.findMany({

    include: {
      user: true,
      product: true
    }
    })

    return payment
})