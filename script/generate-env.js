import { writeFileSync } from 'fs'

const content = `# Example ENV for MentorKita App

# Base URL
NUXT_PUBLIC_BASE_URL=http://localhost:3000

# SMTP (untuk kirim email reset password)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
SMTP_SECURE=true
SMTP_USER=youremail@gmail.com
SMTP_PASS=yourapppassword
`

writeFileSync('.env.example', content)
console.log('.env.example berhasil dibuat ✅')
