export async function requireUser(event) {
  const user = await getUserFromToken(event)
  if (!user) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Silakan login terlebih dahulu.',
    })
  }
  return user
}

export async function requireAdmin(event) {
  const admin = await getAdminFromToken(event)
  if (!admin) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Akses ditolak: hanya admin.',
    })
  }
  return admin
}
