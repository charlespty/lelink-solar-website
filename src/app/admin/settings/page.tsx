'use client'

import React, { useState } from 'react'
import { Save, User, Lock, Bell, Globe, Database } from 'lucide-react'

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('profile')
  const [isSaving, setIsSaving] = useState(false)

  const handleSave = () => {
    setIsSaving(true)
    setTimeout(() => {
      alert('设置已保存！')
      setIsSaving(false)
    }, 1000)
  }

  const tabs = [
    { id: 'profile', label: '个人资料', icon: User },
    { id: 'security', label: '安全设置', icon: Lock },
    { id: 'notifications', label: '通知设置', icon: Bell },
    { id: 'website', label: '网站设置', icon: Globe },
    { id: 'backup', label: '数据备份', icon: Database },
  ]

  return (
    <div className="space-y-6">
      {/* 页面标题 */}
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">系统设置</h1>
        <p className="text-gray-400">管理您的账户和系统配置</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* 左侧标签 */}
        <div className="lg:col-span-1">
          <div className="bg-gray-800 rounded-xl border border-gray-700 p-4">
            <div className="space-y-2">
              {tabs.map((tab) => {
                const Icon = tab.icon
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                      activeTab === tab.id
                        ? 'bg-blue-600 text-white'
                        : 'text-gray-300 hover:bg-gray-700'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{tab.label}</span>
                  </button>
                )
              })}
            </div>
          </div>
        </div>

        {/* 右侧内容 */}
        <div className="lg:col-span-3">
          <div className="bg-gray-800 rounded-xl border border-gray-700 p-6">
            {activeTab === 'profile' && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-white mb-4">个人资料</h2>
                
                <div>
                  <label className="block text-gray-300 mb-2">用户名</label>
                  <input
                    type="text"
                    defaultValue="admin"
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-gray-300 mb-2">邮箱</label>
                  <input
                    type="email"
                    defaultValue="admin@lelinksolar.com"
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-gray-300 mb-2">角色</label>
                  <input
                    type="text"
                    value="管理员"
                    disabled
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-gray-400"
                  />
                </div>
              </div>
            )}

            {activeTab === 'security' && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-white mb-4">安全设置</h2>
                
                <div>
                  <label className="block text-gray-300 mb-2">当前密码</label>
                  <input
                    type="password"
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-gray-300 mb-2">新密码</label>
                  <input
                    type="password"
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-gray-300 mb-2">确认新密码</label>
                  <input
                    type="password"
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            )}

            {activeTab === 'notifications' && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-white mb-4">通知设置</h2>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white font-medium">新询价通知</p>
                    <p className="text-gray-400 text-sm">收到新询价时发送邮件通知</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white font-medium">产品更新通知</p>
                    <p className="text-gray-400 text-sm">产品信息更新时发送通知</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" />
                    <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
              </div>
            )}

            {activeTab === 'website' && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-white mb-4">网站设置</h2>
                
                <div>
                  <label className="block text-gray-300 mb-2">网站标题</label>
                  <input
                    type="text"
                    defaultValue="Lelink Solar - Power Your Future"
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-gray-300 mb-2">默认语言</label>
                  <select className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option>英语 (English)</option>
                    <option>中文 (Chinese)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-gray-300 mb-2">联系邮箱</label>
                  <input
                    type="email"
                    defaultValue="info@lelinksolar.com"
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            )}

            {activeTab === 'backup' && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-white mb-4">数据备份</h2>
                
                <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
                  <p className="text-blue-400 text-sm">
                    💡 定期备份您的数据可以防止意外丢失。建议每周至少备份一次。
                  </p>
                </div>

                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-4 rounded-lg transition-colors">
                  立即备份数据
                </button>

                <div className="border-t border-gray-700 pt-6">
                  <h3 className="text-white font-medium mb-4">最近备份记录</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-4 bg-gray-700 rounded-lg">
                      <div>
                        <p className="text-white">2024-10-26 14:30</p>
                        <p className="text-gray-400 text-sm">完整备份 - 2.4 MB</p>
                      </div>
                      <button className="text-blue-400 hover:text-blue-300">下载</button>
                    </div>
                  </div>
                </div>
              </div>
            )}

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
                    <span>保存设置</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

