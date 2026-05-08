import prisma from "@/server/prisma/client.js";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  try {
    const slug = body.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");

    const miniquiz = await prisma.miniQuiz.create({
      data: {
        title: body.title,
        slug: slug,
        description: body.description,
        thumbnail: body.thumbnailUrl,
      },
    });

    return {
      data: miniquiz,
      message: "Success create miniquiz",
      status: 200,
    };
  } catch (error) {
    console.error(error);
    return {
      status: 500,
      message: "Failed to create miniquiz",
    };
  }
});