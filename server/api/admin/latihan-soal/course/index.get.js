import prisma from "../../../../prisma/client.js"


export default defineEventHandler(async(event) => {
    const courses = await prisma.latihanCourse.findMany()

    return {
        statusCode: 200,
        data: courses
    }
})