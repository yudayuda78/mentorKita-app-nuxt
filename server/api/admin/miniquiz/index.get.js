import prisma from "@/server/prisma/client.js";

export default defineEventHandler(async (event) => {
  try {
    const miniquiz = await prisma.miniQuiz.findMany();
    return {
      data: miniquiz,
      message: "Success get miniquiz",
      status: 200,
    };
  } catch (error) {
    console.error(error);
    return {
      status: 500,
      message: "Failed to get miniquiz",
    };
  }
});