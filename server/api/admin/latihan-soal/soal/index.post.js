import prisma from '../../../../prisma/client.js'

export default defineEventHandler(async(event) => {
    const body = await readBody(event)
    const { materiId, nomorSoal, question, type, optionA, optionB, optionC, optionD, optionE, correctOption, correctEssay, materiSoal } = body

    const soal = await prisma.latihanSoal.create({
        data: {
            materiId: parseInt(materiId),
            nomorSoal: nomorSoal ? parseInt(nomorSoal) : null,
            question: question,
            type: type || "PILIHAN_GANDA",
            optionA: optionA,
            optionB: optionB,
            optionC: optionC,
            optionD: optionD,
            optionE: optionE,
            correctOption: type === 'PILIHAN_GANDA' ? correctOption : null,
            correctEssay: type === 'ESAI' ? correctEssay : null,
            materiSoal: materiSoal
        }
    })

    return {
        statusCode: 200,
        message: 'Data berhasil ditambahkan',
        data: soal
    }
})
