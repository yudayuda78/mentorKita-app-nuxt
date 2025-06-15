export default defineEventHandler( async (event) => {
    const { jawaban } = await readBody(event)
    console.log(jawaban)
    
    if (!Array.isArray(jawaban)) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Format jawaban salah seharusnya array',
        })
    }

    const data = await prisma.answerLatihanUser.createMany({
    data: jawaban.map((j) => ({
        userId: j.userId,
        soalId: j.soalId,
        jawaban: j.jawaban,
        benar: j.benar,
        materiSoal: j.materiSoal
    })),
        skipDuplicates: true, // agar tidak double insert jika sudah ada
    })

    return { success: true, inserted: data.count }
})