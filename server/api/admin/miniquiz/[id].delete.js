import prisma from "@/server/prisma/client.js";

export default defineEventHandler(async (event) => {
    try {
        const id = event.context.params.id;

        const miniquiz = await prisma.miniQuiz.delete({
            where: {
                id: parseInt(id),
            },
        });

        return {
            data: miniquiz,
            message: "Success delete miniquiz",
            status: 200,
        };
    } catch (error) {
        console.error(error);
        return {
            status: 500,
            message: "Failed to delete miniquiz",
        };
    }
});