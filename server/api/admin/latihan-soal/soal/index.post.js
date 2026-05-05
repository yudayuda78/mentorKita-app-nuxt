import prisma from '../../../../prisma/client.js'

export default defineEventHandler(async(event) => {
    const body = await readBody(event)
    const { title, materiId, questions, duration } = body

    const soal = await prisma.latihanSoal.create({
        data: {
            materiId: parseInt(materiId),
            questions: questions,
            duration: parseInt(duration)
        }
    })

    return {
        statusCode: 200,
        message: 'Data berhasil ditambahkan',
        data: soal
    }
})
