import jwt from 'jsonwebtoken'

export default defineEventHandler((event) => {
    const path = getRequestPath(event)
    

    const isAdminRoute = path.startsWith('/api/admin') || path.startsWith('/mentorkita-admin')
    const isLoginRoute = path.includes('/login')

    if (isAdminRoute && !isLoginRoute) {
        const token = getCookie(event, 'admin_token')
        
        if (!token) {
            throw createError({
                statusCode: 401,
                statusMessage: 'Unauthorized access: No token found',
            })
        }

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            event.context.admin = decoded
        } catch (error) {
            throw createError({
                statusCode: 401,
                statusMessage: 'Unauthorized access: Invalid token',
            })
        }
    }
})