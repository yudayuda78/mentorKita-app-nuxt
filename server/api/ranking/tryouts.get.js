import prisma from "../../prisma/client.js"

export default defineCachedEventHandler(async () => {
  const grouped = await prisma.snbtFinalScore.groupBy({
    by: ['snbtTryoutId'],
    _count: { _all: true },
  })

  const ids = grouped.map((g) => g.snbtTryoutId)
  if (!ids.length) {
    return { success: true, data: [] }
  }

  const tryouts = await prisma.snbtTryout.findMany({
    where: { id: { in: ids } },
    select: { id: true, name: true, slug: true },
  })
  const map = new Map(tryouts.map((t) => [t.id, t]))

  const data = grouped
    .map((g) => {
      const t = map.get(g.snbtTryoutId)
      if (!t) return null
      return { id: t.id, name: t.name, slug: t.slug, participants: g._count._all }
    })
    .filter(Boolean)
    .sort((a, b) => b.participants - a.participants)

  return { success: true, data }
}, {
  maxAge: 30,
  staleMaxAge: 60,
  swr: true,
  name: 'ranking-tryouts',
})
