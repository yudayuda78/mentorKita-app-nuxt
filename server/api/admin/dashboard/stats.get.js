import prisma from "../../../prisma/client.js"

export default defineEventHandler(async () => {
  const now = new Date()
  const start = new Date()
  start.setDate(now.getDate() - 6)
  start.setHours(0, 0, 0, 0)

  const [
    totalUsers,
    activeUsers,
    totalTryouts,
    totalProducts,
    totalBlogs,
    paidTryoutAgg,
    paidTryoutCount,
    pendingTryoutCount,
    productPaidCount,
    productRevenueRows,
  ] = await prisma.$transaction([
    prisma.user.count(),
    prisma.user.count({ where: { isActive: true } }),
    prisma.snbtTryout.count(),
    prisma.product.count(),
    prisma.blog.count(),
    prisma.paymentSnbtTryout.aggregate({ _sum: { totalAmount: true }, where: { isPaid: true } }),
    prisma.paymentSnbtTryout.count({ where: { isPaid: true } }),
    prisma.paymentSnbtTryout.count({ where: { isPaid: false } }),
    prisma.paymentProduct.count({ where: { isPaid: true } }),
    prisma.$queryRaw`
      SELECT COALESCE(SUM(p.price), 0)::int AS revenue
      FROM "PaymentProduct" pp
      JOIN "Product" p ON p.id = pp."productId"
      WHERE pp."isPaid" = true
    `,
  ])

  const productRevenue = productRevenueRows?.[0]?.revenue || 0

  const userSeries = await prisma.$queryRaw`
    SELECT to_char(d.day, 'YYYY-MM-DD') AS date, COALESCE(c.count, 0)::int AS count
    FROM generate_series(${start}::date, ${now}::date, '1 day') AS d(day)
    LEFT JOIN (
      SELECT date_trunc('day', "createAt") AS day, COUNT(*) AS count
      FROM "User" WHERE "createAt" >= ${start}
      GROUP BY 1
    ) c ON c.day = d.day
    ORDER BY d.day
  `

  const paymentSeries = await prisma.$queryRaw`
    SELECT to_char(d.day, 'YYYY-MM-DD') AS date, COALESCE(c.count, 0)::int AS count
    FROM generate_series(${start}::date, ${now}::date, '1 day') AS d(day)
    LEFT JOIN (
      SELECT date_trunc('day', "createdAt") AS day, COUNT(*) AS count
      FROM "PaymentSnbtTryout" WHERE "isPaid" = true AND "createdAt" >= ${start}
      GROUP BY 1
    ) c ON c.day = d.day
    ORDER BY d.day
  `

  return {
    statusCode: 200,
    data: {
      totals: {
        users: totalUsers,
        activeUsers,
        tryouts: totalTryouts,
        products: totalProducts,
        blogs: totalBlogs,
        revenue: (paidTryoutAgg._sum.totalAmount || 0) + productRevenue,
        paidTryoutCount,
        pendingTryoutCount,
        productPaidCount,
      },
      series: {
        users: userSeries,
        payments: paymentSeries,
      },
    },
  }
})
