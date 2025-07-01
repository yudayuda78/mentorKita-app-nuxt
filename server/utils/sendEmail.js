import nodemailer from 'nodemailer'

export async function sendEmail(to, subject, text){
    const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        secure: process.env.SMTP_SECURE === 'true', // true for 465, false for other ports
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS
        }
    })

    await transporter.sendMail({
        from: `"MentorKita" <${process.env.SMTP_USER}>`, // Sender address
        to: to,
        subject: subject,   
        text: text
    })
}