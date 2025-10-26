'use client'

import React, { useEffect, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import Link from 'next/link'
import { 
  LayoutDashboard, 
  Package, 
  FileText, 
  MessageSquare, 
  Settings,
  LogOut,
  Menu,
  X,
  Home
} from 'lucide-react'

const menuItems = [
  { icon: LayoutDashboard, label: '仪表板', labelEn: 'Dashboard', href: '/admin/dashboard' },
  { icon: Package, label: '产品管理', labelEn: 'Products', href: '/admin/products' },
  { icon: FileText, label: '内容管理', labelEn: 'Content', href: '/admin/content' },
  { icon: MessageSquare, label: '询价管理', labelEn: 'Inquiries', href: '/admin/inquiries' },
  { icon: Settings, label: '系统设置', labelEn: 'Settings', href: '/admin/settings' },
]

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const pathname = usePathname()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)

  useEffect(() => {
    // 检查认证状态
    const checkAuth = () => {
      const token = localStorage.getItem('admin_token')
      if (!token && pathname !== '/admin/login') {
        router.push('/admin/login')
      } else {
        setIsAuthenticated(true)
      }
      setIsLoading(false)
    }
    
    checkAuth()
  }, [pathname, router])

  const handleLogout = () => {
    localStorage.removeItem('admin_token')
    router.push('/admin/login')
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  // 登录页面不需要侧边栏
  if (pathname === '/admin/login') {
    return <>{children}</>
  }

  if (!isAuthenticated) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-900 flex">
      {/* 侧边栏 */}
      <aside
        className={`${
          isSidebarOpen ? 'w-64' : 'w-20'
        } bg-gray-800 text-white transition-all duration-300 flex flex-col`}
      >
        {/* Logo */}
        <div className="p-4 border-b border-gray-700">
          <div className="flex items-center justify-between">
            {isSidebarOpen && (
              <h1 className="text-xl font-bold text-blue-400">Lelink Admin</h1>
            )}
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
            >
              {isSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* 导航菜单 */}
        <nav className="flex-1 p-4 space-y-2">
          <Link
            href="/"
            target="_blank"
            className="flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-gray-700 transition-colors text-gray-300 hover:text-white"
          >
            <Home className="w-5 h-5" />
            {isSidebarOpen && <span>访问网站</span>}
          </Link>

          {menuItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href || pathname?.startsWith(item.href + '/')
            
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                }`}
              >
                <Icon className="w-5 h-5" />
                {isSidebarOpen && <span>{item.label}</span>}
              </Link>
            )
          })}
        </nav>

        {/* 退出按钮 */}
        <div className="p-4 border-t border-gray-700">
          <button
            onClick={handleLogout}
            className="flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-red-600 transition-colors w-full text-gray-300 hover:text-white"
          >
            <LogOut className="w-5 h-5" />
            {isSidebarOpen && <span>退出登录</span>}
          </button>
        </div>
      </aside>

      {/* 主内容区 */}
      <main className="flex-1 overflow-auto">
        <div className="p-8">
          {children}
        </div>
      </main>
    </div>
  )
}

