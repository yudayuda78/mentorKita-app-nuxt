import prisma from "../../../../prisma/client.js"

export default defineEventHandler(async(event) => {
    const id = event.context.params.id
    const body = await readBody(event)
    const { nomorSoal, question, type, optionA, optionB, optionC, optionD, optionE, correctOption, correctEssay, materiSoal } = body

    const soal = await prisma.latihanSoal.update({
        where: {
            id: parseInt(id)
        },
        data: {
            nomorSoal: nomorSoal ? parseInt(nomorSoal) : null,
            question: question,
            type: type,
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
        message: 'Data berhasil diupdate',
        data: soal
    }
})