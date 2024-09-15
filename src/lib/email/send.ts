import { Resend } from 'resend'

const RESEND_API_KEY = import.meta.env.RESEND_API_KEY
const resend = new Resend(RESEND_API_KEY)

interface EmailParams {
  from: string
  to: string[]
  subject: string
  html: string
}

export const SendEmail = async (params: EmailParams): Promise<boolean> => {
  const { error } = await resend.emails.send(params)
  if (error) return false
  return true
}
