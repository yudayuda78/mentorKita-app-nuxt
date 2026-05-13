import prisma from "@/server/prisma/client.js";

export default defineEventHandler(async (event) => {
  try {
    const id = event.context.params.id;
    const miniquiz = await prisma.miniQuiz.findUnique({
      where: {
        id: parseInt(id),
      },
      include: {
        soalMiniQuiz: true,
      },
    });

    if (!miniquiz) {
      return {
        status: 404,
        message: "Miniquiz not found",
      };
    }

    return {
      data: miniquiz,
      message: "Success get miniquiz detail",
      status: 200,
    };
  } catch (error) {
    console.error(error);
    return {
      status: 500,
      message: "Failed to get miniquiz detail",
    };
  }
});
