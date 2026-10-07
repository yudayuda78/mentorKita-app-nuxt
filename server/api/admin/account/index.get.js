import prisma from "../../../prisma/client.js"

export default defineEventHandler(async () => {
  const data = await prisma.admin.findMany({
    orderBy: { id: 'asc' },
    select: { id: true, username: true, role: true },
  })

  return {
    statusCode: 200,
    data,
  }
})
