'use client'

import React, { useState, useEffect } from 'react'
import { Plus, Edit, Trash2, Eye, Search } from 'lucide-react'
import { getAllProducts } from '@/lib/productsData'

export default function ProductsManagementPage() {
  const [products, setProducts] = useState(getAllProducts())
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedProduct, setSelectedProduct] = useState<any>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.nameZh.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleEdit = (product: any) => {
    setSelectedProduct(product)
    setIsModalOpen(true)
  }

  const handleDelete = (productId: string) => {
    if (confirm('确定要删除这个产品吗？')) {
      setProducts(products.filter(p => p.id !== productId))
      alert('产品已删除')
    }
  }

  return (
    <div className="space-y-6">
      {/* 页面标题 */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">产品管理</h1>
          <p className="text-gray-400">管理您的产品信息和详情</p>
        </div>
        <button
          onClick={() => {
            setSelectedProduct(null)
            setIsModalOpen(true)
          }}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg flex items-center space-x-2 transition-colors"
        >
          <Plus className="w-5 h-5" />
          <span>添加产品</span>
        </button>
      </div>

      {/* 搜索栏 */}
      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="搜索产品..."
            className="w-full pl-12 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* 产品列表 */}
      <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-700">
              <tr>
                <th className="text-left py-4 px-6 text-gray-300 font-semibold">产品名称</th>
                <th className="text-left py-4 px-6 text-gray-300 font-semibold">中文名称</th>
                <th className="text-left py-4 px-6 text-gray-300 font-semibold">类型</th>
                <th className="text-left py-4 px-6 text-gray-300 font-semibold">特性数量</th>
                <th className="text-right py-4 px-6 text-gray-300 font-semibold">操作</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((product) => (
                <tr key={product.id} className="border-b border-gray-700 hover:bg-gray-700/50">
                  <td className="py-4 px-6 text-white font-medium">{product.name}</td>
                  <td className="py-4 px-6 text-gray-300">{product.nameZh}</td>
                  <td className="py-4 px-6">
                    <span className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-sm">
                      {product.id.includes('generator') ? '发电机' : '太阳能板'}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-gray-300">{product.keyFeatures.length} 个</td>
                  <td className="py-4 px-6">
                    <div className="flex items-center justify-end space-x-2">
                      <button
                        onClick={() => window.open(`/products/${product.id}`, '_blank')}
                        className="p-2 hover:bg-gray-600 rounded-lg transition-colors text-gray-400 hover:text-white"
                        title="查看"
                      >
                        <Eye className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => handleEdit(product)}
                        className="p-2 hover:bg-gray-600 rounded-lg transition-colors text-blue-400 hover:text-blue-300"
                        title="编辑"
                      >
                        <Edit className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => handleDelete(product.id)}
                        className="p-2 hover:bg-gray-600 rounded-lg transition-colors text-red-400 hover:text-red-300"
                        title="删除"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 提示信息 */}
      {filteredProducts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-400">没有找到匹配的产品</p>
        </div>
      )}

      {/* 编辑模态框（简化版） */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold text-white mb-6">
              {selectedProduct ? '编辑产品' : '添加产品'}
            </h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-gray-300 mb-2">产品名称（英文）</label>
                <input
                  type="text"
                  defaultValue={selectedProduct?.name || ''}
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
                  placeholder="LK Solar Generator"
                />
              </div>

              <div>
                <label className="block text-gray-300 mb-2">产品名称（中文）</label>
                <input
                  type="text"
                  defaultValue={selectedProduct?.nameZh || ''}
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
                  placeholder="LK 太阳能发电机"
                />
              </div>

              <div>
                <label className="block text-gray-300 mb-2">产品描述（英文）</label>
                <textarea
                  defaultValue={selectedProduct?.description || ''}
                  rows={3}
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
                  placeholder="High-capacity portable power station..."
                />
              </div>

              <div>
                <label className="block text-gray-300 mb-2">产品描述（中文）</label>
                <textarea
                  defaultValue={selectedProduct?.descriptionZh || ''}
                  rows={3}
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
                  placeholder="大容量便携式电源站..."
                />
              </div>
            </div>

            <div className="flex items-center justify-end space-x-4 mt-8">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-6 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors"
              >
                取消
              </button>
              <button
                onClick={() => {
                  alert('保存功能需要连接后端API')
                  setIsModalOpen(false)
                }}
                className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
              >
                保存
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

