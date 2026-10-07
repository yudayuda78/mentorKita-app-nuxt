import prisma from "../../../../prisma/client.js"

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const miniQuizId = parseInt(query.miniQuizId)

  const where = {}
  if (miniQuizId && !isNaN(miniQuizId)) where.miniQuizId = miniQuizId

  const data = await prisma.soalMiniQuiz.findMany({
    where,
    orderBy: { id: 'asc' },
  })

  return {
    statusCode: 200,
    data,
  }
})
