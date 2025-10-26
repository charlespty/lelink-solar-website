'use client'

import React, { useState, useEffect } from 'react'
import { 
  Package, 
  MessageSquare, 
  Users, 
  TrendingUp,
  FileText,
  ShoppingCart
} from 'lucide-react'

interface StatCard {
  title: string
  value: string
  change: string
  icon: React.ElementType
  color: string
}

export default function DashboardPage() {
  const [stats, setStats] = useState<StatCard[]>([
    {
      title: '产品总数',
      value: '3',
      change: '+0 本月',
      icon: Package,
      color: 'bg-blue-500'
    },
    {
      title: '待处理询价',
      value: '8',
      change: '+3 今日',
      icon: MessageSquare,
      color: 'bg-green-500'
    },
    {
      title: '网站访问量',
      value: '1,234',
      change: '+156 本周',
      icon: Users,
      color: 'bg-purple-500'
    },
    {
      title: '内容页面',
      value: '12',
      change: '+2 本月',
      icon: FileText,
      color: 'bg-orange-500'
    }
  ])

  const [recentInquiries, setRecentInquiries] = useState([
    { id: 1, customer: '张三', product: 'LK Solar Generator', date: '2024-10-26', status: '待处理' },
    { id: 2, customer: 'John Smith', product: 'LP Foldable Solar Panel', date: '2024-10-25', status: '已回复' },
    { id: 3, customer: '李四', product: 'LT Fixed Solar Panel', date: '2024-10-24', status: '待处理' },
  ])

  return (
    <div className="space-y-8">
      {/* 页面标题 */}
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">仪表板</h1>
        <p className="text-gray-400">欢迎回来，查看您的网站数据概览</p>
      </div>

      {/* 统计卡片 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <div
              key={index}
              className="bg-gray-800 rounded-xl p-6 border border-gray-700 hover:border-gray-600 transition-colors"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`${stat.color} p-3 rounded-lg`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <span className="text-green-400 text-sm font-medium">{stat.change}</span>
              </div>
              <h3 className="text-gray-400 text-sm mb-1">{stat.title}</h3>
              <p className="text-3xl font-bold text-white">{stat.value}</p>
            </div>
          )
        })}
      </div>

      {/* 最近询价 */}
      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-white">最近询价</h2>
          <a href="/admin/inquiries" className="text-blue-400 hover:text-blue-300 text-sm font-medium">
            查看全部 →
          </a>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="text-left py-3 px-4 text-gray-400 font-medium text-sm">客户</th>
                <th className="text-left py-3 px-4 text-gray-400 font-medium text-sm">产品</th>
                <th className="text-left py-3 px-4 text-gray-400 font-medium text-sm">日期</th>
                <th className="text-left py-3 px-4 text-gray-400 font-medium text-sm">状态</th>
              </tr>
            </thead>
            <tbody>
              {recentInquiries.map((inquiry) => (
                <tr key={inquiry.id} className="border-b border-gray-700 hover:bg-gray-700/50">
                  <td className="py-4 px-4 text-white">{inquiry.customer}</td>
                  <td className="py-4 px-4 text-gray-300">{inquiry.product}</td>
                  <td className="py-4 px-4 text-gray-300">{inquiry.date}</td>
                  <td className="py-4 px-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      inquiry.status === '待处理' 
                        ? 'bg-yellow-500/20 text-yellow-400' 
                        : 'bg-green-500/20 text-green-400'
                    }`}>
                      {inquiry.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 快速操作 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <a
          href="/admin/products"
          className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl p-6 hover:from-blue-700 hover:to-blue-800 transition-all group"
        >
          <Package className="w-8 h-8 text-white mb-4" />
          <h3 className="text-lg font-semibold text-white mb-2">管理产品</h3>
          <p className="text-blue-100 text-sm">添加、编辑或删除产品信息</p>
        </a>

        <a
          href="/admin/content"
          className="bg-gradient-to-br from-purple-600 to-purple-700 rounded-xl p-6 hover:from-purple-700 hover:to-purple-800 transition-all group"
        >
          <FileText className="w-8 h-8 text-white mb-4" />
          <h3 className="text-lg font-semibold text-white mb-2">编辑内容</h3>
          <p className="text-purple-100 text-sm">更新首页和其他页面内容</p>
        </a>

        <a
          href="/admin/inquiries"
          className="bg-gradient-to-br from-green-600 to-green-700 rounded-xl p-6 hover:from-green-700 hover:to-green-800 transition-all group"
        >
          <MessageSquare className="w-8 h-8 text-white mb-4" />
          <h3 className="text-lg font-semibold text-white mb-2">处理询价</h3>
          <p className="text-green-100 text-sm">查看和回复客户询价</p>
        </a>
      </div>
    </div>
  )
}

