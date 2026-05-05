import prisma from '../../../../prisma/client.js'

export default defineEventHandler(async(event) => {
    const id = event.context.params.id

    try {
        // 1. Dapatkan semua materi yang berelasi dengan course ini
        const materi = await prisma.latihanMateri.findMany({
            where: { courseId: parseInt(id) },
            select: { id: true }
        })
        const materiIds = materi.map(m => m.id)

        if (materiIds.length > 0) {
            // 2. Dapatkan semua soal yang berelasi dengan materi-materi tersebut
            const soal = await prisma.latihanSoal.findMany({
                where: { materiId: { in: materiIds } },
                select: { id: true }
            })
            const soalIds = soal.map(s => s.id)

            // 3. Hapus ScoreLatihan yang berelasi dengan materi
            await prisma.scoreLatihan.deleteMany({
                where: { materiId: { in: materiIds } }
            })

            if (soalIds.length > 0) {
                // 4. Hapus AnswerLatihanUser yang berelasi dengan soal
                await prisma.answerLatihanUser.deleteMany({
                    where: { soalId: { in: soalIds } }
                })

                // 5. Hapus LatihanSoal
                await prisma.latihanSoal.deleteMany({
                    where: { id: { in: soalIds } }
                })
            }

            // 6. Hapus LatihanMateri
            await prisma.latihanMateri.deleteMany({
                where: { id: { in: materiIds } }
            })
        }

        // 7. Akhirnya hapus course-nya
        await prisma.latihanCourse.delete({
            where: { id: parseInt(id) }
        })

        return {
            statusCode: 200,
            message: 'Course dan semua data terkait (Materi, Soal, Jawaban, Skor) berhasil dihapus'
        }
    } catch (error) {
        throw createError({
            statusCode: 500,
            message: 'Gagal menghapus course: ' + error.message
        })
    }
})
