# 🗄️ 数据库集成指南

## 📋 目录

1. [选择数据库](#选择数据库)
2. [MongoDB集成](#mongodb集成)
3. [PostgreSQL集成](#postgresql集成)
4. [MySQL集成](#mysql集成)
5. [数据模型设计](#数据模型设计)
6. [API迁移指南](#api迁移指南)

---

## 🎯 选择数据库

### MongoDB (推荐)

**优点**:
- ✅ 灵活的文档模型
- ✅ 易于扩展
- ✅ 云服务成熟（MongoDB Atlas）
- ✅ 适合快速开发

**适用场景**:
- 需要灵活的数据结构
- 快速迭代开发
- 中小型项目

### PostgreSQL

**优点**:
- ✅ 功能强大
- ✅ ACID事务支持
- ✅ 复杂查询优化
- ✅ 数据完整性强

**适用场景**:
- 需要复杂关系查询
- 数据完整性要求高
- 大型企业项目

### MySQL

**优点**:
- ✅ 成熟稳定
- ✅ 社区支持好
- ✅ 性能优秀
- ✅ 易于学习

**适用场景**:
- 传统关系型数据需求
- 高并发读写
- 成本敏感项目

---

## 🍃 MongoDB集成

### 1. 安装依赖

```bash
npm install mongodb mongoose
npm install --save-dev @types/mongoose
```

### 2. 创建数据库连接

**文件**: `src/lib/mongodb.ts`

```typescript
import mongoose from 'mongoose'

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/lelink_solar'

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable')
}

interface Cached {
  conn: typeof mongoose | null
  promise: Promise<typeof mongoose> | null
}

declare global {
  var mongoose: Cached
}

let cached: Cached = global.mongoose || { conn: null, promise: null }

if (!global.mongoose) {
  global.mongoose = cached
}

export async function connectDB() {
  if (cached.conn) {
    return cached.conn
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    }

    cached.promise = mongoose.connect(MONGODB_URI, opts)
  }

  try {
    cached.conn = await cached.promise
  } catch (e) {
    cached.promise = null
    throw e
  }

  return cached.conn
}
```

### 3. 定义数据模型

**文件**: `src/models/Product.ts`

```typescript
import mongoose, { Schema, Document } from 'mongoose'

export interface IProduct extends Document {
  name: string
  nameZh: string
  description: string
  descriptionZh: string
  images: string[]
  keyFeatures: Array<{
    icon: string
    text: string
    textZh: string
    description: string
    descriptionZh: string
  }>
  specifications: Array<{
    name: string
    value: string
    unit: string
    nameZh: string
  }>
  createdAt: Date
  updatedAt: Date
}

const ProductSchema = new Schema<IProduct>({
  name: { type: String, required: true },
  nameZh: { type: String, required: true },
  description: { type: String, required: true },
  descriptionZh: { type: String, required: true },
  images: [{ type: String }],
  keyFeatures: [{
    icon: String,
    text: String,
    textZh: String,
    description: String,
    descriptionZh: String,
  }],
  specifications: [{
    name: String,
    value: String,
    unit: String,
    nameZh: String,
  }],
}, {
  timestamps: true,
})

export default mongoose.models.Product || mongoose.model<IProduct>('Product', ProductSchema)
```

**文件**: `src/models/Inquiry.ts`

```typescript
import mongoose, { Schema, Document } from 'mongoose'

export interface IInquiry extends Document {
  customer: string
  email: string
  phone?: string
  product: string
  message: string
  status: 'pending' | 'replied' | 'closed'
  createdAt: Date
  updatedAt: Date
}

const InquirySchema = new Schema<IInquiry>({
  customer: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String },
  product: { type: String, required: true },
  message: { type: String, required: true },
  status: { 
    type: String, 
    enum: ['pending', 'replied', 'closed'],
    default: 'pending'
  },
}, {
  timestamps: true,
})

InquirySchema.index({ status: 1, createdAt: -1 })
InquirySchema.index({ email: 1 })

export default mongoose.models.Inquiry || mongoose.model<IInquiry>('Inquiry', InquirySchema)
```

**文件**: `src/models/User.ts`

```typescript
import mongoose, { Schema, Document } from 'mongoose'

export interface IUser extends Document {
  username: string
  email: string
  password: string
  role: 'admin' | 'editor' | 'viewer'
  createdAt: Date
  updatedAt: Date
}

const UserSchema = new Schema<IUser>({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { 
    type: String, 
    enum: ['admin', 'editor', 'viewer'],
    default: 'viewer'
  },
}, {
  timestamps: true,
})

export default mongoose.models.User || mongoose.model<IUser>('User', UserSchema)
```

### 4. 更新API路由

**文件**: `src/app/api/admin/products/route.ts`

```typescript
import { NextRequest, NextResponse } from 'next/server'
import { connectDB } from '@/lib/mongodb'
import Product from '@/models/Product'

// GET - 获取所有产品
export async function GET(request: NextRequest) {
  try {
    await connectDB()
    const products = await Product.find().sort({ createdAt: -1 })
    
    return NextResponse.json({
      success: true,
      data: products,
      total: products.length
    })
  } catch (error) {
    console.error('Error fetching products:', error)
    return NextResponse.json({
      success: false,
      error: 'Failed to fetch products'
    }, { status: 500 })
  }
}

// POST - 创建新产品
export async function POST(request: NextRequest) {
  try {
    await connectDB()
    const body = await request.json()
    
    const product = new Product(body)
    await product.save()

    return NextResponse.json({
      success: true,
      data: product,
      message: 'Product created successfully'
    }, { status: 201 })
  } catch (error) {
    console.error('Error creating product:', error)
    return NextResponse.json({
      success: false,
      error: 'Failed to create product'
    }, { status: 500 })
  }
}

// PUT - 更新产品
export async function PUT(request: NextRequest) {
  try {
    await connectDB()
    const body = await request.json()
    const { _id, ...updateData } = body

    const product = await Product.findByIdAndUpdate(
      _id,
      updateData,
      { new: true, runValidators: true }
    )

    if (!product) {
      return NextResponse.json({
        success: false,
        error: 'Product not found'
      }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      data: product,
      message: 'Product updated successfully'
    })
  } catch (error) {
    console.error('Error updating product:', error)
    return NextResponse.json({
      success: false,
      error: 'Failed to update product'
    }, { status: 500 })
  }
}

// DELETE - 删除产品
export async function DELETE(request: NextRequest) {
  try {
    await connectDB()
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json({
        success: false,
        error: 'Product ID is required'
      }, { status: 400 })
    }

    const product = await Product.findByIdAndDelete(id)

    if (!product) {
      return NextResponse.json({
        success: false,
        error: 'Product not found'
      }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      message: 'Product deleted successfully'
    })
  } catch (error) {
    console.error('Error deleting product:', error)
    return NextResponse.json({
      success: false,
      error: 'Failed to delete product'
    }, { status: 500 })
  }
}
```

### 5. 环境变量配置

**文件**: `.env.local`

```env
# MongoDB
MONGODB_URI=mongodb://localhost:27017/lelink_solar

# 或使用 MongoDB Atlas
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/lelink_solar?retryWrites=true&w=majority

# JWT密钥
JWT_SECRET=your-super-secret-jwt-key-change-in-production
```

### 6. 初始化数据

**文件**: `scripts/seed.ts`

```typescript
import mongoose from 'mongoose'
import Product from '../src/models/Product'
import User from '../src/models/User'
import bcrypt from 'bcrypt'

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/lelink_solar'

async function seed() {
  try {
    await mongoose.connect(MONGODB_URI)
    console.log('Connected to MongoDB')

    // 清空现有数据
    await Product.deleteMany({})
    await User.deleteMany({})
    console.log('Cleared existing data')

    // 创建管理员用户
    const hashedPassword = await bcrypt.hash('admin123', 10)
    await User.create({
      username: 'admin',
      email: 'admin@lelinksolar.com',
      password: hashedPassword,
      role: 'admin'
    })
    console.log('Created admin user')

    // 创建示例产品
    await Product.create({
      name: 'LK Solar Generator',
      nameZh: 'LK 太阳能发电机',
      description: 'High-capacity portable power station...',
      descriptionZh: '大容量便携式电源站...',
      images: ['/images/product.jpg'],
      keyFeatures: [],
      specifications: []
    })
    console.log('Created sample products')

    console.log('✅ Seed completed successfully!')
  } catch (error) {
    console.error('❌ Seed failed:', error)
  } finally {
    await mongoose.disconnect()
  }
}

seed()
```

运行初始化脚本：
```bash
npm install bcrypt ts-node
npx ts-node scripts/seed.ts
```

---

## 🐘 PostgreSQL集成

### 1. 使用Prisma ORM

```bash
npm install @prisma/client
npm install -D prisma
```

### 2. 初始化Prisma

```bash
npx prisma init
```

### 3. 定义Schema

**文件**: `prisma/schema.prisma`

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id        String   @id @default(cuid())
  username  String   @unique
  email     String   @unique
  password  String
  role      Role     @default(VIEWER)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

enum Role {
  ADMIN
  EDITOR
  VIEWER
}

model Product {
  id            String   @id @default(cuid())
  name          String
  nameZh        String
  description   String
  descriptionZh String
  images        String[]
  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt
}

model Inquiry {
  id        String        @id @default(cuid())
  customer  String
  email     String
  phone     String?
  product   String
  message   String
  status    InquiryStatus @default(PENDING)
  createdAt DateTime      @default(now())
  updatedAt DateTime      @updatedAt

  @@index([status, createdAt])
  @@index([email])
}

enum InquiryStatus {
  PENDING
  REPLIED
  CLOSED
}
```

### 4. 生成Prisma Client

```bash
npx prisma generate
npx prisma db push
```

### 5. 使用Prisma Client

```typescript
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// 获取产品
const products = await prisma.product.findMany()

// 创建产品
const product = await prisma.product.create({
  data: {
    name: 'Product Name',
    nameZh: '产品名称',
    ...
  }
})

// 更新产品
const updated = await prisma.product.update({
  where: { id: '123' },
  data: { name: 'New Name' }
})

// 删除产品
await prisma.product.delete({
  where: { id: '123' }
})
```

---

## 🔄 API迁移步骤

### 1. 安装数据库依赖

```bash
# MongoDB
npm install mongodb mongoose

# 或 PostgreSQL
npm install @prisma/client
npm install -D prisma
```

### 2. 配置环境变量

```env
# .env.local
MONGODB_URI=your-connection-string
# 或
DATABASE_URL=postgresql://user:password@localhost:5432/lelink_solar
```

### 3. 创建数据模型

按照上述示例创建相应的模型文件

### 4. 更新API路由

将所有API路由从内存存储改为数据库操作

### 5. 测试API

```bash
# 启动开发服务器
npm run dev

# 测试API端点
curl http://localhost:3000/api/admin/products
```

---

## ✅ 迁移检查清单

- [ ] 安装数据库依赖
- [ ] 配置连接字符串
- [ ] 创建数据模型
- [ ] 更新所有API路由
- [ ] 实现密码加密
- [ ] 添加数据验证
- [ ] 创建数据库索引
- [ ] 编写初始化脚本
- [ ] 测试所有API
- [ ] 备份现有数据
- [ ] 部署到生产环境

---

## 📞 技术支持

如有数据库集成问题，请联系：
- 📧 tech@lelinksolar.com

---

*最后更新: 2024年10月26日*

