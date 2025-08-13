import prisma from "../../prisma/client.js"


export default defineEventHandler(async (event) => {

    const blog = await prisma.blog.findMany({
        orderBy: {
            createdAt: 'desc'
        },
    })

     return {
    status: 200,
    message: 'Berhasil mendapatkan data blog',
    data: blog
  };
})