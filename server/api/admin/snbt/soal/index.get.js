import prisma from "../../../../prisma/client.js"

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const snbtMateriId = parseInt(query.snbtMateriId)

  const where = {}
  if (snbtMateriId && !isNaN(snbtMateriId)) where.snbtMateriId = snbtMateriId

  const data = await prisma.snbtSoal.findMany({
    where,
    orderBy: { id: 'asc' },
  })

  return {
    statusCode: 200,
    data,
  }
})
