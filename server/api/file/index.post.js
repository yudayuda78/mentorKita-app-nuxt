import { writeFile, mkdir } from 'fs/promises'
import { join, resolve, extname, basename } from 'path'
import { randomUUID } from 'crypto'

const MAX_FILES = 10
const MAX_FILE_BYTES = 5 * 1024 * 1024
const ALLOWED_EXT = ['.jpg', '.jpeg', '.png', '.webp', '.pdf']
const ALLOWED_FOLDERS = ['uploads', 'blog', 'questionImage', 'miniQuizImage']

export default defineEventHandler(async (event) => {
  await requireUser(event)

  const body = await readBody(event)
  const files = Array.isArray(body?.files) ? body.files : []
  const folder = ALLOWED_FOLDERS.includes(body?.folder) ? body.folder : 'uploads'

  if (!files.length) {
    throw createError({ statusCode: 400, statusMessage: 'Tidak ada file yang dikirim.' })
  }
  if (files.length > MAX_FILES) {
    throw createError({ statusCode: 400, statusMessage: `Maksimal ${MAX_FILES} file.` })
  }

  const uploadDir = join(process.cwd(), 'public', folder)
  await mkdir(uploadDir, { recursive: true })

  const saved = []

  for (const file of files) {
    if (!file?.content || !file?.name) continue

    const originalExt = extname(basename(String(file.name))).toLowerCase()
    if (!ALLOWED_EXT.includes(originalExt)) {
      throw createError({
        statusCode: 400,
        statusMessage: `Tipe file tidak diizinkan: ${originalExt || 'tanpa ekstensi'}.`,
      })
    }

    const base64Data = String(file.content).split(',')[1]
    if (!base64Data) continue

    const buffer = Buffer.from(base64Data, 'base64')
    if (buffer.length > MAX_FILE_BYTES) {
      throw createError({ statusCode: 400, statusMessage: 'Ukuran file melebihi 5MB.' })
    }

    const safeName = `${randomUUID()}${originalExt}`
    const targetPath = resolve(uploadDir, safeName)

    if (!targetPath.startsWith(resolve(uploadDir))) {
      throw createError({ statusCode: 400, statusMessage: 'Nama file tidak valid.' })
    }

    await writeFile(targetPath, buffer)
    saved.push(`/${folder}/${safeName}`)
  }

  return {
    success: true,
    total: saved.length,
    files: saved,
  }
})
