'use client'

import React, { useState } from 'react'
import { 
  Plus, 
  Trash2, 
  Move, 
  Image as ImageIcon, 
  Type, 
  Video, 
  FileText,
  Quote,
  List,
  Code,
  Link
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Input } from '@/components/ui/Input'
import { Textarea } from '@/components/ui/Textarea'
import RichTextEditor from './RichTextEditor'
import ImageUpload from './ImageUpload'

export type ContentBlockType = 
  | 'text' 
  | 'image' 
  | 'video' 
  | 'quote' 
  | 'list' 
  | 'code' 
  | 'link'
  | 'heading'

export interface ContentBlock {
  id: string
  type: ContentBlockType
  content: string
  metadata?: Record<string, any>
  order: number
}

interface ContentBlockProps {
  block: ContentBlock
  onUpdate: (block: ContentBlock) => void
  onDelete: (blockId: string) => void
  onMoveUp?: () => void
  onMoveDown?: () => void
  onImageUpload?: (file: File) => Promise<string>
  className?: string
}

const blockIcons = {
  text: Type,
  image: ImageIcon,
  video: Video,
  quote: Quote,
  list: List,
  code: Code,
  link: Link,
  heading: Type
}

const blockTitles = {
  text: '文本',
  image: '图片',
  video: '视频',
  quote: '引用',
  list: '列表',
  code: '代码',
  link: '链接',
  heading: '标题'
}

export default function ContentBlockComponent({
  block,
  onUpdate,
  onDelete,
  onMoveUp,
  onMoveDown,
  onImageUpload,
  className = ''
}: ContentBlockProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [localContent, setLocalContent] = useState(block.content)
  const [localMetadata, setLocalMetadata] = useState(block.metadata || {})

  const Icon = blockIcons[block.type]

  const handleSave = () => {
    onUpdate({
      ...block,
      content: localContent,
      metadata: localMetadata
    })
    setIsEditing(false)
  }

  const handleCancel = () => {
    setLocalContent(block.content)
    setLocalMetadata(block.metadata || {})
    setIsEditing(false)
  }

  const renderBlockContent = () => {
    if (isEditing) {
      return renderEditMode()
    }

    switch (block.type) {
      case 'text':
        return (
          <div 
            className="prose max-w-none"
            dangerouslySetInnerHTML={{ __html: block.content }}
          />
        )
      
      case 'image':
        return (
          <div className="space-y-2">
            {block.content && (
              <img 
                src={block.content} 
                alt={localMetadata.alt || '图片'} 
                className="max-w-full h-auto rounded-lg"
              />
            )}
            {localMetadata.caption && (
              <p className="text-sm text-gray-600 text-center italic">
                {localMetadata.caption}
              </p>
            )}
          </div>
        )
      
      case 'video':
        return (
          <div className="space-y-2">
            {block.content && (
              <video 
                src={block.content} 
                controls 
                className="max-w-full h-auto rounded-lg"
              />
            )}
            {localMetadata.caption && (
              <p className="text-sm text-gray-600 text-center italic">
                {localMetadata.caption}
              </p>
            )}
          </div>
        )
      
      case 'quote':
        return (
          <blockquote className="border-l-4 border-blue-500 pl-4 py-2 bg-gray-50 rounded-r-lg">
            <div 
              className="prose max-w-none"
              dangerouslySetInnerHTML={{ __html: block.content }}
            />
            {localMetadata.author && (
              <cite className="block text-sm text-gray-600 mt-2">
                — {localMetadata.author}
              </cite>
            )}
          </blockquote>
        )
      
      case 'list':
        const listItems = block.content.split('\n').filter(item => item.trim())
        return (
          <ul className="list-disc list-inside space-y-1">
            {listItems.map((item, index) => (
              <li key={index} className="text-gray-700">
                {item.trim()}
              </li>
            ))}
          </ul>
        )
      
      case 'code':
        return (
          <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
            <code>{block.content}</code>
          </pre>
        )
      
      case 'link':
        return (
          <div className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50">
            <a 
              href={block.content} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 underline"
            >
              {localMetadata.title || block.content}
            </a>
            {localMetadata.description && (
              <p className="text-sm text-gray-600 mt-1">
                {localMetadata.description}
              </p>
            )}
          </div>
        )
      
      case 'heading':
        const HeadingTag = `h${localMetadata.level || 2}` as keyof JSX.IntrinsicElements
        return (
          <HeadingTag className="font-bold text-gray-900">
            {block.content}
          </HeadingTag>
        )
      
      default:
        return <div>{block.content}</div>
    }
  }

  const renderEditMode = () => {
    switch (block.type) {
      case 'text':
        return (
          <RichTextEditor
            content={localContent}
            onChange={setLocalContent}
            onImageUpload={onImageUpload}
            className="min-h-[200px]"
          />
        )
      
      case 'image':
        return (
          <div className="space-y-4">
            <ImageUpload
              onImageUpload={onImageUpload || (() => Promise.resolve(''))}
              existingImages={localContent ? [localContent] : []}
              maxImages={1}
              onImageRemove={() => setLocalContent('')}
            />
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                图片描述
              </label>
              <Input
                value={localMetadata.alt || ''}
                onChange={(e) => setLocalMetadata({ ...localMetadata, alt: e.target.value })}
                placeholder="输入图片描述..."
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                图片说明
              </label>
              <Input
                value={localMetadata.caption || ''}
                onChange={(e) => setLocalMetadata({ ...localMetadata, caption: e.target.value })}
                placeholder="输入图片说明..."
              />
            </div>
          </div>
        )
      
      case 'video':
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                视频链接
              </label>
              <Input
                value={localContent}
                onChange={(e) => setLocalContent(e.target.value)}
                placeholder="输入视频链接..."
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                视频说明
              </label>
              <Input
                value={localMetadata.caption || ''}
                onChange={(e) => setLocalMetadata({ ...localMetadata, caption: e.target.value })}
                placeholder="输入视频说明..."
              />
            </div>
          </div>
        )
      
      case 'quote':
        return (
          <div className="space-y-4">
            <RichTextEditor
              content={localContent}
              onChange={setLocalContent}
              placeholder="输入引用内容..."
              className="min-h-[150px]"
            />
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                作者
              </label>
              <Input
                value={localMetadata.author || ''}
                onChange={(e) => setLocalMetadata({ ...localMetadata, author: e.target.value })}
                placeholder="输入作者..."
              />
            </div>
          </div>
        )
      
      case 'list':
        return (
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              列表项（每行一项）
            </label>
            <Textarea
              value={localContent}
              onChange={(e) => setLocalContent(e.target.value)}
              placeholder="输入列表项，每行一项..."
              rows={6}
            />
          </div>
        )
      
      case 'code':
        return (
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              代码
            </label>
            <Textarea
              value={localContent}
              onChange={(e) => setLocalContent(e.target.value)}
              placeholder="输入代码..."
              rows={8}
              className="font-mono"
            />
          </div>
        )
      
      case 'link':
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                链接地址
              </label>
              <Input
                value={localContent}
                onChange={(e) => setLocalContent(e.target.value)}
                placeholder="输入链接地址..."
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                链接标题
              </label>
              <Input
                value={localMetadata.title || ''}
                onChange={(e) => setLocalMetadata({ ...localMetadata, title: e.target.value })}
                placeholder="输入链接标题..."
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                链接描述
              </label>
              <Textarea
                value={localMetadata.description || ''}
                onChange={(e) => setLocalMetadata({ ...localMetadata, description: e.target.value })}
                placeholder="输入链接描述..."
                rows={3}
              />
            </div>
          </div>
        )
      
      case 'heading':
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                标题级别
              </label>
              <select
                value={localMetadata.level || 2}
                onChange={(e) => setLocalMetadata({ ...localMetadata, level: parseInt(e.target.value) })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value={1}>H1</option>
                <option value={2}>H2</option>
                <option value={3}>H3</option>
                <option value={4}>H4</option>
                <option value={5}>H5</option>
                <option value={6}>H6</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                标题内容
              </label>
              <Input
                value={localContent}
                onChange={(e) => setLocalContent(e.target.value)}
                placeholder="输入标题内容..."
              />
            </div>
          </div>
        )
      
      default:
        return <div>未知内容类型</div>
    }
  }

  return (
    <Card className={`group ${className}`}>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Icon className="h-4 w-4 text-gray-500" />
            <CardTitle className="text-sm font-medium text-gray-700">
              {blockTitles[block.type]}
            </CardTitle>
          </div>
          
          <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => setIsEditing(!isEditing)}
              className="h-8 w-8 p-0"
            >
              {isEditing ? '保存' : '编辑'}
            </Button>
            
            {onMoveUp && (
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={onMoveUp}
                className="h-8 w-8 p-0"
                title="上移"
              >
                <Move className="h-4 w-4" />
              </Button>
            )}
            
            {onMoveDown && (
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={onMoveDown}
                className="h-8 w-8 p-0"
                title="下移"
              >
                <Move className="h-4 w-4 rotate-180" />
              </Button>
            )}
            
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => onDelete(block.id)}
              className="h-8 w-8 p-0 text-red-500 hover:text-red-700"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        {renderBlockContent()}
        
        {isEditing && (
          <div className="flex justify-end space-x-2 mt-4 pt-4 border-t border-gray-200">
            <Button
              type="button"
              variant="outline"
              onClick={handleCancel}
            >
              取消
            </Button>
            <Button
              type="button"
              onClick={handleSave}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              保存
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
