'use client'

import React, { useState } from 'react'
import { Save, Eye, FileText, Home, Info, Phone } from 'lucide-react'

interface ContentSection {
  id: string
  page: string
  title: string
  icon: React.ElementType
}

const contentSections: ContentSection[] = [
  { id: 'hero', page: 'homepage', title: '首页 - Hero 区域', icon: Home },
  { id: 'product-showcase', page: 'homepage', title: '首页 - 产品展示', icon: FileText },
  { id: 'about', page: 'about', title: '关于我们页面', icon: Info },
  { id: 'contact', page: 'contact', title: '联系我们页面', icon: Phone },
]

export default function ContentManagementPage() {
  const [selectedSection, setSelectedSection] = useState<string>('hero')
  const [isSaving, setIsSaving] = useState(false)
  
  // 首页 Hero 区域的默认内容
  const [heroContent, setHeroContent] = useState({
    titleEn: 'Power Your Future with Solar Energy',
    titleZh: '用太阳能点亮您的未来',
    descriptionEn: 'Professional solar energy storage battery system solutions for Residential, C&I and Outdoor Travel.',
    descriptionZh: '为住宅、工商业和户外旅行提供专业的太阳能储能电池系统解决方案。',
  })

  // 产品展示区域的默认内容
  const [productShowcaseContent, setProductShowcaseContent] = useState({
    titleEn: 'Our Core Product',
    titleZh: '我们的核心产品',
    descriptionEn: 'One powerful solution, countless applications. Our Solar energy storage battery system adapts to your needs.',
    descriptionZh: '一个强大的解决方案，无数种应用。我们的太阳能储能电池系统适应您的需求。',
  })

  const handleSave = async () => {
    setIsSaving(true)
    
    // 模拟保存操作
    setTimeout(() => {
      alert('内容已保存！')
      setIsSaving(false)
    }, 1000)
  }

  const renderEditor = () => {
    switch (selectedSection) {
      case 'hero':
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-white mb-4">首页 Hero 区域内容</h3>
            
            <div>
              <label className="block text-gray-300 mb-2 font-medium">标题（英文）</label>
              <input
                type="text"
                value={heroContent.titleEn}
                onChange={(e) => setHeroContent({...heroContent, titleEn: e.target.value})}
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-gray-300 mb-2 font-medium">标题（中文）</label>
              <input
                type="text"
                value={heroContent.titleZh}
                onChange={(e) => setHeroContent({...heroContent, titleZh: e.target.value})}
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-gray-300 mb-2 font-medium">描述（英文）</label>
              <textarea
                value={heroContent.descriptionEn}
                onChange={(e) => setHeroContent({...heroContent, descriptionEn: e.target.value})}
                rows={3}
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-gray-300 mb-2 font-medium">描述（中文）</label>
              <textarea
                value={heroContent.descriptionZh}
                onChange={(e) => setHeroContent({...heroContent, descriptionZh: e.target.value})}
                rows={3}
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        )

      case 'product-showcase':
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-white mb-4">产品展示区域内容</h3>
            
            <div>
              <label className="block text-gray-300 mb-2 font-medium">标题（英文）</label>
              <input
                type="text"
                value={productShowcaseContent.titleEn}
                onChange={(e) => setProductShowcaseContent({...productShowcaseContent, titleEn: e.target.value})}
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-gray-300 mb-2 font-medium">标题（中文）</label>
              <input
                type="text"
                value={productShowcaseContent.titleZh}
                onChange={(e) => setProductShowcaseContent({...productShowcaseContent, titleZh: e.target.value})}
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-gray-300 mb-2 font-medium">描述（英文）</label>
              <textarea
                value={productShowcaseContent.descriptionEn}
                onChange={(e) => setProductShowcaseContent({...productShowcaseContent, descriptionEn: e.target.value})}
                rows={3}
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-gray-300 mb-2 font-medium">描述（中文）</label>
              <textarea
                value={productShowcaseContent.descriptionZh}
                onChange={(e) => setProductShowcaseContent({...productShowcaseContent, descriptionZh: e.target.value})}
                rows={3}
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        )

      default:
        return (
          <div className="text-center py-12">
            <p className="text-gray-400">此功能正在开发中...</p>
          </div>
        )
    }
  }

  return (
    <div className="space-y-6">
      {/* 页面标题 */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">内容管理</h1>
          <p className="text-gray-400">编辑网站各个页面的内容</p>
        </div>
        <div className="flex items-center space-x-4">
          <button
            onClick={() => window.open('/', '_blank')}
            className="bg-gray-700 hover:bg-gray-600 text-white px-6 py-3 rounded-lg flex items-center space-x-2 transition-colors"
          >
            <Eye className="w-5 h-5" />
            <span>预览网站</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* 左侧：内容区域列表 */}
        <div className="lg:col-span-1">
          <div className="bg-gray-800 rounded-xl border border-gray-700 p-4">
            <h3 className="text-white font-semibold mb-4">选择编辑区域</h3>
            <div className="space-y-2">
              {contentSections.map((section) => {
                const Icon = section.icon
                return (
                  <button
                    key={section.id}
                    onClick={() => setSelectedSection(section.id)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                      selectedSection === section.id
                        ? 'bg-blue-600 text-white'
                        : 'text-gray-300 hover:bg-gray-700'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="text-sm">{section.title}</span>
                  </button>
                )
              })}
            </div>
          </div>
        </div>

        {/* 右侧：编辑器 */}
        <div className="lg:col-span-3">
          <div className="bg-gray-800 rounded-xl border border-gray-700 p-6">
            {renderEditor()}

            {/* 保存按钮 */}
            <div className="flex items-center justify-end space-x-4 mt-8 pt-6 border-t border-gray-700">
              <button
                onClick={handleSave}
                disabled={isSaving}
                className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white px-8 py-3 rounded-lg flex items-center space-x-2 transition-colors"
              >
                {isSaving ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>
                    <span>保存中...</span>
                  </>
                ) : (
                  <>
                    <Save className="w-5 h-5" />
                    <span>保存更改</span>
                  </>
                )}
              </button>
            </div>

            {/* 提示信息 */}
            <div className="mt-6 bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
              <p className="text-blue-400 text-sm">
                💡 提示：当前为演示版本，保存的内容不会实际更新到网站。完整版本需要连接后端API。
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

