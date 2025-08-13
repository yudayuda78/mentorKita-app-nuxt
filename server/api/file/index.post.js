// server/api/file.ts
import { writeFile, mkdir } from 'fs/promises'
import { join } from 'path'


export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const files = body.files || []

  // Pastikan folder tujuan ada
  const uploadDir = join(process.cwd(), 'public', 'uploads')
  await mkdir(uploadDir, { recursive: true })

  for (const file of files) {
    if (!file.content || !file.name) continue

    // Ambil base64 data-nya
    const base64Data = file.content.split(',')[1]
    const buffer = Buffer.from(base64Data, 'base64')

    // Simpan ke file
    await writeFile(join(uploadDir, file.name), buffer)
  }

  return {
    success: true,
    total: files.length,
  }
})
