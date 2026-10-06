export default defineEventHandler(async (event) => {
    const admin = await getAdminFromToken(event)

    if (!admin) {
        return { admin: null }
    }

    return { admin }
})