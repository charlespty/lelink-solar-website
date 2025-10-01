import sgMail from '@sendgrid/mail'
import { EmailData } from '../types'

// Initialize SendGrid
sgMail.setApiKey(process.env.SENDGRID_API_KEY!)

export const sendEmail = async (emailData: EmailData): Promise<void> => {
  try {
    const msg = {
      to: emailData.to,
      from: {
        email: process.env.FROM_EMAIL || 'noreply@lelinksolar.com',
        name: process.env.FROM_NAME || 'Lelink Solar'
      },
      subject: emailData.subject,
      text: emailData.text,
      html: emailData.html
    }

    await sgMail.send(msg)
    console.log('Email sent successfully to:', emailData.to)
  } catch (error) {
    console.error('Error sending email:', error)
    throw new Error('Failed to send email')
  }
}

export const sendBulkEmail = async (emails: string[], subject: string, html: string): Promise<void> => {
  try {
    const messages = emails.map(email => ({
      to: email,
      from: {
        email: process.env.FROM_EMAIL || 'noreply@lelinksolar.com',
        name: process.env.FROM_NAME || 'Lelink Solar'
      },
      subject,
      html
    }))

    await sgMail.send(messages)
    console.log(`Bulk email sent successfully to ${emails.length} recipients`)
  } catch (error) {
    console.error('Error sending bulk email:', error)
    throw new Error('Failed to send bulk email')
  }
}
