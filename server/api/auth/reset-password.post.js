export default defineEventHandler(async (event) => {
    const {token, email, password, passwordConfirm} = await readBody(event)

    if (password !== passwordConfirm) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Password tidak cocok'
        })
    }

    const valid = await verifyToken(email, token)
    if (!valid) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Token tidak valid atau sudah kadaluarsa'
        })
    }

    await updateUserPassword(email, password)
  await removeToken(email)

  return { message: 'Password berhasil direset.' }

})