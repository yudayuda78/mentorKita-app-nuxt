export default defineEventHandler(async () => {
  await updateSoalDifficulty()
  return { success: true, message: 'Difficulty berhasil diperbarui' }
})