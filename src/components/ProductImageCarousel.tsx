'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface ProductImageCarouselProps {
  images: string[]
  alt: string
}

export function ProductImageCarousel({ images, alt }: ProductImageCarouselProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)

  const nextImage = () => {
    setSelectedImageIndex((prev) => (prev + 1) % images.length)
  }

  const prevImage = () => {
    setSelectedImageIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  return (
    <div className="relative">
      {/* 主图片 */}
      <div className="relative aspect-square overflow-hidden rounded-lg bg-transparent">
        <Image
          src={images[selectedImageIndex]}
          alt={alt}
          width={600}
          height={600}
          className="h-full w-full object-contain transition-transform duration-300 hover:scale-105"
          priority
        />
        
        {/* 导航按钮 */}
        {images.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-2 shadow-lg transition-all hover:bg-white hover:scale-110"
              aria-label="Previous image"
            >
              <ChevronLeft className="h-5 w-5 text-gray-800" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-2 shadow-lg transition-all hover:bg-white hover:scale-110"
              aria-label="Next image"
            >
              <ChevronRight className="h-5 w-5 text-gray-800" />
            </button>
          </>
        )}
      </div>

      {/* 缩略图 */}
      {images.length > 1 && (
        <div className="mt-4 flex gap-2 overflow-x-auto pb-2">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => setSelectedImageIndex(index)}
              className={`relative flex-shrink-0 overflow-hidden rounded-lg transition-all ${
                index === selectedImageIndex
                  ? 'ring-2 ring-primary-500 ring-offset-2'
                  : 'hover:ring-2 hover:ring-gray-300'
              }`}
            >
              <Image
                src={image}
                alt={`${alt} ${index + 1}`}
                width={80}
                height={80}
                className="h-20 w-20 object-contain"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
