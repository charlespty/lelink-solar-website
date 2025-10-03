'use client'

import React from 'react'
import Image from 'next/image'
import { getImagePath } from '@/lib/imageUtils'

export default function TestImagesPage() {
  const testImages = [
    '/images/Product image/LT-Fixed/LT-fixed-panel-1.jpg',
    '/images/Product image/LT-Fixed/LT-fixed-panel-2.jpg',
    '/images/Product image/LT-Fixed/LT-fixed-panel-3.jpg',
  ]

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-2xl font-bold mb-6">图片测试页面</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {testImages.map((imagePath, index) => (
          <div key={index} className="border rounded-lg p-4">
            <h3 className="text-lg font-semibold mb-2">图片 {index + 1}</h3>
            <p className="text-sm text-gray-600 mb-4">路径: {imagePath}</p>
            <div className="relative h-64 w-full">
              <Image
                src={getImagePath(imagePath)}
                alt={`测试图片 ${index + 1}`}
                fill
                className="object-contain"
                onError={(e) => {
                  console.error('图片加载失败:', imagePath, e)
                }}
                onLoad={() => {
                  console.log('图片加载成功:', imagePath)
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
