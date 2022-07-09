import type { QueryResolvers, MutationResolvers } from 'types/graphql'

import { validate } from '@redwoodjs/api'

import { db } from 'src/lib/db'
import { sendEmail } from 'src/lib/email'

export const contacts: QueryResolvers['contacts'] = () => {
  return db.contact.findMany()
}

export const contact: QueryResolvers['contact'] = ({ id }) => {
  return db.contact.findUnique({
    where: { id },
  })
}

export const createContact: MutationResolvers['createContact'] = ({
  input,
}) => {
  validate(input.email, 'email', { email: true })

  sendEmail({
    to: [{ email: input.email }],
    subject: 'Responding to your message',
    textContent: `Hi ${input.name}, thanks for your message! I'm glad that you found my blog.`,
  })

  return db.contact.create({
    data: input,
  })
}
