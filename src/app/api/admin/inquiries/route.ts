import { NextRequest, NextResponse } from 'next/server'

interface Inquiry {
  id: number
  customer: string
  email: string
  phone: string
  product: string
  message: string
  date: string
  status: 'pending' | 'replied' | 'closed'
}

// 模拟数据存储（实际应使用数据库）
let inquiries: Inquiry[] = [
  {
    id: 1,
    customer: '张三',
    email: 'zhangsan@example.com',
    phone: '+86 138 1234 5678',
    product: 'LK Solar Generator',
    message: '我对这款产品很感兴趣，请问有什么优惠吗？',
    date: '2024-10-26',
    status: 'pending'
  },
  {
    id: 2,
    customer: 'John Smith',
    email: 'john@example.com',
    phone: '+1 234 567 8900',
    product: 'LP Foldable Solar Panel',
    message: 'I need 10 units. What is the wholesale price?',
    date: '2024-10-25',
    status: 'replied'
  },
  {
    id: 3,
    customer: '李四',
    email: 'lisi@example.com',
    phone: '+86 139 8765 4321',
    product: 'LT Fixed Solar Panel',
    message: '请问产品的质保期是多久？',
    date: '2024-10-24',
    status: 'pending'
  },
]

// GET - 获取所有询价
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status')
    const search = searchParams.get('search')

    let filteredInquiries = [...inquiries]

    // 按状态筛选
    if (status && status !== 'all') {
      filteredInquiries = filteredInquiries.filter(inq => inq.status === status)
    }

    // 按关键词搜索
    if (search) {
      const searchLower = search.toLowerCase()
      filteredInquiries = filteredInquiries.filter(inq =>
        inq.customer.toLowerCase().includes(searchLower) ||
        inq.email.toLowerCase().includes(searchLower) ||
        inq.product.toLowerCase().includes(searchLower)
      )
    }

    return NextResponse.json({
      success: true,
      data: filteredInquiries,
      total: filteredInquiries.length,
      stats: {
        pending: inquiries.filter(i => i.status === 'pending').length,
        replied: inquiries.filter(i => i.status === 'replied').length,
        closed: inquiries.filter(i => i.status === 'closed').length,
        total: inquiries.length
      }
    })
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: 'Failed to fetch inquiries'
    }, { status: 500 })
  }
}

// POST - 创建新询价（来自网站表单）
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    if (!body.customer || !body.email || !body.message) {
      return NextResponse.json({
        success: false,
        error: 'Missing required fields'
      }, { status: 400 })
    }

    const newInquiry: Inquiry = {
      id: inquiries.length + 1,
      customer: body.customer,
      email: body.email,
      phone: body.phone || '',
      product: body.product || 'General Inquiry',
      message: body.message,
      date: new Date().toISOString().split('T')[0],
      status: 'pending'
    }

    inquiries.push(newInquiry)

    return NextResponse.json({
      success: true,
      data: newInquiry,
      message: 'Inquiry submitted successfully'
    }, { status: 201 })
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: 'Failed to create inquiry'
    }, { status: 500 })
  }
}

// PATCH - 更新询价状态
export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json()
    const { id, status } = body

    if (!id || !status) {
      return NextResponse.json({
        success: false,
        error: 'ID and status are required'
      }, { status: 400 })
    }

    const inquiryIndex = inquiries.findIndex(inq => inq.id === parseInt(id))

    if (inquiryIndex === -1) {
      return NextResponse.json({
        success: false,
        error: 'Inquiry not found'
      }, { status: 404 })
    }

    inquiries[inquiryIndex].status = status
    
    return NextResponse.json({
      success: true,
      data: inquiries[inquiryIndex],
      message: 'Inquiry status updated successfully'
    })
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: 'Failed to update inquiry'
    }, { status: 500 })
  }
}

// DELETE - 删除询价
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json({
        success: false,
        error: 'Inquiry ID is required'
      }, { status: 400 })
    }

    const inquiryIndex = inquiries.findIndex(inq => inq.id === parseInt(id))

    if (inquiryIndex === -1) {
      return NextResponse.json({
        success: false,
        error: 'Inquiry not found'
      }, { status: 404 })
    }

    inquiries.splice(inquiryIndex, 1)

    return NextResponse.json({
      success: true,
      message: 'Inquiry deleted successfully'
    })
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: 'Failed to delete inquiry'
    }, { status: 500 })
  }
}

