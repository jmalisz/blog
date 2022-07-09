import { createTransport } from 'nodemailer'

interface Options {
  to: string | string[]
  subject: string
  text?: string
  html: string
}

export async function sendEmail({ to, subject, text, html }: Options) {
  // create reusable transporter object using SendInBlue for SMTP
  const transporter = createTransport({
    host: 'smtp-relay.sendinblue.com',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.SEND_IN_BLUE_LOGIN,
      pass: process.env.SEND_IN_BLUE_KEY,
    },
  })

  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: `Jakub Maliszewski blog <nope@mail.com>`,
    to: Array.isArray(to) ? to : [to],
    subject,
    text,
    html,
  })

  return info
}
