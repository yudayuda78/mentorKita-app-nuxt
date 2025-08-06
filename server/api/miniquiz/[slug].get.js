

export default defineEventHandler(async (event) => {
    const slug = event.context.params.slug

    const quiz = await prisma.miniquiz.findUnique({
        where: {
            slug: slug,
        },
        include: {
            soalminiquiz: {
                include: {
                    options: true,
                },
            },
        },
    })

    if (!quiz) {
        throw createError({
            statusCode: 404,
            statusMessage: "Miniquiz not found",
        })
    }

    return quiz
})