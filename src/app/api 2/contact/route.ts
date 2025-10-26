import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'
import { validateContactForm, checkRateLimit, sanitizeInput } from '@/lib/security'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, phone, company, message, product } = body

    // 获取客户端IP用于速率限制
    const clientIP = request.headers.get('x-forwarded-for') || 
                     request.headers.get('x-real-ip') || 
                     'unknown'

    // 检查速率限制
    if (!checkRateLimit(clientIP, 3, 15 * 60 * 1000)) { // 15分钟内最多3次请求
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429 }
      )
    }

    // 清理输入数据
    const cleanData = {
      name: sanitizeInput(name),
      email: sanitizeInput(email),
      phone: phone ? sanitizeInput(phone) : '',
      company: company ? sanitizeInput(company) : '',
      message: sanitizeInput(message),
      product: product ? sanitizeInput(product) : ''
    }

    // 验证表单数据
    const validation = validateContactForm(cleanData)
    if (!validation.isValid) {
      return NextResponse.json(
        { error: 'Validation failed', details: validation.errors },
        { status: 400 }
      )
    }

    // 创建邮件传输器
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    })

    // 邮件内容
    const mailOptions = {
      from: process.env.FROM_EMAIL || 'noreply@lelinksolar.com',
      to: process.env.CONTACT_EMAIL || 'chris@lelinksolar.com',
      subject: `New Contact Form Submission from ${cleanData.name}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${cleanData.name}</p>
        <p><strong>Email:</strong> ${cleanData.email}</p>
        <p><strong>Phone:</strong> ${cleanData.phone || 'Not provided'}</p>
        <p><strong>Company:</strong> ${cleanData.company || 'Not provided'}</p>
        <p><strong>Product Interest:</strong> ${cleanData.product || 'General inquiry'}</p>
        <p><strong>Message:</strong></p>
        <p>${cleanData.message.replace(/\n/g, '<br>')}</p>
        <hr>
        <p><em>Sent from Lelink Solar website contact form</em></p>
        <p><em>IP: ${clientIP}</em></p>
      `,
    }

    // 发送邮件
    await transporter.sendMail(mailOptions)

    // 发送确认邮件给用户
    const confirmationMailOptions = {
      from: process.env.FROM_EMAIL || 'noreply@lelinksolar.com',
      to: cleanData.email,
      subject: 'Thank you for contacting Lelink Solar',
      html: `
        <h2>Thank you for contacting Lelink Solar!</h2>
        <p>Dear ${cleanData.name},</p>
        <p>We have received your message and will get back to you within 24 hours.</p>
        <p><strong>Your message:</strong></p>
        <p>${cleanData.message.replace(/\n/g, '<br>')}</p>
        <hr>
        <p>Best regards,<br>Lelink Solar Team</p>
        <p><em>This is an automated response. Please do not reply to this email.</em></p>
      `,
    }

    await transporter.sendMail(confirmationMailOptions)

    return NextResponse.json(
      { message: 'Message sent successfully' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json(
      { error: 'Failed to send message' },
      { status: 500 }
    )
  }
}
