import { deleteCookie } from 'h3'


export default defineEventHandler((event) => {
  deleteCookie(event, 'admin_token', {
    path: '/',
    httpOnly: true,
    sameSite: 'lax',
  })

  return {
    message: 'Berhasil logout',
  }
})
