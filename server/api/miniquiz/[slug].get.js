

export default defineEventHandler(async (event) => {
    const slug = event.context.params.slug

    const quiz = await prisma.MiniQuiz.findUnique({
        where: {
            slug: slug,
        },
        include: {
            soalMiniQuiz: {
                include: true
            },
        },
    })

    if (!quiz) {
        throw createError({
            statusCode: 404,
            statusMessage: "Miniquiz not found",
        })
    }

    return { statusCode: 200, statusMessage: "Miniquiz retrieved successfully", data: quiz }
})