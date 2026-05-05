import prisma from "../../../../prisma/client.js"

export default defineEventHandler(async(event) => {
    const id = event.context.params.id

    try {
        // 1. Dapatkan semua courseId yang berelasi dengan class ini
        const courses = await prisma.latihanCourse.findMany({
            where: { latihanClassId: parseInt(id) },
            select: { id: true }
        })
        const courseIds = courses.map(c => c.id)

        if (courseIds.length > 0) {
            // 2. Dapatkan semua materiId yang berelasi dengan course-course tersebut
            const materi = await prisma.latihanMateri.findMany({
                where: { courseId: { in: courseIds } },
                select: { id: true }
            })
            const materiIds = materi.map(m => m.id)

            if (materiIds.length > 0) {
                // 3. Dapatkan semua soalIds
                const soal = await prisma.latihanSoal.findMany({
                    where: { materiId: { in: materiIds } },
                    select: { id: true }
                })
                const soalIds = soal.map(s => s.id)

                // 4. Hapus ScoreLatihan
                await prisma.scoreLatihan.deleteMany({
                    where: { materiId: { in: materiIds } }
                })

                if (soalIds.length > 0) {
                    // 5. Hapus AnswerLatihanUser
                    await prisma.answerLatihanUser.deleteMany({
                        where: { soalId: { in: soalIds } }
                    })

                    // 6. Hapus LatihanSoal
                    await prisma.latihanSoal.deleteMany({
                        where: { id: { in: soalIds } }
                    })
                }

                // 7. Hapus LatihanMateri
                await prisma.latihanMateri.deleteMany({
                    where: { id: { in: materiIds } }
                })
            }

            // 8. Hapus LatihanCourse
            await prisma.latihanCourse.deleteMany({
                where: { id: { in: courseIds } }
            })
        }

        // 9. Akhirnya hapus class-nya
        await prisma.latihanClass.delete({
            where: { id: parseInt(id) }
        })

        return {
            statusCode: 200,
            message: 'Kelas dan semua data terkait (Course, Materi, Soal, Jawaban, Skor) berhasil dihapus'
        }
    } catch (error) {
        throw createError({
            statusCode: 500,
            message: 'Gagal menghapus kelas: ' + error.message
        })
    }
})