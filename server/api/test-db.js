import prisma from '../prisma/client.js'

export default defineEventHandler(async () => {
  try {
    await prisma.$connect()
    return { status: 'success', message: 'Database connected!' }
  } catch (error) {
    return { status: 'error', message: error.message }
  }
})