import prisma from "../../prisma/client.js"


export default defineEventHandler(async (event) => {
    const quiz = await prisma.miniQuiz.findMany({
        orderBy: {
            createdAt: 'desc'
        },
    })

    return {
        status: 200,
        message: 'Berhasil mendapatkan data mini quiz',
        data: quiz
    };
})