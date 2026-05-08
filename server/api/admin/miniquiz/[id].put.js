import prisma from "@/server/prisma/client.js";

export default defineEventHandler(async (event) => {
    try {
        const id = event.context.params.id;
        const body = await readBody(event);
        const slug = body.title
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/^-|-$/g, "");

        const miniquiz = await prisma.miniQuiz.update({
            where: {
                id: parseInt(id),
            },
            data: {
                title: body.title,
                slug: slug,
                description: body.description,
                thumbnail: body.thumbnailUrl,
            },
        });

        return {
            data: miniquiz,
            message: "Success update miniquiz",
            status: 200,
        };
    } catch (error) {
        console.error(error);
        return {
            status: 500,
            message: "Failed to update miniquiz",
        };
    }
});