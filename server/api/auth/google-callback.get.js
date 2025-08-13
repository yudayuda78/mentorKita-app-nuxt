import { google } from 'googleapis'
import { setCookie } from 'h3'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import prisma from "../../prisma/client.js"



export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const code = query.code

  const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.GOOGLE_REDIRECT_URI
  )

  const { tokens } = await oauth2Client.getToken(code)
  oauth2Client.setCredentials(tokens)

  const oauth2 = google.oauth2({ version: 'v2', auth: oauth2Client })
  const { data } = await oauth2.userinfo.get()

  // Cari user di database
  let user = await prisma.user.findUnique({
    where: { email: data.email }
  })

  // Kalau belum ada, buat user baru
  if (!user) {
    user = await prisma.user.create({
      data: {
        email: data.email,
        provider: 'google',
        username: (data.name || data.email).toLowerCase().replace(/\s/g, '') + Math.floor(Math.random() * 10000),
        password: await bcrypt.hash(crypto.randomUUID(), 10)
      }
    })
  }

  // Buat token (sama seperti login biasa)
  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '7d' })

  // Simpan ke cookie
  setCookie(event, 'token', token, {
    httpOnly: true,
    path: '/',
    maxAge: 60 * 60 * 24 * 7
  })

  return sendRedirect(event, '/') // arahkan ke halaman setelah login
})
