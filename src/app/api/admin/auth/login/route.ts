import { NextRequest, NextResponse } from 'next/server'
import { SignJWT } from 'jose'

// 模拟用户数据（实际应从数据库读取）
const users = [
  {
    id: 1,
    username: 'admin',
    password: 'admin123', // 实际应该是哈希后的密码
    email: 'admin@lelinksolar.com',
    role: 'admin'
  }
]

// JWT密钥
const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'your-secret-key-change-in-production'
)

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { username, password } = body

    if (!username || !password) {
      return NextResponse.json({
        success: false,
        error: 'Username and password are required'
      }, { status: 400 })
    }

    // 查找用户
    const user = users.find(u => u.username === username)

    if (!user) {
      return NextResponse.json({
        success: false,
        error: 'Invalid credentials'
      }, { status: 401 })
    }

    // 验证密码（实际应使用bcrypt比较哈希）
    if (user.password !== password) {
      return NextResponse.json({
        success: false,
        error: 'Invalid credentials'
      }, { status: 401 })
    }

    // 生成JWT token
    const token = await new SignJWT({
      userId: user.id,
      username: user.username,
      role: user.role
    })
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setExpirationTime('24h')
      .sign(JWT_SECRET)

    // 返回用户信息和token
    return NextResponse.json({
      success: true,
      data: {
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          role: user.role
        },
        token
      },
      message: 'Login successful'
    })
  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json({
      success: false,
      error: 'Login failed'
    }, { status: 500 })
  }
}

