export default defineEventHandler( async () => {
    const tryout = await prisma.snbtTryout.findMany()


    return {
    status: 200,
    data: tryout,
  } 
})