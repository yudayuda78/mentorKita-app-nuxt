import { deleteCookie } from 'h3'

export default defineEventHandler((event) => {
  deleteCookie(event, 'token', {
    path: '/',
    httpOnly: true,
    sameSite: 'strict',
  })

  return {
    message: 'Berhasil logout',
  }
})
