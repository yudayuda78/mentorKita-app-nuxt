import prisma from "../../../prisma/client.js"

export default defineEventHandler(async(event) => {
    const id = event.context.params.id

    if(!id){
        return sendError(event, createError({
            statusCode: 400,
            statusMessage: 'ID tidak ditemukan dalam parameter URL'
        }))
    }


    const materi = await prisma.snbtTryoutMateri.findUnique({
        where : {
           id: Number(id)
        }
    })

    return {
    success: true, // ✅ pastikan ini adalah key dalam object
    data: materi
  }
})