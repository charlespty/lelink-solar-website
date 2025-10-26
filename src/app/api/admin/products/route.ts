import { NextRequest, NextResponse } from 'next/server'
import { getAllProducts } from '@/lib/productsData'

// GET - 获取所有产品
export async function GET(request: NextRequest) {
  try {
    const products = getAllProducts()
    return NextResponse.json({
      success: true,
      data: products,
      total: products.length
    })
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: 'Failed to fetch products'
    }, { status: 500 })
  }
}

// POST - 创建新产品
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // 验证必填字段
    if (!body.name || !body.nameZh || !body.description) {
      return NextResponse.json({
        success: false,
        error: 'Missing required fields'
      }, { status: 400 })
    }

    // TODO: 实际保存到数据库
    // 当前返回模拟数据
    const newProduct = {
      id: `product-${Date.now()}`,
      ...body,
      createdAt: new Date().toISOString()
    }

    return NextResponse.json({
      success: true,
      data: newProduct,
      message: 'Product created successfully'
    }, { status: 201 })
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: 'Failed to create product'
    }, { status: 500 })
  }
}

// PUT - 更新产品
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { id, ...updateData } = body

    if (!id) {
      return NextResponse.json({
        success: false,
        error: 'Product ID is required'
      }, { status: 400 })
    }

    // TODO: 实际更新数据库
    // 当前返回模拟数据
    const updatedProduct = {
      id,
      ...updateData,
      updatedAt: new Date().toISOString()
    }

    return NextResponse.json({
      success: true,
      data: updatedProduct,
      message: 'Product updated successfully'
    })
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: 'Failed to update product'
    }, { status: 500 })
  }
}

// DELETE - 删除产品
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json({
        success: false,
        error: 'Product ID is required'
      }, { status: 400 })
    }

    // TODO: 实际从数据库删除
    // 当前返回成功响应
    return NextResponse.json({
      success: true,
      message: 'Product deleted successfully'
    })
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: 'Failed to delete product'
    }, { status: 500 })
  }
}

