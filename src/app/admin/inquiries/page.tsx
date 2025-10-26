'use client'

import React, { useState, useEffect } from 'react'
import { Search, Filter, Mail, Phone, Calendar, Package, Eye, CheckCircle, XCircle } from 'lucide-react'

interface Inquiry {
  id: number
  customer: string
  email: string
  phone: string
  product: string
  message: string
  date: string
  status: 'pending' | 'replied' | 'closed'
}

export default function InquiriesPage() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [stats, setStats] = useState({
    pending: 0,
    replied: 0,
    total: 0
  })

  // 加载询价数据
  useEffect(() => {
    loadInquiries()
  }, [statusFilter, searchTerm])

  const loadInquiries = async () => {
    try {
      setIsLoading(true)
      const response = await fetch(`/api/admin/inquiries?status=${statusFilter}&search=${searchTerm}`)
      const result = await response.json()
      
      if (result.success) {
        setInquiries(result.data)
        setStats(result.stats)
      }
    } catch (error) {
      console.error('Failed to load inquiries:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const filteredInquiries = inquiries.filter(inquiry => {
    const matchesSearch = 
      inquiry.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inquiry.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inquiry.product.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesStatus = statusFilter === 'all' || inquiry.status === statusFilter

    return matchesSearch && matchesStatus
  })

  const handleStatusChange = async (id: number, newStatus: 'pending' | 'replied' | 'closed') => {
    try {
      const response = await fetch('/api/admin/inquiries', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id, status: newStatus }),
      })

      const result = await response.json()

      if (result.success) {
        // 重新加载数据
        loadInquiries()
      } else {
        alert('更新失败：' + result.error)
      }
    } catch (error) {
      alert('更新失败，请重试')
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <span className="px-3 py-1 bg-yellow-500/20 text-yellow-400 rounded-full text-xs font-medium">待处理</span>
      case 'replied':
        return <span className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-xs font-medium">已回复</span>
      case 'closed':
        return <span className="px-3 py-1 bg-gray-500/20 text-gray-400 rounded-full text-xs font-medium">已关闭</span>
      default:
        return null
    }
  }

  return (
    <div className="space-y-6">
      {/* 页面标题和统计 */}
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">询价管理</h1>
        <p className="text-gray-400">查看和处理客户询价信息</p>
      </div>

      {/* 统计卡片 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm mb-1">待处理</p>
              <p className="text-3xl font-bold text-yellow-400">
                {stats.pending}
              </p>
            </div>
            <div className="bg-yellow-500/20 p-3 rounded-lg">
              <Mail className="w-6 h-6 text-yellow-400" />
            </div>
          </div>
        </div>

        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm mb-1">已回复</p>
              <p className="text-3xl font-bold text-green-400">
                {stats.replied}
              </p>
            </div>
            <div className="bg-green-500/20 p-3 rounded-lg">
              <CheckCircle className="w-6 h-6 text-green-400" />
            </div>
          </div>
        </div>

        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm mb-1">总计</p>
              <p className="text-3xl font-bold text-white">{stats.total}</p>
            </div>
            <div className="bg-blue-500/20 p-3 rounded-lg">
              <Package className="w-6 h-6 text-blue-400" />
            </div>
          </div>
        </div>
      </div>

      {/* 搜索和筛选 */}
      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="搜索客户、邮箱或产品..."
              className="w-full pl-12 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex items-center space-x-2">
            <Filter className="text-gray-400 w-5 h-5" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">全部状态</option>
              <option value="pending">待处理</option>
              <option value="replied">已回复</option>
              <option value="closed">已关闭</option>
            </select>
          </div>
        </div>
      </div>

      {/* 询价列表 */}
      <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-700">
              <tr>
                <th className="text-left py-4 px-6 text-gray-300 font-semibold">客户</th>
                <th className="text-left py-4 px-6 text-gray-300 font-semibold">联系方式</th>
                <th className="text-left py-4 px-6 text-gray-300 font-semibold">产品</th>
                <th className="text-left py-4 px-6 text-gray-300 font-semibold">日期</th>
                <th className="text-left py-4 px-6 text-gray-300 font-semibold">状态</th>
                <th className="text-right py-4 px-6 text-gray-300 font-semibold">操作</th>
              </tr>
            </thead>
            <tbody>
              {filteredInquiries.map((inquiry) => (
                <tr key={inquiry.id} className="border-b border-gray-700 hover:bg-gray-700/50">
                  <td className="py-4 px-6 text-white font-medium">{inquiry.customer}</td>
                  <td className="py-4 px-6">
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2 text-gray-300 text-sm">
                        <Mail className="w-4 h-4" />
                        <span>{inquiry.email}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-gray-300 text-sm">
                        <Phone className="w-4 h-4" />
                        <span>{inquiry.phone}</span>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-gray-300">{inquiry.product}</td>
                  <td className="py-4 px-6 text-gray-300">
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4" />
                      <span>{inquiry.date}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6">{getStatusBadge(inquiry.status)}</td>
                  <td className="py-4 px-6">
                    <button
                      onClick={() => setSelectedInquiry(inquiry)}
                      className="flex items-center justify-end space-x-2 text-blue-400 hover:text-blue-300"
                    >
                      <Eye className="w-5 h-5" />
                      <span>查看详情</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 详情模态框 */}
      {selectedInquiry && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white">询价详情</h2>
              <button
                onClick={() => setSelectedInquiry(null)}
                className="text-gray-400 hover:text-white"
              >
                <XCircle className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-400 text-sm mb-1">客户姓名</label>
                  <p className="text-white font-medium">{selectedInquiry.customer}</p>
                </div>
                <div>
                  <label className="block text-gray-400 text-sm mb-1">询价日期</label>
                  <p className="text-white font-medium">{selectedInquiry.date}</p>
                </div>
              </div>

              <div>
                <label className="block text-gray-400 text-sm mb-1">电子邮箱</label>
                <p className="text-white font-medium">{selectedInquiry.email}</p>
              </div>

              <div>
                <label className="block text-gray-400 text-sm mb-1">联系电话</label>
                <p className="text-white font-medium">{selectedInquiry.phone}</p>
              </div>

              <div>
                <label className="block text-gray-400 text-sm mb-1">感兴趣的产品</label>
                <p className="text-white font-medium">{selectedInquiry.product}</p>
              </div>

              <div>
                <label className="block text-gray-400 text-sm mb-1">询价内容</label>
                <p className="text-white bg-gray-700 p-4 rounded-lg">{selectedInquiry.message}</p>
              </div>

              <div>
                <label className="block text-gray-400 text-sm mb-2">更改状态</label>
                <div className="flex space-x-3">
                  <button
                    onClick={() => {
                      handleStatusChange(selectedInquiry.id, 'pending')
                      setSelectedInquiry({...selectedInquiry, status: 'pending'})
                    }}
                    className={`px-4 py-2 rounded-lg transition-colors ${
                      selectedInquiry.status === 'pending'
                        ? 'bg-yellow-600 text-white'
                        : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    }`}
                  >
                    待处理
                  </button>
                  <button
                    onClick={() => {
                      handleStatusChange(selectedInquiry.id, 'replied')
                      setSelectedInquiry({...selectedInquiry, status: 'replied'})
                    }}
                    className={`px-4 py-2 rounded-lg transition-colors ${
                      selectedInquiry.status === 'replied'
                        ? 'bg-green-600 text-white'
                        : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    }`}
                  >
                    已回复
                  </button>
                  <button
                    onClick={() => {
                      handleStatusChange(selectedInquiry.id, 'closed')
                      setSelectedInquiry({...selectedInquiry, status: 'closed'})
                    }}
                    className={`px-4 py-2 rounded-lg transition-colors ${
                      selectedInquiry.status === 'closed'
                        ? 'bg-gray-600 text-white'
                        : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    }`}
                  >
                    已关闭
                  </button>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end space-x-4 mt-8">
              <button
                onClick={() => setSelectedInquiry(null)}
                className="px-6 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors"
              >
                关闭
              </button>
              <button
                onClick={() => window.open(`mailto:${selectedInquiry.email}`)}
                className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors flex items-center space-x-2"
              >
                <Mail className="w-5 h-5" />
                <span>发送邮件</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

