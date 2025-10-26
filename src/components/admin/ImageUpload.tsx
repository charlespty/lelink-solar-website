'use client'

import React, { useState, useRef, useCallback } from 'react'
import { Upload, X, Image as ImageIcon, Loader2, Check, AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Card, CardContent } from '@/components/ui/Card'

interface ImageUploadProps {
  onImageUpload: (file: File) => Promise<string>
  onImageRemove?: (imageUrl: string) => void
  existingImages?: string[]
  maxImages?: number
  accept?: string
  className?: string
}

interface UploadedImage {
  id: string
  url: string
  name: string
  size: number
  status: 'uploading' | 'success' | 'error'
  error?: string
}

export default function ImageUpload({
  onImageUpload,
  onImageRemove,
  existingImages = [],
  maxImages = 10,
  accept = 'image/*',
  className = ''
}: ImageUploadProps) {
  const [images, setImages] = useState<UploadedImage[]>(
    existingImages.map((url, index) => ({
      id: `existing-${index}`,
      url,
      name: `Image ${index + 1}`,
      size: 0,
      status: 'success'
    }))
  )
  const [isDragOver, setIsDragOver] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = useCallback(async (files: FileList) => {
    const fileArray = Array.from(files)
    const remainingSlots = maxImages - images.length
    
    if (fileArray.length > remainingSlots) {
      alert(`最多只能上传 ${maxImages} 张图片，当前已有 ${images.length} 张`)
      return
    }

    for (const file of fileArray) {
      if (!file.type.startsWith('image/')) {
        alert(`文件 ${file.name} 不是有效的图片格式`)
        continue
      }

      const imageId = `upload-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
      const newImage: UploadedImage = {
        id: imageId,
        url: '',
        name: file.name,
        size: file.size,
        status: 'uploading'
      }

      setImages(prev => [...prev, newImage])

      try {
        const uploadedUrl = await onImageUpload(file)
        setImages(prev => 
          prev.map(img => 
            img.id === imageId 
              ? { ...img, url: uploadedUrl, status: 'success' }
              : img
          )
        )
      } catch (error) {
        setImages(prev => 
          prev.map(img => 
            img.id === imageId 
              ? { 
                  ...img, 
                  status: 'error', 
                  error: error instanceof Error ? error.message : '上传失败'
                }
              : img
          )
        )
      }
    }
  }, [images.length, maxImages, onImageUpload])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
    
    const files = e.dataTransfer.files
    if (files.length > 0) {
      handleFileSelect(files)
    }
  }, [handleFileSelect])

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
  }, [])

  const handleFileInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files.length > 0) {
      handleFileSelect(files)
    }
  }, [handleFileSelect])

  const handleRemoveImage = useCallback((imageId: string, imageUrl: string) => {
    setImages(prev => prev.filter(img => img.id !== imageId))
    if (onImageRemove && imageUrl) {
      onImageRemove(imageUrl)
    }
  }, [onImageRemove])

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  const getStatusIcon = (status: UploadedImage['status']) => {
    switch (status) {
      case 'uploading':
        return <Loader2 className="h-4 w-4 animate-spin text-blue-500" />
      case 'success':
        return <Check className="h-4 w-4 text-green-500" />
      case 'error':
        return <AlertCircle className="h-4 w-4 text-red-500" />
      default:
        return null
    }
  }

  return (
    <div className={`space-y-4 ${className}`}>
      {/* 上传区域 */}
      <Card 
        className={`border-2 border-dashed transition-colors ${
          isDragOver 
            ? 'border-blue-500 bg-blue-50' 
            : 'border-gray-300 hover:border-gray-400'
        }`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
      >
        <CardContent className="p-6 text-center">
          <div className="space-y-4">
            <div className="mx-auto w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
              <Upload className="h-6 w-6 text-gray-600" />
            </div>
            
            <div>
              <h3 className="text-lg font-medium text-gray-900">
                上传图片
              </h3>
              <p className="text-sm text-gray-500 mt-1">
                拖拽图片到此处，或点击选择文件
              </p>
              <p className="text-xs text-gray-400 mt-1">
                支持 JPG、PNG、GIF、WebP 格式，最大 10MB
              </p>
            </div>

            <Button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="bg-blue-600 hover:bg-blue-700 text-white"
              disabled={images.length >= maxImages}
            >
              <ImageIcon className="h-4 w-4 mr-2" />
              选择图片
            </Button>

            <input
              ref={fileInputRef}
              type="file"
              accept={accept}
              multiple
              onChange={handleFileInputChange}
              className="hidden"
            />
          </div>
        </CardContent>
      </Card>

      {/* 图片列表 */}
      {images.length > 0 && (
        <div className="space-y-2">
          <h4 className="text-sm font-medium text-gray-700">
            已上传图片 ({images.length}/{maxImages})
          </h4>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {images.map((image) => (
              <Card key={image.id} className="relative group">
                <CardContent className="p-2">
                  <div className="relative">
                    {image.status === 'success' && image.url ? (
                      <img
                        src={image.url}
                        alt={image.name}
                        className="w-full h-24 object-cover rounded-md"
                      />
                    ) : (
                      <div className="w-full h-24 bg-gray-100 rounded-md flex items-center justify-center">
                        <ImageIcon className="h-8 w-8 text-gray-400" />
                      </div>
                    )}

                    {/* 状态指示器 */}
                    <div className="absolute top-2 right-2">
                      {getStatusIcon(image.status)}
                    </div>

                    {/* 删除按钮 */}
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute top-2 left-2 opacity-0 group-hover:opacity-100 transition-opacity bg-red-500 hover:bg-red-600 text-white p-1 h-6 w-6"
                      onClick={() => handleRemoveImage(image.id, image.url)}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>

                  {/* 图片信息 */}
                  <div className="mt-2 space-y-1">
                    <p className="text-xs text-gray-600 truncate" title={image.name}>
                      {image.name}
                    </p>
                    {image.size > 0 && (
                      <p className="text-xs text-gray-400">
                        {formatFileSize(image.size)}
                      </p>
                    )}
                    {image.status === 'error' && image.error && (
                      <p className="text-xs text-red-500" title={image.error}>
                        上传失败
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}