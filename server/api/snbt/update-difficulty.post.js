export default defineEventHandler(async (event) => {
  await requireAdmin(event)
  await updateSoalDifficulty()
  return { success: true, message: 'Difficulty berhasil diperbarui' }
})