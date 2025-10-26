'use client'

import React, { useState, useRef, useEffect } from 'react'
import { 
  Bold, 
  Italic, 
  Underline, 
  List, 
  ListOrdered, 
  Link, 
  Image as ImageIcon,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Quote,
  Code,
  Undo,
  Redo
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import ImageUpload from './ImageUpload'

interface RichTextEditorProps {
  content: string
  onChange: (content: string) => void
  placeholder?: string
  className?: string
  onImageUpload?: (file: File) => Promise<string>
}

export default function RichTextEditor({
  content,
  onChange,
  placeholder = '请输入内容...',
  className = '',
  onImageUpload
}: RichTextEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null)
  const [showImageUpload, setShowImageUpload] = useState(false)
  const [isFocused, setIsFocused] = useState(false)

  useEffect(() => {
    if (editorRef.current && editorRef.current.innerHTML !== content) {
      editorRef.current.innerHTML = content
    }
  }, [content])

  const execCommand = (command: string, value?: string) => {
    document.execCommand(command, false, value)
    editorRef.current?.focus()
    handleContentChange()
  }

  const handleContentChange = () => {
    if (editorRef.current) {
      const newContent = editorRef.current.innerHTML
      if (newContent !== content) {
        onChange(newContent)
      }
    }
  }

  const handleImageUpload = async (file: File) => {
    if (onImageUpload) {
      try {
        const imageUrl = await onImageUpload(file)
        execCommand('insertImage', imageUrl)
        setShowImageUpload(false)
        return imageUrl
      } catch (error) {
        console.error('Image upload failed:', error)
        throw error
      }
    }
    throw new Error('Image upload not configured')
  }

  const insertLink = () => {
    const url = prompt('请输入链接地址:')
    if (url) {
      execCommand('createLink', url)
    }
  }

  const ToolbarButton = ({ 
    onClick, 
    icon: Icon, 
    title, 
    isActive = false 
  }: {
    onClick: () => void
    icon: React.ComponentType<{ className?: string }>
    title: string
    isActive?: boolean
  }) => (
    <Button
      type="button"
      variant="ghost"
      size="sm"
      onClick={onClick}
      className={`h-8 w-8 p-0 ${isActive ? 'bg-blue-100 text-blue-600' : ''}`}
      title={title}
    >
      <Icon className="h-4 w-4" />
    </Button>
  )

  return (
    <div className={`border border-gray-300 rounded-lg ${className}`}>
      {/* 工具栏 */}
      <div className="border-b border-gray-300 p-2 bg-gray-50 rounded-t-lg">
        <div className="flex flex-wrap gap-1">
          {/* 文本格式 */}
          <div className="flex gap-1 border-r border-gray-300 pr-2 mr-2">
            <ToolbarButton
              onClick={() => execCommand('bold')}
              icon={Bold}
              title="粗体"
            />
            <ToolbarButton
              onClick={() => execCommand('italic')}
              icon={Italic}
              title="斜体"
            />
            <ToolbarButton
              onClick={() => execCommand('underline')}
              icon={Underline}
              title="下划线"
            />
          </div>

          {/* 对齐 */}
          <div className="flex gap-1 border-r border-gray-300 pr-2 mr-2">
            <ToolbarButton
              onClick={() => execCommand('justifyLeft')}
              icon={AlignLeft}
              title="左对齐"
            />
            <ToolbarButton
              onClick={() => execCommand('justifyCenter')}
              icon={AlignCenter}
              title="居中对齐"
            />
            <ToolbarButton
              onClick={() => execCommand('justifyRight')}
              icon={AlignRight}
              title="右对齐"
            />
          </div>

          {/* 列表 */}
          <div className="flex gap-1 border-r border-gray-300 pr-2 mr-2">
            <ToolbarButton
              onClick={() => execCommand('insertUnorderedList')}
              icon={List}
              title="无序列表"
            />
            <ToolbarButton
              onClick={() => execCommand('insertOrderedList')}
              icon={ListOrdered}
              title="有序列表"
            />
          </div>

          {/* 其他功能 */}
          <div className="flex gap-1 border-r border-gray-300 pr-2 mr-2">
            <ToolbarButton
              onClick={() => execCommand('formatBlock', 'blockquote')}
              icon={Quote}
              title="引用"
            />
            <ToolbarButton
              onClick={() => execCommand('formatBlock', 'pre')}
              icon={Code}
              title="代码块"
            />
            <ToolbarButton
              onClick={insertLink}
              icon={Link}
              title="插入链接"
            />
            {onImageUpload && (
              <ToolbarButton
                onClick={() => setShowImageUpload(!showImageUpload)}
                icon={ImageIcon}
                title="插入图片"
              />
            )}
          </div>

          {/* 撤销/重做 */}
          <div className="flex gap-1">
            <ToolbarButton
              onClick={() => execCommand('undo')}
              icon={Undo}
              title="撤销"
            />
            <ToolbarButton
              onClick={() => execCommand('redo')}
              icon={Redo}
              title="重做"
            />
          </div>
        </div>
      </div>

      {/* 编辑器 */}
      <div
        ref={editorRef}
        contentEditable
        className={`min-h-[200px] p-4 focus:outline-none ${
          isFocused ? 'ring-2 ring-blue-500' : ''
        }`}
        onInput={handleContentChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        dangerouslySetInnerHTML={{ __html: content }}
        style={{ minHeight: '200px' }}
        data-placeholder={placeholder}
      />

      {/* 图片上传区域 */}
      {showImageUpload && onImageUpload && (
        <div className="border-t border-gray-300 p-4 bg-gray-50">
          <ImageUpload
            onImageUpload={handleImageUpload}
            maxImages={1}
            className="max-w-md"
          />
        </div>
      )}

      {/* 样式 */}
      <style jsx>{`
        [contenteditable]:empty:before {
          content: attr(data-placeholder);
          color: #9ca3af;
          pointer-events: none;
        }
        
        [contenteditable] h1 {
          font-size: 1.875rem;
          font-weight: bold;
          margin: 0.5rem 0;
        }
        
        [contenteditable] h2 {
          font-size: 1.5rem;
          font-weight: bold;
          margin: 0.5rem 0;
        }
        
        [contenteditable] h3 {
          font-size: 1.25rem;
          font-weight: bold;
          margin: 0.5rem 0;
        }
        
        [contenteditable] p {
          margin: 0.5rem 0;
        }
        
        [contenteditable] ul, [contenteditable] ol {
          margin: 0.5rem 0;
          padding-left: 1.5rem;
        }
        
        [contenteditable] blockquote {
          border-left: 4px solid #e5e7eb;
          padding-left: 1rem;
          margin: 0.5rem 0;
          font-style: italic;
          color: #6b7280;
        }
        
        [contenteditable] pre {
          background-color: #f3f4f6;
          padding: 1rem;
          border-radius: 0.375rem;
          margin: 0.5rem 0;
          font-family: 'Courier New', monospace;
          overflow-x: auto;
        }
        
        [contenteditable] img {
          max-width: 100%;
          height: auto;
          margin: 0.5rem 0;
          border-radius: 0.375rem;
        }
        
        [contenteditable] a {
          color: #3b82f6;
          text-decoration: underline;
        }
      `}</style>
    </div>
  )
}
