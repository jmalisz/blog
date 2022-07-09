import {
  TransactionalEmailsApi,
  SendSmtpEmail,
  TransactionalEmailsApiApiKeys,
} from 'sib-api-v3-typescript'

const apiInstance = new TransactionalEmailsApi()

apiInstance.setApiKey(
  TransactionalEmailsApiApiKeys.apiKey,
  process.env.SEND_IN_BLUE_API_KEY
)

// Uses https://developers.sendinblue.com/docs
export async function sendEmail({ to, subject, htmlContent }: SendSmtpEmail) {
  const sendSmtpEmail = new SendSmtpEmail()

  sendSmtpEmail.sender = {
    name: 'Jakub Maliszewski blog',
    email: 'maliszewski@blog.com',
  }
  sendSmtpEmail.to = to
  sendSmtpEmail.subject = subject
  sendSmtpEmail.htmlContent = htmlContent

  const info = await apiInstance.sendTransacEmail(sendSmtpEmail)

  return info
}
