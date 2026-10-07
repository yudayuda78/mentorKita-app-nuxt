import prisma from "../../prisma/client.js"

const MAX_PAGE_SIZE = 100
const DEFAULT_PAGE_SIZE = 20

export default defineCachedEventHandler(async (event) => {
  const query = getQuery(event)
  const tryoutSlug = (query.tryoutSlug || '').toString()
  const q = (query.q || '').toString().trim()
  const page = Math.max(1, parseInt(query.page) || 1)
  const pageSize = Math.min(
    MAX_PAGE_SIZE,
    Math.max(1, parseInt(query.pageSize) || DEFAULT_PAGE_SIZE),
  )

  if (!tryoutSlug) {
    throw createError({ statusCode: 400, statusMessage: 'tryoutSlug wajib diisi.' })
  }

  const tryout = await prisma.snbtTryout.findUnique({
    where: { slug: tryoutSlug },
    select: { id: true, name: true, slug: true },
  })
  if (!tryout) {
    throw createError({ statusCode: 404, statusMessage: 'Tryout tidak ditemukan.' })
  }

  const baseWhere = { snbtTryoutId: tryout.id }
  const listWhere = q
    ? {
        snbtTryoutId: tryout.id,
        OR: [
          { user: { username: { contains: q, mode: 'insensitive' } } },
          { user: { userProfile: { fullName: { contains: q, mode: 'insensitive' } } } },
          { user: { userProfile: { schoolOrigin: { contains: q, mode: 'insensitive' } } } },
        ],
      }
    : baseWhere

  const select = {
    score: true,
    userId: true,
    createdAt: true,
    user: {
      select: {
        username: true,
        userProfile: { select: { fullName: true, schoolOrigin: true } },
      },
    },
  }

  const [rows, total] = await prisma.$transaction([
    prisma.snbtFinalScore.findMany({
      where: listWhere,
      orderBy: [{ score: 'desc' }, { createdAt: 'asc' }, { userId: 'asc' }],
      skip: (page - 1) * pageSize,
      take: pageSize,
      select,
    }),
    prisma.snbtFinalScore.count({ where: listWhere }),
  ])

  let data = []
  if (rows.length) {
    // Rank baris pertama (RANK, seri sama) via count ter-index.
    const rank0 =
      1 +
      (await prisma.snbtFinalScore.count({
        where: { ...baseWhere, score: { gt: rows[0].score } },
      }))

    let rank = rank0
    let prevScore = rows[0].score
    data = rows.map((r, i) => {
      if (i > 0 && r.score < prevScore) {
        rank = rank0 + i
      }
      prevScore = r.score
      return {
        rank,
        name: r.user?.userProfile?.fullName || r.user?.username || 'Tanpa Nama',
        school: r.user?.userProfile?.schoolOrigin || '-',
        score: r.score,
      }
    })
  }

  return {
    success: true,
    tryout: { id: tryout.id, name: tryout.name, slug: tryout.slug },
    data,
    meta: {
      total,
      page,
      pageSize,
      totalPages: Math.ceil(total / pageSize),
    },
  }
}, {
  maxAge: 30,
  staleMaxAge: 60,
  swr: true,
  name: 'ranking-leaderboard',
  getKey: (event) => {
    const query = getQuery(event)
    const slug = (query.tryoutSlug || '').toString()
    const q = (query.q || '').toString().trim().toLowerCase()
    const page = parseInt(query.page) || 1
    const pageSize = parseInt(query.pageSize) || DEFAULT_PAGE_SIZE
    return `ranking:leaderboard:${slug}:${page}:${pageSize}:${q}`
  },
})
