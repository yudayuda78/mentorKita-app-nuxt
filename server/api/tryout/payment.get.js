import prisma from "../../prisma/client.js"


export default defineEventHandler(async(event) => {
    const payment = await prisma.paymentSnbtTryout.findMany({
       where: {
      snbtTryout: {
        isfree: false
      }
    },
    include: {
      user: true,
      snbtTryout: true
    }
    })

    return payment
})