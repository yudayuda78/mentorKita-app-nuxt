import prisma from "../../../../prisma/client.js"

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const tryoutId = parseInt(query.tryoutId)

  const where = {}
  if (tryoutId && !isNaN(tryoutId)) where.tryoutId = tryoutId

  const data = await prisma.snbtTryoutMateri.findMany({
    where,
    orderBy: { id: 'asc' },
    include: { _count: { select: { snbtSoal: true } } },
  })

  return {
    statusCode: 200,
    data,
  }
})
