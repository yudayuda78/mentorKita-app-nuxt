import prisma from "../../prisma/client.js"


export default defineEventHandler(async (event) => {
    const soal = await prisma.DownloadSoal.findMany({
        orderBy: {
            createdAt: 'desc'
        },
    })

    return {
        status: 200,
        message: 'Berhasil mendapatkan data download soal',
        data: soal
    }
})