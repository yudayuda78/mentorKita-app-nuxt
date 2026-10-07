import prisma from "../../../prisma/client.js"

const MAX_PAGE_SIZE = 100
const DEFAULT_PAGE_SIZE = 20

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const q = (query.q || '').toString().trim()
  const status = (query.status || '').toString().trim()
  const page = Math.max(1, parseInt(query.page) || 1)
  const pageSize = Math.min(MAX_PAGE_SIZE, Math.max(1, parseInt(query.pageSize) || DEFAULT_PAGE_SIZE))

  const where = {}
  if (status && ['pending', 'paid', 'failed', 'ambiguous'].includes(status)) {
    where.status = status
  }
  if (q) {
    where.OR = [
      { snbtMateri: { contains: q, mode: 'insensitive' } },
      { invoiceNumber: { contains: q, mode: 'insensitive' } },
      { orderId: { contains: q, mode: 'insensitive' } },
      { user: { OR: [{ username: { contains: q, mode: 'insensitive' } }, { email: { contains: q, mode: 'insensitive' } }] } },
    ]
  }

  const [data, total] = await prisma.$transaction([
    prisma.paymentSnbtTryout.findMany({
      where,
      orderBy: { id: 'desc' },
      skip: (page - 1) * pageSize,
      take: pageSize,
      select: {
        id: true,
        userId: true,
        snbtTryoutId: true,
        snbtMateri: true,
        isPaid: true,
        orderId: true,
        amount: true,
        totalAmount: true,
        uniqueCode: true,
        qrisFee: true,
        invoiceNumber: true,
        status: true,
        expiresAt: true,
        paidAt: true,
        createdAt: true,
        user: { select: { username: true, email: true } },
        snbtTryout: { select: { name: true, slug: true } },
      },
    }),
    prisma.paymentSnbtTryout.count({ where }),
  ])

  return {
    statusCode: 200,
    data,
    meta: { total, page, pageSize, totalPages: Math.ceil(total / pageSize) },
  }
})
