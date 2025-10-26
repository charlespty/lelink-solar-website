'use client'

import React, { useState, useEffect } from 'react'
import { Plus, Save, Eye, Edit, Trash2, Image, FileText, Video, Link, Move, Type, Quote, List, Code } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Textarea } from '@/components/ui/Textarea'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/Select'
import ContentBlockComponent, { ContentBlock, ContentBlockType } from '@/components/admin/ContentBlock'
import RichTextEditor from '@/components/admin/RichTextEditor'
import ImageUpload from '@/components/admin/ImageUpload'

interface ContentItem {
  id: string
  title: string
  type: 'page' | 'section' | 'component'
  content: string
  blocks: ContentBlock[]
  status: 'draft' | 'published'
  lastModified: string
  author: string
  metadata?: {
    description?: string
    keywords?: string
    featuredImage?: string
  }
}

const blockTypes: { type: ContentBlockType; icon: React.ComponentType<{ className?: string }>; label: string }[] = [
  { type: 'text', icon: Type, label: '文本' },
  { type: 'image', icon: Image, label: '图片' },
  { type: 'video', icon: Video, label: '视频' },
  { type: 'quote', icon: Quote, label: '引用' },
  { type: 'list', icon: List, label: '列表' },
  { type: 'code', icon: Code, label: '代码' },
  { type: 'link', icon: Link, label: '链接' },
  { type: 'heading', icon: Type, label: '标题' }
]

export default function ContentPage() {
  const [contentItems, setContentItems] = useState<ContentItem[]>([])
  const [selectedItem, setSelectedItem] = useState<ContentItem | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [typeFilter, setTypeFilter] = useState<string>('all')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [isLoading, setIsLoading] = useState(true)
  const [showBlockSelector, setShowBlockSelector] = useState(false)

  // 模拟数据
  useEffect(() => {
    const mockData: ContentItem[] = [
      {
        id: '1',
        title: '首页 Hero 区域',
        type: 'section',
        content: '欢迎来到 Lelink Solar，我们提供专业的太阳能解决方案...',
        blocks: [
          {
            id: 'block-1',
            type: 'heading',
            content: '欢迎来到 Lelink Solar',
            metadata: { level: 1 },
            order: 0
          },
          {
            id: 'block-2',
            type: 'text',
            content: '<p>我们提供专业的太阳能解决方案，为您的家庭和企业提供清洁、可靠的能源。</p>',
            order: 1
          },
          {
            id: 'block-3',
            type: 'image',
            content: '/images/hero-solar-panels.jpg',
            metadata: { alt: '太阳能板', caption: '高效太阳能板' },
            order: 2
          }
        ],
        status: 'published',
        lastModified: '2024-01-15',
        author: 'admin',
        metadata: {
          description: 'Lelink Solar 首页介绍',
          keywords: '太阳能,清洁能源,太阳能板',
          featuredImage: '/images/hero-solar-panels.jpg'
        }
      },
      {
        id: '2',
        title: '产品展示区域',
        type: 'section',
        content: '我们的核心产品包括 LK 太阳能发电机、LP 折叠太阳能板...',
        blocks: [
          {
            id: 'block-4',
            type: 'heading',
            content: '我们的核心产品',
            metadata: { level: 2 },
            order: 0
          },
          {
            id: 'block-5',
            type: 'text',
            content: '<p>我们提供多种太阳能产品，满足不同场景的需求。</p>',
            order: 1
          }
        ],
        status: 'published',
        lastModified: '2024-01-14',
        author: 'admin'
      },
      {
        id: '3',
        title: '关于我们页面',
        type: 'page',
        content: 'Lelink Solar 成立于 2020 年，专注于太阳能技术的研发和应用...',
        blocks: [
          {
            id: 'block-6',
            type: 'heading',
            content: '关于 Lelink Solar',
            metadata: { level: 1 },
            order: 0
          },
          {
            id: 'block-7',
            type: 'text',
            content: '<p>Lelink Solar 成立于 2020 年，专注于太阳能技术的研发和应用。</p>',
            order: 1
          }
        ],
        status: 'draft',
        lastModified: '2024-01-13',
        author: 'admin'
      }
    ]
    setContentItems(mockData)
    setIsLoading(false)
  }, [])

  const filteredItems = contentItems.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.content.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = typeFilter === 'all' || item.type === typeFilter
    const matchesStatus = statusFilter === 'all' || item.status === statusFilter
    return matchesSearch && matchesType && matchesStatus
  })

  const handleEdit = (item: ContentItem) => {
    setSelectedItem(item)
    setIsEditing(true)
  }

  const handleSave = () => {
    if (selectedItem) {
      setContentItems(prev => 
        prev.map(item => 
          item.id === selectedItem.id 
            ? { ...selectedItem, lastModified: new Date().toISOString().split('T')[0] }
            : item
        )
      )
      setIsEditing(false)
    }
  }

  const handleDelete = (id: string) => {
    if (confirm('确定要删除这个内容项吗？')) {
      setContentItems(prev => prev.filter(item => item.id !== id))
      if (selectedItem?.id === id) {
        setSelectedItem(null)
        setIsEditing(false)
      }
    }
  }

  const handleCreateNew = () => {
    const newItem: ContentItem = {
      id: Date.now().toString(),
      title: '新内容',
      type: 'section',
      content: '',
      blocks: [],
      status: 'draft',
      lastModified: new Date().toISOString().split('T')[0],
      author: 'admin'
    }
    setContentItems(prev => [newItem, ...prev])
    setSelectedItem(newItem)
    setIsEditing(true)
  }

  const handleAddBlock = (blockType: ContentBlockType) => {
    if (!selectedItem) return

    const newBlock: ContentBlock = {
      id: `block-${Date.now()}`,
      type: blockType,
      content: '',
      order: selectedItem.blocks.length,
      metadata: blockType === 'heading' ? { level: 2 } : {}
    }

    setSelectedItem({
      ...selectedItem,
      blocks: [...selectedItem.blocks, newBlock]
    })
    setShowBlockSelector(false)
  }

  const handleUpdateBlock = (updatedBlock: ContentBlock) => {
    if (!selectedItem) return

    setSelectedItem({
      ...selectedItem,
      blocks: selectedItem.blocks.map(block => 
        block.id === updatedBlock.id ? updatedBlock : block
      )
    })
  }

  const handleDeleteBlock = (blockId: string) => {
    if (!selectedItem) return

    setSelectedItem({
      ...selectedItem,
      blocks: selectedItem.blocks
        .filter(block => block.id !== blockId)
        .map((block, index) => ({ ...block, order: index }))
    })
  }

  const handleMoveBlock = (blockId: string, direction: 'up' | 'down') => {
    if (!selectedItem) return

    const blocks = [...selectedItem.blocks]
    const currentIndex = blocks.findIndex(block => block.id === blockId)
    
    if (currentIndex === -1) return

    const newIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1
    
    if (newIndex < 0 || newIndex >= blocks.length) return

    // 交换位置
    [blocks[currentIndex], blocks[newIndex]] = [blocks[newIndex], blocks[currentIndex]]
    
    // 更新 order
    blocks.forEach((block, index) => {
      block.order = index
    })

    setSelectedItem({
      ...selectedItem,
      blocks
    })
  }

  const handleImageUpload = async (file: File): Promise<string> => {
    // 模拟图片上传
    return new Promise((resolve) => {
      const reader = new FileReader()
      reader.onload = (e) => {
        resolve(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    })
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-full text-white">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  return (
    <div className="p-6 bg-gray-900 min-h-screen text-white">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-blue-400">内容管理</h1>
        <Button 
          onClick={handleCreateNew}
          className="bg-blue-600 hover:bg-blue-700 text-white"
        >
          <Plus className="h-4 w-4 mr-2" />
          新建内容
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 内容列表 */}
        <div className="lg:col-span-1">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">内容列表</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* 搜索和筛选 */}
              <div className="space-y-3">
                <Input
                  placeholder="搜索内容..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                />
                
                <div className="grid grid-cols-2 gap-2">
                  <Select value={typeFilter} onValueChange={setTypeFilter}>
                    <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                      <SelectValue placeholder="类型" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 text-white border-gray-700">
                      <SelectItem value="all">所有类型</SelectItem>
                      <SelectItem value="page">页面</SelectItem>
                      <SelectItem value="section">区域</SelectItem>
                      <SelectItem value="component">组件</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                      <SelectValue placeholder="状态" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 text-white border-gray-700">
                      <SelectItem value="all">所有状态</SelectItem>
                      <SelectItem value="draft">草稿</SelectItem>
                      <SelectItem value="published">已发布</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* 内容项列表 */}
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {filteredItems.map((item) => (
                  <div
                    key={item.id}
                    className={`p-3 rounded-lg cursor-pointer transition-colors ${
                      selectedItem?.id === item.id
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-700 hover:bg-gray-600 text-gray-200'
                    }`}
                    onClick={() => setSelectedItem(item)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium truncate">{item.title}</h3>
                        <p className="text-sm opacity-75 truncate">{item.content.substring(0, 50)}...</p>
                        <div className="flex items-center space-x-2 mt-1">
                          <span className={`px-2 py-1 text-xs rounded ${
                            item.type === 'page' ? 'bg-green-500/20 text-green-400' :
                            item.type === 'section' ? 'bg-blue-500/20 text-blue-400' :
                            'bg-purple-500/20 text-purple-400'
                          }`}>
                            {item.type === 'page' ? '页面' : item.type === 'section' ? '区域' : '组件'}
                          </span>
                          <span className={`px-2 py-1 text-xs rounded ${
                            item.status === 'published' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'
                          }`}>
                            {item.status === 'published' ? '已发布' : '草稿'}
                          </span>
                          <span className="text-xs opacity-75">
                            {item.blocks.length} 个块
                          </span>
                        </div>
                      </div>
                      <div className="flex space-x-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation()
                            handleEdit(item)
                          }}
                          className="h-8 w-8 p-0"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation()
                            handleDelete(item.id)
                          }}
                          className="h-8 w-8 p-0 text-red-400 hover:text-red-300"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 内容编辑器 */}
        <div className="lg:col-span-2">
          {selectedItem ? (
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-white">
                    {isEditing ? '编辑内容' : '查看内容'}
                  </CardTitle>
                  <div className="flex space-x-2">
                    {!isEditing && (
                      <Button
                        onClick={() => setIsEditing(true)}
                        className="bg-blue-600 hover:bg-blue-700 text-white"
                      >
                        <Edit className="h-4 w-4 mr-2" />
                        编辑
                      </Button>
                    )}
                    {isEditing && (
                      <Button
                        onClick={handleSave}
                        className="bg-green-600 hover:bg-green-700 text-white"
                      >
                        <Save className="h-4 w-4 mr-2" />
                        保存
                      </Button>
                    )}
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {isEditing ? (
                  <>
                    {/* 基本信息 */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          标题
                        </label>
                        <Input
                          value={selectedItem.title}
                          onChange={(e) => setSelectedItem({ ...selectedItem, title: e.target.value })}
                          className="bg-gray-700 border-gray-600 text-white"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          类型
                        </label>
                        <Select 
                          value={selectedItem.type} 
                          onValueChange={(value: 'page' | 'section' | 'component') => 
                            setSelectedItem({ ...selectedItem, type: value })
                          }
                        >
                          <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="bg-gray-800 text-white border-gray-700">
                            <SelectItem value="page">页面</SelectItem>
                            <SelectItem value="section">区域</SelectItem>
                            <SelectItem value="component">组件</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          状态
                        </label>
                        <Select 
                          value={selectedItem.status} 
                          onValueChange={(value: 'draft' | 'published') => 
                            setSelectedItem({ ...selectedItem, status: value })
                          }
                        >
                          <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="bg-gray-800 text-white border-gray-700">
                            <SelectItem value="draft">草稿</SelectItem>
                            <SelectItem value="published">已发布</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          描述
                        </label>
                        <Input
                          value={selectedItem.metadata?.description || ''}
                          onChange={(e) => setSelectedItem({ 
                            ...selectedItem, 
                            metadata: { 
                              ...selectedItem.metadata, 
                              description: e.target.value 
                            }
                          })}
                          placeholder="输入内容描述..."
                          className="bg-gray-700 border-gray-600 text-white"
                        />
                      </div>
                    </div>

                    {/* 内容块管理 */}
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-medium text-white">内容块</h3>
                        <Button
                          onClick={() => setShowBlockSelector(!showBlockSelector)}
                          className="bg-blue-600 hover:bg-blue-700 text-white"
                        >
                          <Plus className="h-4 w-4 mr-2" />
                          添加块
                        </Button>
                      </div>

                      {/* 块类型选择器 */}
                      {showBlockSelector && (
                        <Card className="bg-gray-700 border-gray-600">
                          <CardContent className="p-4">
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                              {blockTypes.map(({ type, icon: Icon, label }) => (
                                <Button
                                  key={type}
                                  variant="ghost"
                                  onClick={() => handleAddBlock(type)}
                                  className="flex flex-col items-center p-4 h-auto hover:bg-gray-600"
                                >
                                  <Icon className="h-6 w-6 mb-2" />
                                  <span className="text-sm">{label}</span>
                                </Button>
                              ))}
                            </div>
                          </CardContent>
                        </Card>
                      )}

                      {/* 内容块列表 */}
                      <div className="space-y-4">
                        {selectedItem.blocks
                          .sort((a, b) => a.order - b.order)
                          .map((block, index) => (
                            <ContentBlockComponent
                              key={block.id}
                              block={block}
                              onUpdate={handleUpdateBlock}
                              onDelete={handleDeleteBlock}
                              onMoveUp={index > 0 ? () => handleMoveBlock(block.id, 'up') : undefined}
                              onMoveDown={index < selectedItem.blocks.length - 1 ? () => handleMoveBlock(block.id, 'down') : undefined}
                              onImageUpload={handleImageUpload}
                            />
                          ))}
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-lg font-semibold text-white">{selectedItem.title}</h3>
                      <div className="flex items-center space-x-4 mt-2 text-sm text-gray-400">
                        <span>类型: {selectedItem.type === 'page' ? '页面' : selectedItem.type === 'section' ? '区域' : '组件'}</span>
                        <span>状态: {selectedItem.status === 'published' ? '已发布' : '草稿'}</span>
                        <span>修改时间: {selectedItem.lastModified}</span>
                      </div>
                    </div>
                    
                    {/* 预览内容块 */}
                    <div className="space-y-4">
                      {selectedItem.blocks
                        .sort((a, b) => a.order - b.order)
                        .map((block) => (
                          <ContentBlockComponent
                            key={block.id}
                            block={block}
                            onUpdate={() => {}}
                            onDelete={() => {}}
                            onImageUpload={handleImageUpload}
                          />
                        ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ) : (
            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="flex flex-col items-center justify-center py-12">
                <FileText className="h-12 w-12 text-gray-500 mb-4" />
                <h3 className="text-lg font-medium text-gray-400 mb-2">选择内容项</h3>
                <p className="text-gray-500 text-center">
                  从左侧列表中选择一个内容项进行查看或编辑
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}