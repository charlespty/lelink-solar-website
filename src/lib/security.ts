// 安全工具函数

// 输入验证
export function sanitizeInput(input: string): string {
  return input
    .trim()
    .replace(/[<>]/g, '') // 移除HTML标签
    .replace(/javascript:/gi, '') // 移除javascript协议
    .replace(/on\w+=/gi, '') // 移除事件处理器
}

// 邮箱验证
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

// 电话号码验证
export function isValidPhone(phone: string): boolean {
  const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/
  return phoneRegex.test(phone.replace(/[\s\-\(\)]/g, ''))
}

// 防止XSS攻击
export function escapeHtml(text: string): string {
  const map: { [key: string]: string } = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  }
  return text.replace(/[&<>"']/g, (m) => map[m])
}

// 限制输入长度
export function validateLength(input: string, min: number, max: number): boolean {
  return input.length >= min && input.length <= max
}

// 验证表单数据
export interface FormValidationResult {
  isValid: boolean
  errors: string[]
}

export function validateContactForm(data: {
  name: string
  email: string
  phone?: string
  message: string
}): FormValidationResult {
  const errors: string[] = []

  // 验证姓名
  if (!data.name || !validateLength(data.name, 2, 50)) {
    errors.push('Name must be between 2 and 50 characters')
  }

  // 验证邮箱
  if (!data.email || !isValidEmail(data.email)) {
    errors.push('Please enter a valid email address')
  }

  // 验证电话（可选）
  if (data.phone && !isValidPhone(data.phone)) {
    errors.push('Please enter a valid phone number')
  }

  // 验证消息
  if (!data.message || !validateLength(data.message, 10, 1000)) {
    errors.push('Message must be between 10 and 1000 characters')
  }

  return {
    isValid: errors.length === 0,
    errors
  }
}

// 验证报价请求表单
export function validateQuoteForm(data: {
  name: string
  email: string
  phone?: string
  product: string
  quantity?: string
}): FormValidationResult {
  const errors: string[] = []

  // 验证姓名
  if (!data.name || !validateLength(data.name, 2, 50)) {
    errors.push('Name must be between 2 and 50 characters')
  }

  // 验证邮箱
  if (!data.email || !isValidEmail(data.email)) {
    errors.push('Please enter a valid email address')
  }

  // 验证电话（可选）
  if (data.phone && !isValidPhone(data.phone)) {
    errors.push('Please enter a valid phone number')
  }

  // 验证产品
  if (!data.product || !validateLength(data.product, 1, 100)) {
    errors.push('Please select a product')
  }

  // 验证数量（可选）
  if (data.quantity && isNaN(Number(data.quantity))) {
    errors.push('Quantity must be a valid number')
  }

  return {
    isValid: errors.length === 0,
    errors
  }
}

// 速率限制（简单实现）
const rateLimitMap = new Map<string, { count: number; resetTime: number }>()

export function checkRateLimit(
  identifier: string, 
  maxRequests: number = 5, 
  windowMs: number = 15 * 60 * 1000 // 15分钟
): boolean {
  const now = Date.now()
  const record = rateLimitMap.get(identifier)

  if (!record || now > record.resetTime) {
    rateLimitMap.set(identifier, {
      count: 1,
      resetTime: now + windowMs
    })
    return true
  }

  if (record.count >= maxRequests) {
    return false
  }

  record.count++
  return true
}

// 清理过期的速率限制记录
export function cleanupRateLimit(): void {
  const now = Date.now()
  for (const [key, record] of rateLimitMap.entries()) {
    if (now > record.resetTime) {
      rateLimitMap.delete(key)
    }
  }
}

// 定期清理（每5分钟）
setInterval(cleanupRateLimit, 5 * 60 * 1000)
