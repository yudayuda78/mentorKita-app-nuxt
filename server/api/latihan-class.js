import prisma from '../prisma/client.js'

export default defineEventHandler(async () => {
const kelas = await prisma.latihanClass.findMany({
    include: {
      courses: {
        include: {
          materi: {          // ganti dari 'materials' ke 'materi'
            include: {
              soal: true     // ganti dari 'soals' ke 'soal'
            }
          }
        }
      }
    }
  })

  return kelas
})