import prisma from "../../../prisma/client.js"

const MAX_PAGE_SIZE = 100
const DEFAULT_PAGE_SIZE = 20

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const q = (query.q || '').toString().trim()
  const page = Math.max(1, parseInt(query.page) || 1)
  const pageSize = Math.min(MAX_PAGE_SIZE, Math.max(1, parseInt(query.pageSize) || DEFAULT_PAGE_SIZE))

  const where = q
    ? {
        user: {
          OR: [
            { username: { contains: q, mode: 'insensitive' } },
            { email: { contains: q, mode: 'insensitive' } },
          ],
        },
      }
    : {}

  const [data, total] = await prisma.$transaction([
    prisma.subscription.findMany({
      where,
      orderBy: { id: 'desc' },
      skip: (page - 1) * pageSize,
      take: pageSize,
      include: { user: { select: { id: true, username: true, email: true } } },
    }),
    prisma.subscription.count({ where }),
  ])

  const now = new Date()
  return {
    statusCode: 200,
    data: data.map((s) => ({
      ...s,
      status: !s.isActive ? 'inactive' : (new Date(s.expiredAt) < now ? 'expired' : 'active'),
    })),
    meta: { total, page, pageSize, totalPages: Math.ceil(total / pageSize) },
  }
})
