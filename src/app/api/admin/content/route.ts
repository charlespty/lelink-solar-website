import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

// GET - 获取内容
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const section = searchParams.get('section')

    if (!section) {
      return NextResponse.json({
        success: false,
        error: 'Section parameter is required'
      }, { status: 400 })
    }

    // TODO: 从数据库或文件系统读取内容
    // 当前返回模拟数据
    const content = {
      hero: {
        titleEn: 'Power Your Future with Solar Energy',
        titleZh: '用太阳能点亮您的未来',
        descriptionEn: 'Professional solar energy storage battery system solutions for Residential, C&I and Outdoor Travel.',
        descriptionZh: '为住宅、工商业和户外旅行提供专业的太阳能储能电池系统解决方案。',
      },
      productShowcase: {
        titleEn: 'Our Core Product',
        titleZh: '我们的核心产品',
        descriptionEn: 'One powerful solution, countless applications. Our Solar energy storage battery system adapts to your needs.',
        descriptionZh: '一个强大的解决方案，无数种应用。我们的太阳能储能电池系统适应您的需求。',
      }
    }

    return NextResponse.json({
      success: true,
      data: content[section as keyof typeof content] || {},
    })
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: 'Failed to fetch content'
    }, { status: 500 })
  }
}

// POST - 保存内容
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { section, data } = body

    if (!section || !data) {
      return NextResponse.json({
        success: false,
        error: 'Section and data are required'
      }, { status: 400 })
    }

    // TODO: 实际保存到数据库或文件系统
    // 当前返回成功响应
    return NextResponse.json({
      success: true,
      message: 'Content saved successfully',
      data: {
        section,
        ...data,
        updatedAt: new Date().toISOString()
      }
    })
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: 'Failed to save content'
    }, { status: 500 })
  }
}

