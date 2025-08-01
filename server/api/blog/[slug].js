export default defineEventHandler(async (event) => {
  const { slug } = event.context.params

  const blog = await prisma.blog.findUnique({
    where: {
      slug: slug
    }
  })

  if (!blog) {
    return {
      status: 404,
      message: 'Blog not found',
      data: null
    }
  }

  return {
    status: 200,
    message: 'Berhasil mendapatkan data blog',
    data: blog
  }
})
