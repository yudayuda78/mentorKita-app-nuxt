import prisma from '../prisma/client.js'

export default defineEventHandler(async () => {
  try {
        const data = await prisma.latihanClass.findMany()
        return data
  } catch (error) {
        console.log(error)
  }
})