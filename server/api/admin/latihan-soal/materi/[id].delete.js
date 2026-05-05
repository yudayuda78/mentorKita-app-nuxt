import prisma from "../../../../prisma/client.js"

export default defineEventHandler(async(event) => {
    const id = event.context.params.id

    try {
        // 1. Dapatkan semua soalIds untuk materi ini
        const soal = await prisma.latihanSoal.findMany({
            where: { materiId: parseInt(id) },
            select: { id: true }
        })
        const soalIds = soal.map(s => s.id)

        // 2. Hapus ScoreLatihan untuk materi ini
        await prisma.scoreLatihan.deleteMany({
            where: { materiId: parseInt(id) }
        })

        if (soalIds.length > 0) {
            // 3. Hapus AnswerLatihanUser untuk soal-soal tersebut
            await prisma.answerLatihanUser.deleteMany({
                where: { soalId: { in: soalIds } }
            })

            // 4. Hapus LatihanSoal
            await prisma.latihanSoal.deleteMany({
                where: { id: { in: soalIds } }
            })
        }

        // 5. Hapus materi-nya
        await prisma.latihanMateri.delete({
            where: {
                id: parseInt(id)
            }
        })

        return {
            statusCode: 200,
            message: 'Materi dan semua data terkait (Soal, Jawaban, Skor) berhasil dihapus'
        }
    } catch (error) {
        throw createError({
            statusCode: 500,
            message: 'Gagal menghapus materi: ' + error.message
        })
    }
})
