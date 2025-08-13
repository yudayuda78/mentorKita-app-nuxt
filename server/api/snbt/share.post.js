import prisma from "../../prisma/client.js"


export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    const { userId, snbtTryoutId, snbtTryoutName} = body

    const shared = await prisma.shareSnbt.create({
    data: {
      isShared: true,
      user: {
        connect: { id: userId },
      },
      snbtTryout: {
        connect: { id: snbtTryoutId },
      },
    },
  })

    return {
        status: 'success',
        message: 'SNBT Tryout berhasil dibagikan',
        data: shared,
    }
})