# 🔌 后台管理系统 API 文档

## 📋 目录

- [认证API](#认证api)
- [产品管理API](#产品管理api)
- [内容管理API](#内容管理api)
- [询价管理API](#询价管理api)
- [文件上传API](#文件上传api)

---

## 🔐 认证API

### 登录

**端点**: `POST /api/admin/auth/login`

**请求体**:
```json
{
  "username": "admin",
  "password": "admin123"
}
```

**成功响应** (200):
```json
{
  "success": true,
  "data": {
    "user": {
      "id": 1,
      "username": "admin",
      "email": "admin@lelinksolar.com",
      "role": "admin"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  },
  "message": "Login successful"
}
```

**错误响应** (401):
```json
{
  "success": false,
  "error": "Invalid credentials"
}
```

---

## 📦 产品管理API

### 获取所有产品

**端点**: `GET /api/admin/products`

**成功响应** (200):
```json
{
  "success": true,
  "data": [
    {
      "id": "lk-solar-generator-lk-2000",
      "name": "LK Solar Generator",
      "nameZh": "LK 太阳能发电机",
      "description": "High-capacity portable power station...",
      ...
    }
  ],
  "total": 3
}
```

### 创建产品

**端点**: `POST /api/admin/products`

**请求头**:
```
Authorization: Bearer {token}
Content-Type: application/json
```

**请求体**:
```json
{
  "name": "New Product",
  "nameZh": "新产品",
  "description": "Product description",
  "descriptionZh": "产品描述",
  "images": ["/images/product.jpg"],
  "keyFeatures": [],
  "specifications": []
}
```

**成功响应** (201):
```json
{
  "success": true,
  "data": {
    "id": "product-1234567890",
    "name": "New Product",
    ...
    "createdAt": "2024-10-26T12:00:00.000Z"
  },
  "message": "Product created successfully"
}
```

### 更新产品

**端点**: `PUT /api/admin/products`

**请求头**:
```
Authorization: Bearer {token}
Content-Type: application/json
```

**请求体**:
```json
{
  "id": "product-id",
  "name": "Updated Name",
  "nameZh": "更新的名称",
  ...
}
```

**成功响应** (200):
```json
{
  "success": true,
  "data": {
    "id": "product-id",
    ...
    "updatedAt": "2024-10-26T12:00:00.000Z"
  },
  "message": "Product updated successfully"
}
```

### 删除产品

**端点**: `DELETE /api/admin/products?id={productId}`

**请求头**:
```
Authorization: Bearer {token}
```

**成功响应** (200):
```json
{
  "success": true,
  "message": "Product deleted successfully"
}
```

---

## 📝 内容管理API

### 获取内容

**端点**: `GET /api/admin/content?section={sectionName}`

**参数**:
- `section`: 内容区域名称 (`hero`, `productShowcase`, 等)

**成功响应** (200):
```json
{
  "success": true,
  "data": {
    "titleEn": "Power Your Future with Solar Energy",
    "titleZh": "用太阳能点亮您的未来",
    "descriptionEn": "Professional solar energy...",
    "descriptionZh": "为住宅、工商业..."
  }
}
```

### 保存内容

**端点**: `POST /api/admin/content`

**请求头**:
```
Authorization: Bearer {token}
Content-Type: application/json
```

**请求体**:
```json
{
  "section": "hero",
  "data": {
    "titleEn": "New Title",
    "titleZh": "新标题",
    "descriptionEn": "New description",
    "descriptionZh": "新描述"
  }
}
```

**成功响应** (200):
```json
{
  "success": true,
  "message": "Content saved successfully",
  "data": {
    "section": "hero",
    "titleEn": "New Title",
    ...
    "updatedAt": "2024-10-26T12:00:00.000Z"
  }
}
```

---

## 📬 询价管理API

### 获取所有询价

**端点**: `GET /api/admin/inquiries`

**查询参数**:
- `status`: 筛选状态 (`all`, `pending`, `replied`, `closed`)
- `search`: 搜索关键词

**示例**: `/api/admin/inquiries?status=pending&search=john`

**成功响应** (200):
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "customer": "张三",
      "email": "zhangsan@example.com",
      "phone": "+86 138 1234 5678",
      "product": "LK Solar Generator",
      "message": "我对这款产品很感兴趣...",
      "date": "2024-10-26",
      "status": "pending"
    }
  ],
  "total": 8,
  "stats": {
    "pending": 5,
    "replied": 2,
    "closed": 1,
    "total": 8
  }
}
```

### 创建询价

**端点**: `POST /api/admin/inquiries`

**请求体**:
```json
{
  "customer": "John Doe",
  "email": "john@example.com",
  "phone": "+1 234 567 8900",
  "product": "LK Solar Generator",
  "message": "I'm interested in this product..."
}
```

**成功响应** (201):
```json
{
  "success": true,
  "data": {
    "id": 4,
    "customer": "John Doe",
    ...
    "date": "2024-10-26",
    "status": "pending"
  },
  "message": "Inquiry submitted successfully"
}
```

### 更新询价状态

**端点**: `PATCH /api/admin/inquiries`

**请求头**:
```
Authorization: Bearer {token}
Content-Type: application/json
```

**请求体**:
```json
{
  "id": 1,
  "status": "replied"
}
```

**成功响应** (200):
```json
{
  "success": true,
  "data": {
    "id": 1,
    ...
    "status": "replied"
  },
  "message": "Inquiry status updated successfully"
}
```

### 删除询价

**端点**: `DELETE /api/admin/inquiries?id={inquiryId}`

**请求头**:
```
Authorization: Bearer {token}
```

**成功响应** (200):
```json
{
  "success": true,
  "message": "Inquiry deleted successfully"
}
```

---

## 📤 文件上传API

### 上传图片

**端点**: `POST /api/admin/upload`

**请求头**:
```
Authorization: Bearer {token}
Content-Type: multipart/form-data
```

**请求体** (FormData):
```
file: [图片文件]
```

**文件限制**:
- 类型: JPEG, PNG, WebP, GIF
- 大小: 最大 5MB

**成功响应** (200):
```json
{
  "success": true,
  "data": {
    "filename": "1698345600000-abc123.jpg",
    "url": "/uploads/1698345600000-abc123.jpg",
    "size": 1024567,
    "type": "image/jpeg"
  },
  "message": "File uploaded successfully"
}
```

**错误响应** (400):
```json
{
  "success": false,
  "error": "File size exceeds 5MB limit"
}
```

---

## 🔧 通用响应格式

### 成功响应
```json
{
  "success": true,
  "data": { ... },
  "message": "Operation successful"
}
```

### 错误响应
```json
{
  "success": false,
  "error": "Error message"
}
```

---

## 🔐 认证

大多数API端点需要JWT认证。

### 使用Token

在请求头中添加：
```
Authorization: Bearer {your_jwt_token}
```

### 获取Token

1. 调用 `/api/admin/auth/login` 登录
2. 从响应中获取 `token`
3. 将token保存到localStorage或内存中
4. 在后续请求中使用该token

### Token过期

- Token有效期：24小时
- 过期后需要重新登录获取新token

---

## 📊 状态码

| 状态码 | 说明 |
|--------|------|
| 200 | 成功 |
| 201 | 创建成功 |
| 400 | 请求参数错误 |
| 401 | 未授权/认证失败 |
| 404 | 资源不存在 |
| 500 | 服务器错误 |

---

## 💡 使用示例

### JavaScript/TypeScript

```typescript
// 登录
const login = async (username: string, password: string) => {
  const response = await fetch('/api/admin/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password }),
  })
  
  const result = await response.json()
  
  if (result.success) {
    localStorage.setItem('admin_token', result.data.token)
    return result.data.user
  }
  
  throw new Error(result.error)
}

// 获取产品列表
const getProducts = async () => {
  const token = localStorage.getItem('admin_token')
  
  const response = await fetch('/api/admin/products', {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  })
  
  const result = await response.json()
  return result.data
}

// 上传图片
const uploadImage = async (file: File) => {
  const token = localStorage.getItem('admin_token')
  const formData = new FormData()
  formData.append('file', file)
  
  const response = await fetch('/api/admin/upload', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
    body: formData,
  })
  
  const result = await response.json()
  return result.data.url
}
```

---

## 🚧 开发中的功能

以下功能的API端点正在开发中：

- [ ] 批量操作API
- [ ] 数据导出API
- [ ] 用户管理API
- [ ] 操作日志API
- [ ] 数据备份API

---

## 📞 技术支持

如有API相关问题，请联系：
- 📧 邮箱: tech@lelinksolar.com
- 💬 开发团队

---

*文档版本: v1.0.0*  
*最后更新: 2024年10月26日*

