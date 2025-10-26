import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { 
      name, 
      email, 
      phone, 
      company, 
      country, 
      product, 
      quantity, 
      powerRequirements, 
      application, 
      additionalInfo 
    } = body

    // 验证必填字段
    if (!name || !email || !product) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // 验证邮箱格式
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
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
      to: process.env.QUOTE_EMAIL || 'sales@lelinksolar.com',
      subject: `New Quote Request from ${name} - ${product}`,
      html: `
        <h2>New Quote Request</h2>
        <h3>Customer Information</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
        <p><strong>Company:</strong> ${company || 'Not provided'}</p>
        <p><strong>Country:</strong> ${country || 'Not provided'}</p>
        
        <h3>Product Requirements</h3>
        <p><strong>Product:</strong> ${product}</p>
        <p><strong>Quantity:</strong> ${quantity || 'Not specified'}</p>
        <p><strong>Power Requirements:</strong> ${powerRequirements || 'Not specified'}</p>
        <p><strong>Application:</strong> ${application || 'Not specified'}</p>
        
        <h3>Additional Information</h3>
        <p>${additionalInfo || 'No additional information provided'}</p>
        
        <hr>
        <p><em>Sent from Lelink Solar website quote request form</em></p>
      `,
    }

    // 发送邮件
    await transporter.sendMail(mailOptions)

    // 发送确认邮件给用户
    const confirmationMailOptions = {
      from: process.env.FROM_EMAIL || 'noreply@lelinksolar.com',
      to: email,
      subject: 'Quote Request Received - Lelink Solar',
      html: `
        <h2>Thank you for your quote request!</h2>
        <p>Dear ${name},</p>
        <p>We have received your quote request for <strong>${product}</strong> and our sales team will contact you within 24 hours with a detailed quotation.</p>
        
        <h3>Your Request Summary:</h3>
        <ul>
          <li><strong>Product:</strong> ${product}</li>
          <li><strong>Quantity:</strong> ${quantity || 'Not specified'}</li>
          <li><strong>Application:</strong> ${application || 'Not specified'}</li>
        </ul>
        
        <p>If you have any urgent questions, please don't hesitate to contact us directly.</p>
        
        <hr>
        <p>Best regards,<br>Lelink Solar Sales Team</p>
        <p><em>This is an automated response. Please do not reply to this email.</em></p>
      `,
    }

    await transporter.sendMail(confirmationMailOptions)

    return NextResponse.json(
      { message: 'Quote request submitted successfully' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Quote request error:', error)
    return NextResponse.json(
      { error: 'Failed to submit quote request' },
      { status: 500 }
    )
  }
}
