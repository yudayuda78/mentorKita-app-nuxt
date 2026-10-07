import prisma from "../../../prisma/client.js"

export default defineEventHandler(async () => {
  const data = await prisma.blog.findMany({
    orderBy: { createdAt: 'desc' },
  })

  return {
    statusCode: 200,
    data,
  }
})
