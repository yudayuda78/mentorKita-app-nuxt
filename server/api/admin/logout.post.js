import { deleteCookie } from 'h3'

export default defineEventHandler((event) => {
  deleteCookie(event, 'token', {
    path: '/mentorkita-admin',
    httpOnly: true,
    sameSite: 'strict',
  })

  return {
    message: 'Berhasil logout',
  }
})
