# 📚 Lelink Solar API 文档

## 概述

Lelink Solar API 提供了完整的后端服务，支持联系表单、报价请求、邮件订阅等功能。

## 基础信息

- **Base URL**: `https://api.lelinksolar.com` (生产环境)
- **开发环境**: `http://localhost:5000`
- **API版本**: v1
- **认证方式**: 无需认证 (公开API)

## 响应格式

所有API响应都使用JSON格式：

```json
{
  "success": true,
  "message": "操作成功",
  "data": {},
  "error": null
}
```

错误响应：

```json
{
  "success": false,
  "message": "错误描述",
  "data": null,
  "error": {
    "code": "ERROR_CODE",
    "details": "详细错误信息"
  }
}
```

## API 端点

### 1. 联系表单

**POST** `/api/contact`

提交联系表单数据。

#### 请求参数

```json
{
  "name": "string (必填, 2-50字符)",
  "email": "string (必填, 有效邮箱格式)",
  "phone": "string (可选, 有效电话号码)",
  "company": "string (可选, 公司名称)",
  "message": "string (必填, 10-1000字符)",
  "product": "string (可选, 产品兴趣)"
}
```

#### 响应示例

成功响应：
```json
{
  "success": true,
  "message": "Message sent successfully",
  "data": {
    "id": "contact_123",
    "timestamp": "2024-01-15T10:30:00Z"
  }
}
```

错误响应：
```json
{
  "success": false,
  "message": "Validation failed",
  "error": {
    "code": "VALIDATION_ERROR",
    "details": ["Name must be between 2 and 50 characters"]
  }
}
```

#### 速率限制

- 每个IP地址15分钟内最多3次请求
- 超出限制返回429状态码

### 2. 报价请求

**POST** `/api/quote`

提交产品报价请求。

#### 请求参数

```json
{
  "name": "string (必填, 2-50字符)",
  "email": "string (必填, 有效邮箱格式)",
  "phone": "string (可选, 有效电话号码)",
  "company": "string (可选, 公司名称)",
  "country": "string (可选, 国家)",
  "product": "string (必填, 产品名称)",
  "quantity": "string (可选, 数量)",
  "powerRequirements": "string (可选, 功率需求)",
  "application": "string (可选, 应用场景)",
  "additionalInfo": "string (可选, 附加信息)"
}
```

#### 响应示例

成功响应：
```json
{
  "success": true,
  "message": "Quote request submitted successfully",
  "data": {
    "id": "quote_456",
    "timestamp": "2024-01-15T10:30:00Z"
  }
}
```

### 3. 邮件订阅

**POST** `/api/newsletter`

订阅邮件通讯。

#### 请求参数

```json
{
  "email": "string (必填, 有效邮箱格式)"
}
```

#### 响应示例

成功响应：
```json
{
  "success": true,
  "message": "Successfully subscribed to newsletter",
  "data": {
    "id": "sub_789",
    "timestamp": "2024-01-15T10:30:00Z"
  }
}
```

## 错误代码

| 代码 | 描述 | HTTP状态码 |
|------|------|------------|
| `VALIDATION_ERROR` | 输入验证失败 | 400 |
| `RATE_LIMIT_EXCEEDED` | 请求频率超限 | 429 |
| `EMAIL_SEND_FAILED` | 邮件发送失败 | 500 |
| `INTERNAL_ERROR` | 服务器内部错误 | 500 |

## 安全特性

### 输入验证
- 所有输入都经过严格验证
- XSS防护和HTML标签过滤
- 邮箱和电话号码格式验证

### 速率限制
- 基于IP地址的请求频率限制
- 防止垃圾邮件和滥用

### 安全头
- CORS配置
- 安全HTTP头设置
- 输入清理和验证

## 使用示例

### JavaScript/TypeScript

```typescript
// 提交联系表单
async function submitContactForm(data: ContactFormData) {
  try {
    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();
    
    if (result.success) {
      console.log('表单提交成功:', result.message);
    } else {
      console.error('表单提交失败:', result.error);
    }
  } catch (error) {
    console.error('网络错误:', error);
  }
}

// 提交报价请求
async function submitQuoteRequest(data: QuoteRequestData) {
  const response = await fetch('/api/quote', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  return response.json();
}

// 订阅邮件
async function subscribeNewsletter(email: string) {
  const response = await fetch('/api/newsletter', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email }),
  });

  return response.json();
}
```

### cURL 示例

```bash
# 提交联系表单
curl -X POST https://api.lelinksolar.com/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "+1234567890",
    "message": "I am interested in your solar generators."
  }'

# 提交报价请求
curl -X POST https://api.lelinksolar.com/api/quote \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Jane Smith",
    "email": "jane@example.com",
    "product": "LE Solar Generator",
    "quantity": "2",
    "application": "Home backup"
  }'

# 订阅邮件
curl -X POST https://api.lelinksolar.com/api/newsletter \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com"
  }'
```

## 环境变量配置

### 必需的环境变量

```bash
# 数据库配置
MONGODB_URI=mongodb://localhost:27017/lelink-solar

# 邮件服务配置
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password

# 邮件地址配置
FROM_EMAIL=noreply@lelinksolar.com
CONTACT_EMAIL=chris@lelinksolar.com
QUOTE_EMAIL=sales@lelinksolar.com

# 服务器配置
PORT=5000
NODE_ENV=production
```

### 可选的环境变量

```bash
# JWT配置
JWT_SECRET=your-jwt-secret
JWT_EXPIRES_IN=7d

# Cloudinary配置
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret

# CORS配置
FRONTEND_URL=https://lelinksolar.com
```

## 部署说明

### 使用 Docker

```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .

RUN npm run build

EXPOSE 5000

CMD ["npm", "start"]
```

### 使用 PM2

```bash
# 安装PM2
npm install -g pm2

# 启动应用
pm2 start dist/index.js --name lelink-api

# 设置开机自启
pm2 startup
pm2 save
```

## 监控和日志

### 日志级别
- ERROR: 错误信息
- WARN: 警告信息
- INFO: 一般信息
- DEBUG: 调试信息

### 监控指标
- API响应时间
- 错误率
- 请求量
- 邮件发送成功率

## 支持

如有问题，请联系：
- 技术支持: tech@lelinksolar.com
- API文档: https://docs.lelinksolar.com
- GitHub: https://github.com/lelinksolar/api
