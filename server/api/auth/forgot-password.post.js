

export default defineEventHandler(async (event) => {
    const { email } = await readBody(event)

  const user = await getUserByEmail(email)
    if (!user) {
      throw createError({ statusCode: 404, statusMessage: "User not found" })
    }

    const token = generateToken()
      await saveToken(email, token)

  const baseUrl = useRuntimeConfig().public.baseUrl
  const resetLink = `${baseUrl}/auth/reset-password?token=${token}&email=${email}`

   await sendEmail(email, 'Reset Password', `
    Klik link berikut untuk reset password kamu:\n${resetLink}
  `)

  return { message: 'Link reset telah dikirim ke email.' }
})