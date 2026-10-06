import prisma from "../../../prisma/client.js"

export default defineEventHandler(async () => {
  const data = await prisma.snbtTryout.findMany({
    orderBy: { id: 'desc' },
  })

  return {
    statusCode: 200,
    data,
  }
})
