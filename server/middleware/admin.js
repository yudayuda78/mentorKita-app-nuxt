export default defineEventHandler(async (event) => {
    const path = getRequestPath(event)

    const isAdminRoute = path.startsWith('/api/admin') || path.startsWith('/mentorkita-admin')
    const isLoginRoute = path.includes('/login')

    if (isAdminRoute && !isLoginRoute) {
        const admin = await getAdminFromToken(event)

        if (!admin) {
            throw createError({
                statusCode: 401,
                statusMessage: 'Unauthorized access: admin token invalid',
            })
        }

        event.context.admin = admin
    }
})
